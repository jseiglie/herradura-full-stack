import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Cart = (props) => {
  let cartItems = [props.items];// eslint-disable-next-line
  const [items, setItems] = useState([cartItems[0]]);
  const [subtotal, setSubtotal] = useState([]);
  const navigate = useNavigate();

  const date = new Date().toISOString().slice(2, 19).replace(/-/g, "_");
  const ran =
    date +
    "_" +
    Math.floor(Math.random() * 1000) * Math.floor(Math.random() * 1000);

  useEffect(() => {
    debt();
    amountOfItems();// eslint-disable-next-line
  }, [cartItems[0]]);

  const clean = () => {
    let uniqueSet = new Set(cartItems[0].map(JSON.stringify));
    let result = Array.from(uniqueSet).map(JSON.parse);
    return result;
  };

  const debt = () => {
    let arr = [];
    let temp;
    let result;
    if (cartItems[0].length > 0) {
      cartItems[0].forEach((element) => {// eslint-disable-next-line
        for (let key in element) {
          temp = JSON.stringify(element);
          result = JSON.parse(temp);
        }
        arr.push(result.precio);
        setSubtotal(arr.reduce((a, b) => a + b).toFixed(2));  
      });
    }
  };

  const handleProcesarPago = async (e) => {
    const payload = { data: cartItems[0], number: ran, total: subtotal };
    sessionStorage.setItem("payload", JSON.stringify(payload));
    try {
      const resp = await axios.post(
        `${process.env.REACT_APP_APIURL}/neworder`,
        payload
      );
      sessionStorage.setItem("order", JSON.stringify(resp));
      navigate("/checkout");
    } catch (error) {
      alert("Ha ocurrido un error en el proceso");
    }
  };

  const handleEmpty = () => {
    cartItems = [];
    setItems([]);
    props.sendData(cartItems);
  };

  const amountOfItems = (id) =>
    cartItems[0].filter((item) => item.id === id).length;

  const addToCart = (item) => {
    cartItems[0] = [...cartItems[0], item];
    props.sendAdd(cartItems);
  };

  const removeFromCart = (e) => {
    const indexOfItemToRemove = cartItems[0].findIndex(
      (cartItem) => cartItem.id === e.target.id
    );
    props.removeFromCart([
      ...cartItems[0].slice(0, indexOfItemToRemove),
      ...cartItems[0].slice(indexOfItemToRemove + 1),
    ]);
    setItems(cartItems[0]);
  };

  return (
    <div className="modal-content">
      <div className="modal-header pt-0 pb-0 bg-dark text-white ">
        <h5 className="modal-title" id="exampleModalLabel">
          Revisar Pedido
        </h5>
        <button
          className="btn btn-modal-close p-0"
          data-bs-dismiss="modal"
          aria-label="Close"
        >
          <i className="fa-solid fa-square-xmark fa-lg text-danger"></i>
        </button>
      </div>
      <div className="modal-body">
        {cartItems[0].length > 0
          ? clean().map((item, i) => (
              <div key={i}>
                <div key={i} className="row">
                  <div className="col-7">{item.plato}</div>
                  <div className="col-3">
                    <i
                      id={item.id}
                      onClick={(e) => removeFromCart(e)}
                      className="fa-solid fa-minus  p-1"
                    ></i>{" "}
                    {amountOfItems(item.id)}{" "}
                    <i
                      onClick={(e) => addToCart(item)}
                      className="fa-solid fa-plus  p-1"
                    ></i>
                  </div>
                  <div className="col-2">
                    {(amountOfItems(item.id) * item.precio).toFixed(2)}
                  </div>
                </div>
              </div>
            ))
          : "Aun no has añadido nada a la cesta"}
        {cartItems[0].length > 0 ? (
          <div className="row">
            <div className="col-10"></div>
            <div className="col-2">Total: {subtotal}</div>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-secondary"
          data-bs-dismiss="modal"
        >
          Cerrar
        </button>
        {cartItems[0].length > 0 ? (
          <>
            <button className="btn btn-danger" onClick={handleEmpty}>
              Vaciar
            </button>
            <button
              className="btn btn-success"
              type="button"
              onClick={(e) => handleProcesarPago(e)}
              data-bs-dismiss="modal"
            >
              Procesar pago
            </button>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
Cart.propTypes = {
  items: PropTypes.array,
  sendData: PropTypes.func,
  deleteCartItem: PropTypes.func,
};
export default Cart;