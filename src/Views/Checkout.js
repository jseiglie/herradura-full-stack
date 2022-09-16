import axios from "axios";
import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../Components/CheckoutForm";
import { useNavigate } from "react-router-dom";

// This is your test publishable API key.
const promise = loadStripe(
  "pk_test_51Jub2MIPsB2uwGnPRHuBviGhVXe4EpAfloWRqrilwGWsBIwCQ5P2ghkrEP7mnEvsyfVN29ANaNobqvbIpX517fQy00bObYXVug"
);

const Checkout = () => {
  const [clientSecret, setClientSecret] = useState("");
  const [details, setDetails] = useState([]);
  const [now, setNow] = useState(false);
  const [local, setLocal] = useState(false);
  const [name, setName] = useState("");
  const [order, setOrder] = useState([]);
  const [email, setEmail] = useState("");
  const [display, setDisplay] = useState("show");
  const navigate = useNavigate();
  let mailOrder = [];
  let dbReferencia;
  let referencia;

  useEffect(() => {
    if (!sessionStorage.getItem("order")) {
      alert("Debe de realizar una pedido para visualizar esta página");
      navigate("/pickup");
    }
    const temp = [JSON.parse(sessionStorage.getItem("order"))];
    const strobj = JSON.parse(temp[0].data.order);
    dbReferencia = temp[0].data.referencia;
    setOrder(temp[0].data.order);
    referencia = temp[0].data.referencia.substring(18, 24);
    setDetails(JSON.parse(temp[0].data.order));
    console.log("details", JSON.parse(temp[0].data.order));
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
    console.log();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const values = {
      name: name,
      mail: email,
      completed: true,
    };

    const mailOpts = {
      order: mailOrder,
      mail: email,
      name: name,
      referencia: referencia,
    };
    try {
      await axios.post(`${process.env.REACT_APP_APIURL}/sendmail`, mailOpts);
      await axios.post(`${process.env.REACT_APP_APIURL}/complete/${referencia}`, values);
    } catch (error) {}
  };

  const amountOfItems = (id) => details.filter((item) => item.id === id).length;
  const checkdb = async () => {
    const resp = await axios.get(
      `${process.env.REACT_APP_APIURL}/purchases/${dbReferencia}`
    );
    console.log("checkdb ", resp.data);
  };

  return (
    <div className="container checkout-wrapper">
      <label className="mt-5 mb-3" htmlFor="email">
        Introduzca su correo electrónico
      </label>
      <input
        type="mail"
        className="form-control w-50 mx-auto mb-2"
        onChange={(e) => {
          e.preventDefault();
          setEmail(e.target.value);
        }}
        required
      />
      {email !== "" ? (
        <>
          <h1 className="p-3">¿Cómo desea realizar el pago?</h1>

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
        </>
      ) : (
        ""
      )}
      <div className={`checkout-space ${display}`}></div>
      {now === true
        ? clientSecret && (
            <Elements stripe={promise}>
              <CheckoutForm referencia={referencia} email={email} mailOrder={mailOrder} name={name}/>
            </Elements>
          )
        : ""}
      {local === true ? (
        <div className="container">
          <form className="p-5" onSubmit={handleSubmit}>
            <label htmlFor="name">Introduzca su nombre:</label>
            <input
              id="name"
              className="form-control w-25 mx-auto"
              placeholder="Su nombre"
              onChange={(e) => {
                e.preventDefault();
                setName(e.target.value);
              }}
              required
            />

            <div className="container-fluid">
              <div className=" m-5 w-100 mx-auto checkout-local-resumen">
                {name && email ? (
                  <>
                    <h1>~Resumen~</h1>
                    Hola {name}! <br />
                    Gracias por haber elegido La Herradura Vinoteca. Encontrará
                    los datos para recoger a continuación:{" "}
                    <div className="checkout-destacar row d-flex">
                      <div className="col-sm-12 col-md-12 col-lg-6 col-lg-6">
                        <div className="order-details-wrapper">
                          {" "}
                          ~ Detalles ~
                          <ul>
                            {clean().map((item) => (
                              <>
                                <li className="order-details" key={item.id}>
                                  {item.plato} x {amountOfItems(item.id)}
                                  {/* {console.log(mailOrder)} */}
                                </li>
                                <span style={{ display: "none" }}>
                                  {mailOrder.push(
                                    item.plato + " x " + amountOfItems(item.id)
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
                        Total: {order.total} €
                      </div>
                    </div>
                    <input
                      className="btn btn-success"
                      type="submit"
                      value="enviar"
                    />
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>
          </form>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Checkout;
