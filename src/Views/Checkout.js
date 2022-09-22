import axios from "axios";
import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../Components/CheckoutForm";
import { useNavigate } from "react-router-dom";
import SupPizza from "../Components/Suplementos/SupPizza";

import Modal from "../Components/Modal/Modal";

// This is your test publishable API key.
const promise = loadStripe(
  "pk_test_51Jub2MIPsB2uwGnPRHuBviGhVXe4EpAfloWRqrilwGWsBIwCQ5P2ghkrEP7mnEvsyfVN29ANaNobqvbIpX517fQy00bObYXVug"
);

const Checkout = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const toggleModal = () => setModalOpen(!isModalOpen);
  const [clientSecret, setClientSecret] = useState("");
  const [details, setDetails] = useState([]);
  const [now, setNow] = useState(false);
  const [local, setLocal] = useState(false);
  const [name, setName] = useState("");
  const [total, setTotal] = useState(
    JSON.parse(sessionStorage.getItem("order")).data.total
  );
  const [email, setEmail] = useState("");
  const [display, setDisplay] = useState("show");
  const [strobj, setStrobj] = useState(
    JSON.parse(JSON.parse(sessionStorage.getItem("order")).data.order)
  );
  const [dbReferencia] = useState(
    JSON.parse(sessionStorage.getItem("order")).data.referencia
  );
  const [referencia] = useState(
    JSON.parse(sessionStorage.getItem("order")).data.referencia.substring(
      18,
      24
    )
  );
  const [hideForm, setHideForm] = useState("hide");
  const [finalOrder, setFinalOrder] = useState([...strobj]);

  useEffect(() => {
    if (finalOrder.length === 0) {
      navigate("/pickup");
    }
  }, [finalOrder]);

  let mailORder = [];
  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionStorage.getItem("order")) {
      alert("Debe de realizar una pedido para visualizar esta página");
      navigate("/pickup");
    }
    const temp = [JSON.parse(sessionStorage.getItem("order"))];

    setDetails(JSON.parse(temp[0].data.order));
    checkdb();

    fetch("http://localhost:3001/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: strobj,
      }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const handleOnline = (e) => {
    setNow(true);
    setLocal(false);
    setDisplay("hide");
  };

  const handleLocal = (e) => {
    setNow(false);
    setLocal(true);
    setDisplay("hide");
  };

  const clean = () => {
    const uniqueSet = new Set(details.map(JSON.stringify));
    const result = Array.from(uniqueSet).map(JSON.parse);
    return result;
  };

  const amountOfItems = (id) => details.filter((item) => item.id === id).length;

  const orderDetails = () => {
    let temp = []; // eslint-disable-next-line
    details.map((item) => {
      temp.push(item.plato);
    });
    return temp;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const values = {
      name: name,
      mail: email,
      completed: true,
    };

    const mailOpts = {
      order: orderDetails(),
      mail: email,
      name: name,
      total: total,
      referencia: referencia,
    };
    try {
      await axios.post(`${process.env.REACT_APP_APIURL}/sendmail`, mailOpts);
      await axios.put(
        `${process.env.REACT_APP_APIURL}/complete/${referencia}`,
        values
      );
    } catch (error) {}
  };

  const checkdb = async () => {
    await axios.get(
      `${process.env.REACT_APP_APIURL}/purchases/${dbReferencia}`
    );
  };

  const supAdd = (item, parentid) => {
    const indexOfItem = finalOrder.findIndex((items) => items.id === parentid);
    let temp = finalOrder;
    temp.splice(indexOfItem + 1, 0, item);
    setFinalOrder([...temp]);
  };

  const delItem = (item) => {
    if (item.uid) {
      const indexOfItemUidToRemove = finalOrder.findIndex(
        (items) => items.uid === item.uid
      );
      setFinalOrder([
        ...finalOrder.slice(0, indexOfItemUidToRemove),
        ...finalOrder.slice(indexOfItemUidToRemove + 1),
      ]);
    } else {
      const indexOfItemIdToRemove = finalOrder.findIndex(
        (items) => items.id === item.id
      );
      setFinalOrder([
        ...finalOrder.slice(0, indexOfItemIdToRemove),
        ...finalOrder.slice(indexOfItemIdToRemove + 1),
      ]);
    }
  };

  return (
    <div className="container checkout-wrapper slide-top">
      <section className="my-5">
        <h1>Revise y modifique su pedido:</h1>~ Detalles ~
        <div className="p-0">
          {finalOrder.map((item, i) => (
            <div className="card" key={i}>
              <div className="row order-details d-flex p-3">
                <div className="col-sm-8 col-md-8 col-lg-8">
                  <h3>{item.plato}</h3>
                </div>
                <div className="col-sm-2 col-md-2 col-lg-2">
                  <h3>{item.precio}</h3>
                </div>

                <div className="col-sm-2 col-md-2 col-lg-2">
                  <i
                    className="fa-regular fa-trash-can"
                    onClick={(e) => delItem(item)}
                  ></i>
                </div>

                <div className="container p-3">
                  {item.id_catego2 ===
                  "daea62f4-25ff-11ed-a49a-50ebf6c32832" ? (
                    <>
                      <h4>Añadir suplementos</h4>

                      {JSON.parse(sessionStorage.getItem("hamvegana")).map(
                        (sup) => (
                          <div className="row d-flex p-1">
                            <div className="col-sm-8 col-md-8 col-lg-8">
                              <span>{sup.plato}</span>
                            </div>
                            <div className="col-sm-4 col-md-4 col-lg-4">
                              <button
                                className="btn btn-success"
                                onClick={(e) => supAdd(sup, item.id)}
                              >
                                Añadir
                              </button>
                            </div>
                          </div>
                        )
                      )}
                    </>
                  ) : (
                    ""
                  )}

                  {item.id_catego2 ===
                  "48936932-25ff-11ed-a49a-50ebf6c32832" ? (
                    <>
                      <h4>Añadir suplementos</h4>

                      {JSON.parse(sessionStorage.getItem("ham")).map((sup) => (
                        <div className="row d-flex p-1">
                          <div className="col-sm-8 col-md-8 col-lg-8">
                            <span>{sup.plato}</span>
                          </div>
                          <div className="col-sm-4 col-md-4 col-lg-4">
                            <button
                              className="btn btn-success"
                              onClick={(e) => supAdd(sup, item.id)}
                            >
                              Añadir
                            </button>
                          </div>
                        </div>
                      ))}
                    </>
                  ) : (
                    ""
                  )}
                  {item.id_catego2 ===
                  "1ba3995e-2476-11ed-a49a-50ebf6c32832" ? (
                    <>
                      <h4>Añadir suplementos</h4>

                      {JSON.parse(sessionStorage.getItem("suppizza")).map(
                        (sup) => (
                          <div className="row d-flex p-1">
                            <div className="col-sm-8 col-md-8 col-lg-8">
                              <span>{sup.plato}</span>
                            </div>
                            <div className="col-sm-4 col-md-4 col-lg-4">
                              <button
                                className="btn btn-success"
                                onClick={(e) => supAdd(sup, item.id)}
                              >
                                Añadir
                              </button>
                            </div>
                          </div>
                        )
                      )}
                    </>
                  ) : (
                    ""
                  )}
                  {item.id_catego2 ===
                  "20a52032-25fc-11ed-a49a-50ebf6c32832" ? (
                    <>
                      <h4>Añadir suplementos</h4>

                      {JSON.parse(sessionStorage.getItem("perrito")).map(
                        (sup) => (
                          <div className="row d-flex p-1">
                            <div className="col-sm-8 col-md-8 col-lg-8">
                              <span>{sup.plato}</span>
                            </div>
                            <div className="col-sm-4 col-md-4 col-lg-4">
                              <button
                                className="btn btn-success"
                                onClick={(e) => supAdd(sup, item.id)}
                              >
                                Añadir
                              </button>
                            </div>
                          </div>
                        )
                      )}
                    </>
                  ) : (
                    ""
                  )}
                  {item.id_catego2 ===
                  "ab4d89c5-25fd-11ed-a49a-50ebf6c32832" ? (
                    <>
                      <h4>Añadir suplementos</h4>

                      {JSON.parse(sessionStorage.getItem("perritovegano")).map(
                        (sup) => (
                          <div className="row d-flex p-1">
                            <div className="col-sm-8 col-md-8 col-lg-8">
                              <span>{sup.plato}</span>
                            </div>
                            <div className="col-sm-4 col-md-4 col-lg-4">
                              <button
                                className="btn btn-success"
                                onClick={(e) => supAdd(sup, item.id)}
                              >
                                Añadir
                              </button>
                            </div>
                          </div>
                        )
                      )}
                    </>
                  ) : (
                    ""
                  )}
                  {item.id_catego2 ===
                  "c4d3f3d0-39a4-11ed-8884-50ebf6c32832" ? (
                    <>
                      <h4>Añadir suplementos</h4>

                      {JSON.parse(sessionStorage.getItem("suppizzaveg")).map(
                        (sup) => (
                          <div className="row d-flex p-1">
                            <div className="col-sm-8 col-md-8 col-lg-8">
                              <span>{sup.plato}</span>
                            </div>
                            <div className="col-sm-4 col-md-4 col-lg-4">
                              <button
                                className="btn btn-success"
                                onClick={(e) => supAdd(sup, item.id)}
                              >
                                Añadir
                              </button>
                            </div>
                          </div>
                        )
                      )}
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <span key={i} style={{ display: "none" }}>
                {mailORder.push(item.plato + " x " + amountOfItems(item.id))}
              </span>
            </div>
          ))}
        </div>
      </section>

      <label className="mt-5 mb-3" htmlFor="email">
        <h5>Introduzca su correo electrónico</h5>
      </label>
      <input
        type="mail"
        className="form-control w-50 mx-auto mb-2 text-center"
        onChange={(e) => {
          e.preventDefault();
          setEmail(e.target.value);
        }}
        required
      />
      {email !== "" ? (
        <div className="slide-top">
          <h1 className="p-3 my-4">¿Cómo desea efectuar el pago?</h1>

          <div className="row btn-group-wrapper">
            <div className="col-sm-12 col-md-5 col-lg-5 col-xl-5 pay-now">
              <div className="btn btn-pay-now" onClick={(e) => handleOnline(e)}>
                <span className="menu-text">Pagar ahora</span>
              </div>
            </div>
            <div className="col-sm-12 col-md-5 col-lg-5 col-xl-5 pay-local">
              <div
                className="btn btn-pay-local"
                onClick={(e) => handleLocal(e)}
              >
                <span className="menu-text">Pagar en local</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="checkout-space"></div>
      )}
      <div className={`checkout-space ${display}`}></div>
      {now === true
        ? clientSecret && (
            <Elements stripe={promise}>
              <CheckoutForm
                email={email}
                name={name}
                details={details}
                total={total}
              />
            </Elements>
          )
        : ""}
      {local === true ? (
        <div className="container slide-top">
          <form className="" onSubmit={handleSubmit}>
            <h5 className="mt-5">Introduzca su nombre:</h5>
            <input
              id="name"
              className="form-control w-50 mx-auto my-4 text-center"
              placeholder="Su nombre"
              onChange={(e) => {
                e.preventDefault();
                setName(e.target.value);
                setHideForm("show");
              }}
              required
            />
            {name ? (
              <div className={`container-fluid ${hideForm} slide-top`}>
                <div className=" m-5 w-100 mx-auto checkout-local-resumen">
                  {name && email ? (
                    <>
                      <h1>~Resumen~</h1>
                      Hola {name}! <br />
                      Gracias por haber elegido La Herradura Vinoteca.
                      Encontrará los datos para recoger a continuación:
                      <div className="checkout-destacar row d-flex">
                        <div className="col-sm-12 col-md-12 col-lg-6 col-lg-6 ">
                          <div className="order-details-wrapper">
                            ~ Detalles ~
                            <ul className="p-0">
                              {clean().map((item, i) => (
                                <>
                                  <li className="order-details " key={item.id}>
                                    {item.plato} x {amountOfItems(item.id)}
                                  </li>
                                  <span key={i} style={{ display: "none" }}>
                                    {mailORder.push(
                                      item.plato +
                                        " x " +
                                        amountOfItems(item.id)
                                    )}
                                  </span>
                                </>
                              ))}
                            </ul>
                          </div>
                        </div>
                        <div className="col-sm-12 col-md-12 col-lg-6 col-lg-6 p-2">
                          Número de Pedido: {referencia}
                          <br />A nombre de: {name}
                          <br />
                          Email: {email}
                          <br />
                          Total: {total} €
                        </div>
                      </div>
                      <input
                        className="btn btn-success mt-3"
                        type="submit"
                        value="Confirmar pedido"
                      />
                    </>
                  ) : (
                    <div className="checkout-space"></div>
                  )}
                </div>
              </div>
            ) : (
              <div className="checkout-space"></div>
            )}
          </form>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Checkout;
