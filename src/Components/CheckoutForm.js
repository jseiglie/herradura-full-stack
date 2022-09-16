import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  PaymentElement,
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
  const [message, setMessage] = useState();
  const navigate = useNavigate();
  const [stripeItems, setStripeItems] = useState();
  const [dbReferencia, setDbReferencia] = useState(JSON.parse(sessionStorage.getItem("order")).data.referencia)
  const [details, setDetails] = useState(props.details)
  const [referencia, setReferencia] = useState(JSON.parse(sessionStorage.getItem("order")).data.referencia.substring(18, 24))
  const email = props.email

  const name = props.name
  
  useEffect(() => {
    
    let temp = JSON.parse(sessionStorage.getItem("order"));
    let strobj = JSON.parse(temp.data.order);
    //setDetails(JSON.parse(temp.data.order));
    console.log(JSON.parse(temp.data.order));
    setStripeItems(JSON.parse(temp.data.order));
    console.log({ items: [{ stripeItems }] });
    // Create PaymentIntent as soon as the page loads
    //orderDetails()
    console.log(details)
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
      });
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
      console.log(referencia)
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
    let temp = []
    clean().map((item) => {
      temp.push(item.plato + " x " + amountOfItems(item.id));
      console.log(temp)
    });
    return temp
  };

  return (
    <>
      <form id="payment-form" onSubmit={handleSubmit}>
        <CardElement
          id="card-element"
          onChange={handleChange}
        />
        <button disabled={processing || disabled || succeeded} id="submit">
          <span id="button-text">
            {processing ? (
              <div className="spinner" id="spinner"></div>
            ) : (
              "Pay now"
            )}
          </span>
        </button>

        <button
          className="btn btn-danger m-3 py-2 px-3"
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

        {/* MODIFICAR ESTO */}
        {/* Show a success message upon completion */}
        <div className={succeeded ? "result-message" : "result-message hidden"}>
          <div className="bg-success p-3 my-5">
            <b>
              Su pago se ha realizado satisfactoriamente, gracias por su
              preferencia.
              <Link to={"/"}>Volver a Home</Link>
            </b>
          </div>
        </div>
      </form>
    </>
  );
}
