import React, { useEffect, useState } from "react";
import axios from "axios";
import Cart from "../Components/Cart";

function addItem(uid, plato, precio) {
  this.id = uid;
  this.plato = plato;
  this.precio = precio;
}

const Delivery = () => {
  const [catego, setCatego] = useState();
  const [data, setData] = useState([]);

  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [ammount, setAmmount] = useState();

  const loader = async () => {
    const menu = await axios.get(`${process.env.REACT_APP_APIURL}/menu`);
    //  console.log(menu)
    setData(menu.data);
    sessionStorage.setItem("menu", JSON.stringify(menu.data));

    const cat = await axios.get(`${process.env.REACT_APP_APIURL}/categories`);
    setCategories(cat.data);
  };
  const selected = (e) => {
    setCatego(e.target.id);
  };
  const loadCat = async (id) => {
    if (catego !== undefined) {
      const resp = await axios.get(
        `${process.env.REACT_APP_APIURL}/bycategory/${id}`
      );
      setData(resp.data);
      // console.log("catego despues del get: " + catego);
    }
  };
  useEffect(() => {
    loader();
  }, []);
  useEffect(() => {
    loadCat(catego);
    //  console.log("catego useEffect: " + catego);
  }, [catego]);

  useEffect(() => {
    // console.log(items);
    // itemAmmount()
    setAmmount(items.length);
  }, [items]);

  const handleItems = (item) => {
    setItems([...items, new addItem(item.uid, item.plato, item.precio)]);
  };

  const title = () => {
    let result = categories.filter((item) => item.uid === catego);
    return result[0].catego;
  };

  const cardCat = (item) => {
    let result = categories.filter((el) => el.uid === item);
    return result[0]?.catego;
  };

  const sendData = (data) => {
    setItems(data);
  };

  const deleteCartItem = (data) => {
    setItems(data);
  };

  const sendAdd = ([data]) => {
    setItems(data);
  };

  const removeFromCart = (data) => {
    setItems(data);
  };

  // const itemAmmount = () =>{
  //   console.log(items)
  //   let jsonObj = items.map(JSON.stringify)
  //   console.log(jsonObj)
  //   let uniqueSet = new Set(jsonObj);
  //   console.log(uniqueSet)
  //   let result= Array.from(uniqueSet).map(JSON.parse)
  //   console.log(result.length)
  //   return result.length
  // }
  return (
    <div className="container-fluid  gx-0">
      <h1 className="p-3">{catego ? title(catego) : "Menu"}</h1>
      <nav
        className="offcanvas offcanvas-start offcanvas-delivery"
        tabIndex="-1"
        id="offcanvas"
        data-bs-keyboard="false"
        data-bs-backdrop="true"
        data-bs-scroll="true"
      >
        <div className="offcanvas-header">
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body px-0">
          <ul className="navbar-nav">
            {categories &&
              categories.map((item) => (
                <li
                  key={item.uid}
                  id={item.uid}
                  onClick={(e) => selected(e)}
                  data-bs-dismiss="offcanvas"
                  className="nav-item delivery-nav-item"
                >
                  {item.catego}
                </li>
              ))}
          </ul>
        </div>
      </nav>
      {data && data.length > 0 ? (
        <div className="row menu-cart-holder d-flex">
          <div className="fixed-top delivery-btn-holder">
            <button
              id="sidebarCollapse"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvas"
              aria-label="Toggle menu"
              className="no-deco"
            >
              <i className="fa-solid fa-utensils menu-ico "></i>
            </button>

            <button
              className="no-deco"
              data-bs-toggle="modal"
              data-bs-target="#cartModal"
            >
              <i className="fa-solid fa-cart-shopping cart-ico  ">
                {" "}
                {ammount > 0 ? (
                  <span className="badge">{ammount}</span>
                ) : (
                  ""
                )}{" "}
              </i>
            </button>
          </div>
        </div>
      ) : (
        <>
          <h1>Cargando Datos</h1>
          <img src="./img/herradura_logo.webp" alt="Cargando" />
        </>
      )}
      <div className="container ">
        <div className="row menu-wrapper">
          {data && data.length > 0 ? (
            data.map((item) => (
              <div
                key={item.uid}
                className="col-xl-2 col-lg-3 col-md-4 col-sm-12 card-group mb-3"
              >
                <div className="card card-wrap scale">
                  {cardCat(item.id_catego2)}
                  <div className="card-body">
                    <div className="row">
                      {item.img ? (
                        <div className="card-img img-fluid mb-3">
                          <img src={item.img} alt="img plato" />
                        </div>
                      ) : (
                        <div className="card-img img-fluid mb-3">
                          <img
                            src="./img/herradura_logo.webp"
                            alt="Cargando"
                            style={{ width: 150, height: "auto" }}
                          />
                        </div>
                      )}
                      <div className=" card-text-wrapper mb-4">
                        <h5 className="line-clamp plato">
                          {item.plato.lenght >= 15 ? (
                            <>{item.plato}</>
                          ) : (
                            <>
                              {item.plato} <br />
                              <br />
                            </>
                          )}
                        </h5>
                        <span className="line-clamp mb-0">
                          {item.descripcion.lenght >= 15 ? (
                            <>{item.descripcion}</>
                          ) : (
                            <>
                              {item.descripcion} <br />
                              <br />
                            </>
                          )}
                        </span>
                      </div>
                    </div>
                    <div className="card-foter ">
                      <div className="row footer-wrapper">
                        <div className="col-6 footer-price">{item.precio}€</div>
                        <div className="col-6">
                          <span>
                            <i
                              id={item.uid}
                              className="fa-solid fa-cart-arrow-down fa-xl footer-cart-ico rotate"
                              onClick={(e) => handleItems(item)}
                            ></i>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <img src="./img/herradura_logo.webp" alt="Cargando" />
          )}
        </div>
      </div>

      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="cartModal"
        tabIndex="-1"
        aria-labelledby="cartModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <Cart
            items={items}
            sendData={sendData}
            deleteCartItem={deleteCartItem}
            sendAdd={sendAdd}
            removeFromCart={removeFromCart}
          />
        </div>
      </div>
    </div>
  );
};

export default Delivery;
