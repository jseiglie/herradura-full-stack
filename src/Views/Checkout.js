import axios from "axios";
import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../Components/CheckoutForm";
import { useNavigate } from "react-router-dom";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(
  "pk_test_51Jub2MIPsB2uwGnPRHuBviGhVXe4EpAfloWRqrilwGWsBIwCQ5P2ghkrEP7mnEvsyfVN29ANaNobqvbIpX517fQy00bObYXVug"
);

const Checkout = (props) => {
  const [clientSecret, setClientSecret] = useState("");
  const [referencia, setReferencia] = useState("");
  const [details, setDetails] = useState([]);
  const [databack, setDataback] = useState([]);
  const [now, setNow] = useState(false);
  const [local, setLocal] = useState(false);
  const [name, setName] = useState("");
  const [order, setOrder] = useState([]);
  const [email, setEmail] = useState("")
  const navigate = useNavigate();
  let mailOrder = [];

  useEffect(() => {
    if (!sessionStorage.getItem("order")) {
      alert("Debe de realizar una pedido para visualizar esta página");
      navigate("/pickup");
      //console.log(sessionStorage.getItem("order"))
    }

    let temp = [JSON.parse(sessionStorage.getItem("order"))];
    setOrder(temp[0].data);
    console.log(order);
    //console.log(temp[0].data.referencia)
    let str = temp[0].data.referencia.substring(18, 24);
    //console.log(str);
    setReferencia(str);
    setDetails(JSON.parse(temp[0].data.order));
    // Create PaymentIntent as soon as the page loads
    checkdb();

    fetch("http://localhost:3001/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: [{ id: "price_1LZbmXIPsB2uwGnPsNjq5Iqr" }],
      }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  const handleOnline = (e) => {
    setNow(true);
    setLocal(false);
    console.log();
  };

  const handleLocal = (e) => {
    setNow(false);
    setLocal(true);
  };

  const clean = () => {
    let data = details;
    let jsonObj = data.map(JSON.stringify);
    let uniqueSet = new Set(jsonObj);
    let result = Array.from(uniqueSet).map(JSON.parse);
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
      referencia: referencia
    };
    try {
      // const resp = await axios.put(`${process.env.REACT_APP_APIURL}/complete/${order.referencia}`, values)
      // console.log(resp);
      console.log(mailOrder);
      const mail = await axios.post(
        `${process.env.REACT_APP_APIURL}/sendmail`,
        mailOpts
      );
      console.log(mail);
    } catch (error) {}
  };

  const amountOfItems = (id) => details.filter((item) => item.id === id).length;

  const checkdb = async () => {
    const resp = await axios.get(
      `${process.env.REACT_APP_APIURL}/purchases/${order.referencia}`
    );
    console.log(resp.data);
  };

  return (
    <div className="checkout-wrapper">
      <h1>¿Cómo desea realizar el pago?</h1>
      <div className="container btn-group-checkout d-flex">
        <div className="pay-now">
          <button className="btn btn-pay-now" onClick={(e) => handleOnline(e)}>
            <span className="menu-text">Pagar ahora</span>
          </button>
        </div>
        <div className="pay-local">
          <button className="btn btn-pay-local" onClick={(e) => handleLocal(e)}>
            <span className="menu-text">Pagar en local</span>
          </button>
        </div>
      </div>
      {now === true ? (
        clientSecret && (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        )
      ) : (
        <div className="container">
          <form onSubmit={handleSubmit}>
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
            <label htmlFor="email">Correo electrónico</label>
            <input
              type="mail"
              className="form-control w-25 mx-auto"
              placeholder="Su correo electrónico"
              onChange={(e) => {
                e.preventDefault();
                setEmail(e.target.value);
              }}
              required
            />
            <div className="container ">
              <div className=" m-5 checkout-local-resumen">
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
                        <br />Email: {email}
                        <br/>Total: {order.total} €
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
      )}
    </div>
  );
};

export default Checkout;
