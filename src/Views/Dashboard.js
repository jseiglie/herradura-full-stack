import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [menu, setMenu] = useState([]);
  const [catego, setCatego] = useState([]);
  const [byCatego, setByCatego] = useState("menu");
  const [selected, setSelected] = useState(byCatego);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      alert("no tiene permiso para estar aqui");
      navigate("/");
    }
    getMenu();
    getCatego();
  }, []);

  const getMenu = async () => {
    const res = await axios.get(`${process.env.REACT_APP_APIURL}/menu`);
    setMenu(res.data);
    // console.log(res.data)
  };

  const getCatego = async () => {
    const res = await axios.get(`${process.env.REACT_APP_APIURL}/categories`);
    setCatego(res.data);
  };

  const handleclick = (e) => {
    setSelected(e.target.id);
  };

const getOneCat = async (cat) =>{
  const res = await axios.get(`${process.env.REACT_APP_APIURL}/bycategory/${cat}`)
  console.log(res)
}

useEffect(()=>{
  getOneCat(selected)
  console.log(selected)
},[selected])

  return (
    <div className="container-fluid dash-wrap">
      <div className="d-flex title-logout">
        <h1>Dashboard</h1>
        <button className="logout">Salir</button>
      </div>
      <div className="row d-flex cat-add-holder">
        <div className="col-11">
          <div className="row cat-holder">
            <div className="col-2 cat-col ">
              <span id="menu" className="cat-item" onClick={e=>setSelected("menu")}>
                Menu completo
              </span>
            </div>
            {catego &&
              catego.map((item, i) => (
                <div key={i} className="col-2 cat-col">
                  <span
                    id={item.uid}
                    className="cat-item"
                    onClick={(e) => handleclick(e)}
                  >
                    {item.catego}
                  </span>
                </div>
              ))}
          </div>
        </div>

        <div className="col-1 d-flex actionsHolder ">
          <div className="dashboard-Actions ">
            <span className="middle">+</span>
            {/* </div>
        <div className="dashboard-Actions">
        <span>Crear Oferta</span>
        </div>
        <div className="dashboard-Actions">
        <span>Otra cosa</span> */}
          </div>
        </div>
      </div>

      <div className="row p-3 ">
        <div className="col-xl-5 col-lg-5 col-md-5 col-sm-5">Plato</div>
        <div className="col-xl-2 col-lg-2 col-md-2 col-sm-2">Categoria</div>

        <div className="col-xl-1 col-lg-1 col-md-1 col-sm-1">Precio</div>

        <div className="col-xl-1 col-lg-1 col-md-1 col-sm-1">Disponible</div>

        <div className="col-xl-1 col-lg-1 col-md-1 col-sm-1">Editar</div>

        <div className="col-xl-1 col-lg-1 col-md-1 col-sm-1">Eliminar</div>

        <div className="col-xl-1 col-lg-1 col-md-1 col-sm-1">Destacar</div>
      </div>

      {menu &&
        menu.map((item, i) => (
          <div key={i} className="row menu-item ">
            <div id={item.uid} className="col-xl-5 col-lg-5 col-md-5 col-sm-5">
              {item.plato}
            </div>
            <div id={item.uid} className="col-xl-2 col-lg-2 col-md-2 col-sm-2">
              {catego.map((cat) =>
                cat.uid === item.id_catego2 ? cat.catego : ""
              )}
            </div>
            <div id={item.uid} className="col-xl-1 col-lg-1 col-md-1 col-sm-1">
              {item.precio}
            </div>
            <div id={item.uid} className="col-xl-1 col-lg-1 col-md-1 col-sm-1">
              {item.disponible ? (
                <i className="dash-ico fa-regular fa-square-check"></i>
              ) : (
                <i className="dash-ico fa-regular fa-square"></i>
              )}
            </div>
            <div id={item.uid} className="col-xl-1 col-lg-1 col-md-1 col-sm-1">
              <i className="dash-ico fa-regular fa-pen-to-square"></i>
            </div>
            <div id={item.uid} className="col-xl-1 col-lg-1 col-md-1 col-sm-1">
              <i className="dash-ico fa-regular fa-trash-can"></i>
            </div>
            <div id={item.uid} className="col-xl-1 col-lg-1 col-md-1 col-sm-1">
              {item.destacado ? (
                <i className="dash-ico fa-regular fa-star"></i>
              ) : (
                ""
              )}
            </div>
          </div>
        ))}
      <div></div>
    </div>
  );
};

export default Dashboard;
