import axios from "axios";
import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements} from "@stripe/react-stripe-js";
import CheckoutForm from "../Components/CheckoutForm";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe("pk_test_51Jub2MIPsB2uwGnPRHuBviGhVXe4EpAfloWRqrilwGWsBIwCQ5P2ghkrEP7mnEvsyfVN29ANaNobqvbIpX517fQy00bObYXVug");

const Checkout = (props) => {

    const [clientSecret, setClientSecret] = useState("");
    let items = [props.item]

    const [now, setNow] =useState(false)
    const [local, setLocal] =useState(false)


    useEffect(() => {
      // Create PaymentIntent as soon as the page loads
      fetch("http://localhost:3001/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: [{ id: "price_1LZbmXIPsB2uwGnPsNjq5Iqr" }] }),
      })
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret));
    }, []);
  
    const appearance = {
      theme: 'stripe',
    };
    const options = {
      clientSecret,
      appearance,
    };
  
    const handleOnline = (e)=>{
      setNow(true)
      setLocal(false)
      console.log()
  }
  
  const handleLocal = (e)=>{
      setNow(false)
      setLocal(true)
  }

    return (
      <>
 <h1>Cómo desea realizar el pago?</h1>
    <button className="btn" onClick={e=> handleOnline(e)}>Pagar ahora</button>
    <button className="btn" onClick={e=> handleLocal(e)}>Pagar en el local</button>
    {now==true? 
        clientSecret && (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        )
        :  ""}
        </>
    );
 };

export default Checkout;
