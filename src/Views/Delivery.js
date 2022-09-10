import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Cart from "../Components/Cart";


function addItem(uid, plato, precio){
  this.id = uid;
  this.plato = plato;
  this.precio = precio;
}

const Delivery = () => {
  const [catego, setCatego] = useState();
  const [data, setData] = useState([]);

  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);

  const loader = async () => {
    const menu = await axios.get(`${process.env.REACT_APP_APIURL}/menu`);
    setData(menu.data);
    sessionStorage.setItem("menu", JSON.stringify( menu.data))

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
  }, [items]);

  const handleItems = (e) => {
    
    const id = (e.target.id)

    const result = data.filter((item)=> item.uid === id)
    //console.log(result[0].uid)
    
    setItems([...items, new addItem(result[0].uid, result[0].plato, result[0].precio)]);
    //console.log(items)
  };

  const title = () => {
    let result = categories.filter((item) => item.uid === catego);
    return result[0].catego;
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
        <div className="row menu-cart-holder">
          <button
            id="sidebarCollapse"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvas"
            role="button"
            aria-label="Toggle menu"
            className="gx-0 p-0 mx-0"
          >
            Menu
          </button>
          <span>
            <button className="no-deco"  data-bs-toggle="modal"
        data-bs-target="#exampleModal">
              <i className="fa-solid fa-cart-shopping cart-ico rotate"></i>
            </button>
          </span>
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
                              onClick={(e) => handleItems(e)}
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

      {/* <!-- Button trigger modal --> */}
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <Cart items={items} />
        </div>
      </div>
    </div>
  );
};

export default Delivery;
