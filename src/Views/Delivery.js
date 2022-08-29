import React, { useEffect, useState } from "react";
import axios from "axios";
import DeliveryNav from "../Components/DeliveryNav";
import { Link } from "react-router-dom";
import Modal from "../Components/Modal";

const Delivery = () => {
  const [categories, setCategories] = useState([]);
  const [catego, setCatego] = useState();
  const [data, setData] = useState([]);
  const [toggle, setToggle] = useState(false);

  const loader = async () => {
    const resp = await axios.get(`${process.env.REACT_APP_APIURL}/categories`);
    setCategories(resp.data);
  };

  const selected = (catego) => {
    setCatego(catego);
    //   console.log("catego recibido: " + catego);
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

  const handleToggle = () => {
    setToggle(true);
  };

  return (
    <div className="container-fluid  gx-0">
      {categories && categories.length > 0 ? (
        <>
          <div className="row menu-cart-holder">
            <DeliveryNav items={categories} selected={selected} />
            <span>
              <Link className="no-deco" to={"/checkout"}>
                <i className="fa-solid fa-cart-shopping cart-ico rotate"></i>
              </Link>
            </span>
          </div>
        </>
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
              <div className="col-lg-4 col-md-4 col-sm-6 card-group mb-3">
                <div className="card card-wrap">
                  <div className="card-body">
                    <div className="row">
                      {item.img !== null ? (
                        <div className="col-6">
                          <div className="card-img">
                            <img src="" alt="img plato" />
                          </div>
                        </div>
                      ) : (
                        <div className="col-6">
                          <div className="card-img">
                            <img
                              src="./img/herradura_logo.webp"
                              alt="Cargando"
                            />
                          </div>
                        </div>
                      )}
                      <div className="col card-text-wrapper">
                        <h5 className="line-clamp plato">{item.plato}</h5>
                        <p className="line-clamp mb-0">{item.descripcion}</p>
                      </div>
                    </div>
                    <div className="card-foter">
                      <div className="row footer-wrapper">
                        <div className="col footer-price">{item.precio}€</div>
                        <div className="col">
                          <span>
                            <i className="fa-solid fa-cart-arrow-down fa-xl footer-cart-ico rotate"></i>
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
      <Modal />
    </div>
  );
};

export default Delivery;
