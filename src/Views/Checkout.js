import axios from "axios";
import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../Components/CheckoutForm";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(
  "pk_test_51Jub2MIPsB2uwGnPRHuBviGhVXe4EpAfloWRqrilwGWsBIwCQ5P2ghkrEP7mnEvsyfVN29ANaNobqvbIpX517fQy00bObYXVug"
);

const Checkout = (props) => {
  const [clientSecret, setClientSecret] = useState("");
  let items = [props.item];

  const [now, setNow] = useState(false);
  const [local, setLocal] = useState(false);
  const [name, setName] = useState("")


  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
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

const handleSubmit = (e) =>{
  console.log(e)
}

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
      {now == true
        ? clientSecret && (
            <Elements options={options} stripe={stripePromise}>
              <CheckoutForm />
            </Elements>
          )
        : <div className="container">
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Introduzca su nombre:</label>
          <input id="name" className="form-control" placeholder="Su nombre" onChange={e=>setName(e.target.value)}/>
          {`Deberá de abonar: `} 
          {console.log(items)}
          <input type="submit" value="enviar"/>
        </form>
        </div>}
    </div>
  );
};

export default Checkout;
