import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  useStripe,
  useElements,
  CardElement,
} from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function CheckoutForm(props) {
  const stripe = useStripe();
  const elements = useElements();
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
  const [message] = useState();
  const navigate = useNavigate();
  const [stripeItems, setStripeItems] = useState();
  const [dbReferencia] = useState(JSON.parse(sessionStorage.getItem("order")).data.referencia)
  const [details] = useState(props.details)
  const [total] = useState(props.total)
  const [referencia] = useState(JSON.parse(sessionStorage.getItem("order")).data.referencia.substring(18, 24))
  const [email] = useState(props.email)
  const [name] = useState(props.name)
  
  useEffect(() => {
    
    let temp = JSON.parse(sessionStorage.getItem("order"));
    let strobj = JSON.parse(temp.data.order);
    setStripeItems(JSON.parse(temp.data.order));
    // Create PaymentIntent as soon as the page loads
    window
      .fetch("http://localhost:3001/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: strobj,
        }),
      })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setClientSecret(data.clientSecret);
      });// eslint-disable-next-line
  }, []);

  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);

      const mailOpts = {
        order: orderDetails(),
        mail: email,
        name: name,
        total: total,
        referencia: referencia,
      };
      const values = {
        name: name,
        mail: email,
        completed: true,
      };
      try {
      await axios.post(`${process.env.REACT_APP_APIURL}/sendmail`, mailOpts);
      await axios.post(`${process.env.REACT_APP_APIURL}/sendherradura`, mailOpts);
      await axios.put(`${process.env.REACT_APP_APIURL}/complete/${dbReferencia}`, values);
    } catch (error) {}
    }
  };

  const handleCancel = () => {
    sessionStorage.removeItem("order");
    navigate("/delivery");
  };

  const clean = () => {
    const uniqueSet = new Set(details.map(JSON.stringify));
    const result = Array.from(uniqueSet).map(JSON.parse);
    return result;
  };
  const amountOfItems = (id) => details.filter((item) => item.id === id).length;

  const orderDetails = () => {
    let temp = []// eslint-disable-next-line
    clean().map((item) => {
      temp.push(item.plato + " x " + amountOfItems(item.id));
    });
    return temp
  };

  return (
    <>
      <form className="my-4 slide-top" id="payment-form" onSubmit={handleSubmit}>
        <h5 className="mb-3">Introduzca los datos de su tarjeta:</h5> 
        <p className="form-text">**No almacenamos los datos de su tarjeta**</p>
        <CardElement
          id="card-element"
          onChange={handleChange}
        />
        <button className="btn btn-success mt-4 mx-3 px-5 py-2" disabled={processing || disabled || succeeded} id="submit">
          <span id="button-text">
            {processing ? (
              <div className="spinner" id="spinner"></div>
            ) : (
              "Pagar ahora"
            )}
          </span>
        </button>

        <button
          className="btn btn-danger mt-4 mx-3 py-2 px-4"
          onClick={(e) => handleCancel}
        >
          Cancelar pedido
        </button>
        {/* Show any error or success messages */}
        {message && <div id="payment-message">{message}</div>}
        {/* Show any error that happens when processing the payment */}
        {error && (
          <div className="card-error" role="alert">
            <div className="bg-danger p-3 my-5">{error}</div>
          </div>
        )}
        {/* Show a success message upon completion */}
        <div className={succeeded ? "result-message" : "result-message hidden"}>
          <div className="bg-success p-3 my-5">
            <b>
              Su pago se ha realizado satisfactoriamente, revise su bandeja de entrada. Gracias por su
              preferencia.
              <Link to={"/"}>Volver a Home</Link>
            </b>
          </div>
        </div>
      </form>
      <div className="checkout-space"></div>
    </>
  );
}
