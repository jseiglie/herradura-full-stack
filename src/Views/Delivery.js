import React, { useEffect, useState } from "react";
import axios from "axios";
import Cart from "../Components/Cart";

function addItem(uid, plato, precio, id_catego2) {
  this.id = uid;
  this.plato = plato;
  this.precio = precio;
  this.id_catego2 = id_catego2;
}

const Delivery = () => {
  const [catego, setCatego] = useState();
  const [data, setData] = useState([]);

  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [ammount, setAmmount] = useState();

  const loader = async () => {
    const menu = await axios.get(
      `${process.env.REACT_APP_APIURL}/menuDisponible`
    );
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
    }
  };

  const suppLoad = async () => {
    const pizzaresp = await axios.get(
      `${process.env.REACT_APP_APIURL}/suppizza`
    );
    sessionStorage.setItem("suppizza", JSON.stringify(pizzaresp.data));
    //console.log(sessionStorage.getItem("suppiza"))
    const pizzavegresp = await axios.get(
      `${process.env.REACT_APP_APIURL}/subpizzavegana`
    );
    sessionStorage.setItem("suppizzaveg", JSON.stringify(pizzavegresp.data));
    //console.log(sessionStorage.getItem("suppizaveg"))
    const hamvegana = await axios.get(
      `${process.env.REACT_APP_APIURL}/hamvegana`
    );
    sessionStorage.setItem("hamvegana", JSON.stringify(hamvegana.data));
    //console.log(sessionStorage.getItem("hamvegana"))
    const ham = await axios.get(`${process.env.REACT_APP_APIURL}/ham`);
    sessionStorage.setItem("ham", JSON.stringify(ham.data));
    //console.log(sessionStorage.getItem("ham"))
    const perrito = await axios.get(`${process.env.REACT_APP_APIURL}/perrito`);
    sessionStorage.setItem("perrito", JSON.stringify(perrito.data));
    //console.log(sessionStorage.getItem("perrito"))
    const perritovegano = await axios.get(
      `${process.env.REACT_APP_APIURL}/perritovegano`
    );
    sessionStorage.setItem("perritovegano", JSON.stringify(perritovegano.data));
    //console.log(sessionStorage.getItem("perritovegano"))
  };

  useEffect(() => {
    loader();
    suppLoad();
  }, []);

  useEffect(() => {
    loadCat(catego); // eslint-disable-next-line
  }, [catego]);

  useEffect(() => {
    setAmmount(items.length);
  }, [items]);

  const handleItems = (item) => {
    setItems([
      ...items,
      new addItem(item.uid, item.plato, item.precio, item.id_catego2),
    ]);
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
                <>
                  {item.uid === "4f9e813d-2600-11ed-a49a-50ebf6c32832" ||
                  item.uid === "4f9e8c1f-2600-11ed-a49a-50ebf6c32832" ||
                  item.uid === "64948f95-399c-11ed-8884-50ebf6c32832" ||
                  item.uid === "ab4d7b65-25fd-11ed-a49a-50ebf6c32832" ||
                  item.uid === "ccc5d11a-399d-11ed-8884-50ebf6c32832" ||
                  item.uid === "d1ee7692-25fe-11ed-a49a-50ebf6c32832" ? (
                    ""
                  ) : (
                    <li
                      key={item.uid}
                      id={item.uid}
                      onClick={(e) => selected(e)}
                      data-bs-dismiss="offcanvas"
                      className="nav-item delivery-nav-item"
                    >
                      {item.catego}
                    </li>
                  )}
                </>
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
                {ammount > 0 ? <span className="badge">{ammount}</span> : ""}
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
              <>
                {item.id_catego2 === "4f9e813d-2600-11ed-a49a-50ebf6c32832" ||
                item.id_catego2 === "4f9e8c1f-2600-11ed-a49a-50ebf6c32832" ||
                item.id_catego2 === "64948f95-399c-11ed-8884-50ebf6c32832" ||
                item.id_catego2 === "ab4d7b65-25fd-11ed-a49a-50ebf6c32832" ||
                item.id_catego2 === "ccc5d11a-399d-11ed-8884-50ebf6c32832" ||
                item.id_catego2 === "d1ee7692-25fe-11ed-a49a-50ebf6c32832" ? (
                  ""
                ) : (
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
                            <div className="col-6 footer-price">
                              {item.precio}€
                            </div>
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
                )}
              </>
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
