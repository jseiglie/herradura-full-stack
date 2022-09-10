import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const Cart = (props) => {
  const cartItems = [props.items];
  const [total, setTotal] = useState();
  const [subtotal, setSubtotal] = useState([]);
  const [ammount, setAmmount] = useState(1);
  const navigate = useNavigate();
  useEffect(() => {
    debt();
  }, [cartItems]);

  const debt = () => {
    let arr = [];
    let temp;
    let result;
    cartItems[0].forEach((element) => {
      // console.log(element);
      for (let key in element) {
        //console.log(key + "----" + JSON.stringify( element))
        temp = JSON.stringify(element);
        result = JSON.parse(temp);
      }
      arr.push(result.precio);
      //console.log("array ----- " + arr);
      setSubtotal(arr.reduce((a, b) => a + b).toFixed(2));
      //console.log(subtotal);
      //console.log(result.precio)
      //setSubtotal(subtotal.push(result.precio))
    });
  };

  const handleProcesarPago = (e) => {
    navigate("/checkout");
  };

  return (
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">
          Revisar Pedido
        </h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
      </div>
      <div className="modal-body">
        {cartItems[0].length > 0
          ? cartItems[0].map((item, i) => (
              <div key={i}>
                <div key={i} className="row">
                  <div className="col-6">{item.plato}</div>
                  <div className="col-3">
                    <i
                      onClick={(e) => setAmmount(ammount - 1)}
                      className="fa-solid fa-minus"
                    ></i>{" "}
                    {ammount}{" "}
                    <i
                      onClick={(e) => setAmmount(ammount + 1)}
                      className="fa-solid fa-plus"
                    ></i>
                  </div>
                  <div className="col-2">{item.precio}</div>
                  <div className="col-1">
                    <i
                      id={item.id}
                      className="dash-ico fa-regular fa-trash-can"
                      onClick={(e) => console.log(e.target.id)}
                    ></i>
                  </div>
                </div>
              </div>
            ))
          : "Aun no has añadido nada a la cesta"}
        {cartItems[0].length > 0 ? (
          <div className="row">
            <div className="col-6"></div>
            <div className="col-3"></div>
            <div className="col-2">Total: {subtotal}</div>
            <div className="col-1"></div>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-danger"
          data-bs-dismiss="modal"
        >
          {cartItems[0].length > 0 ? "Cancelar" : "Cerrar"}
        </button>
        {cartItems[0].length > 0 ? (
          <button
          className="btn btn-success"
          type="button"
          onClick={(e) => handleProcesarPago(e)}
          data-bs-dismiss="modal"
        >
          Procesar pago
        </button>
        ) : ""}
        
      </div>
    </div>
  );
};

Cart.propTypes = {
  items: PropTypes.array,
};

export default Cart;
