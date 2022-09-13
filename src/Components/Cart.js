import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Cart = (props) => {
  let cartItems = [props.items];
  
  const [items, setItems] = useState([cartItems[0]]);
  const [subtotal, setSubtotal] = useState([]);
  const [cleanCart, setCleanCart] = useState([])
  const navigate = useNavigate();

const date = new Date().toISOString().slice(2,19).replace(/-/g,"_")
const ran = date+"_"+Math.floor(Math.random()*1000)*Math.floor(Math.random()*1000)

  useEffect(() => {
    debt();
    
    amountOfItems();
    //console.log("cartItems", cartItems)
    console.log(items)

    
  }, [cartItems[0]]);


  const clean = ()=>{
    let data = cartItems[0]
    let jsonObj = data.map(JSON.stringify)
    let uniqueSet = new Set(jsonObj);
    let result= Array.from(uniqueSet).map(JSON.parse)
   return(result)
    
  }
  

  const debt = () => {
    let arr = [];
    let temp;
    let result;
    if (cartItems[0].length > 1) {
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
    }
  };

  const handleProcesarPago = async (e) => {
    console.log(cartItems[0])
    const payload = {data: cartItems[0], number: ran, total: subtotal}
    console.log(payload)
    try {
      await axios.post(
        `${process.env.REACT_APP_APIURL}/neworder`,
        payload).then((res)=>console.log(res)).then((res)=>console.log(res))
      
      navigate("/checkout");
      
    } catch (error) {
      alert("Ha ocurrido un error en el proceso")
      console.log({error: error})
    }

  };

  const handleEmpty = () => {
    cartItems = [];
    setItems([])
    props.sendData(cartItems);
  };

  const deleteCartItem = (e) => {
    let del;
    if (cartItems[0].length > 0) {
      del = cartItems[0].splice(e.target.id, 0);
      props.deleteCartItem(del);
    }
    if ((cartItems[0].length = 0)) {
      del = [];
      props.deleteCartItem(del);
    }
  };

  const amountOfItems = (id) =>
    cartItems[0].filter((item) => item.id === id).length;

  const addToCart = (item) => {
    cartItems[0] = [...cartItems[0], item];
    console.log(cartItems[0])
    props.sendAdd(cartItems);
  };

  const removeFromCart = (e) => {
    const indexOfItemToRemove = cartItems[0].findIndex(
      (cartItem) => cartItem.id === e.target.id
    );
    console.log(cartItems[0]);
    props.removeFromCart([
      ...cartItems[0].slice(0, indexOfItemToRemove),
      ...cartItems[0].slice(indexOfItemToRemove + 1),
    ]);
  };



  //console.log(final)

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