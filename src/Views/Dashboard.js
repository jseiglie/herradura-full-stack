import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [menu, setMenu] = useState([]);
  const [catego, setCatego] = useState([]);
  const [byCatego, setByCatego] = useState("menu");
  const [selected, setSelected] = useState(byCatego);
  const [precio, setPrecio] = useState();
  const [itemCatego, setItemCatego] = useState();
  const [plato, setPlato] = useState();
  const [destacar, setDestacar] = useState();
  const [refresh, setRefresh] = useState(false);
  const [disponible, setDisponible] = useState()


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

  const getOneCat = async (cat) => {
    if (selected === "menu") {
      getMenu();
    } else {
      const res = await axios.get(
        `${process.env.REACT_APP_APIURL}/bycategory/${cat}`
      );
      setMenu(res.data);
    }
  };

  useEffect(() => {
    getOneCat(selected);
  }, [selected, refresh]);

  const handleDelete = async (e) => {
    await axios.delete(
      `${process.env.REACT_APP_APIURL}/delMenu/${e.target.id}`
    );
  };

  const handleDestacar = async (e, value) => {
    setDestacar(value);
    let payload;
    value ? (payload = { destacada: false }) : (payload = { destacada: true });
    try {
      await axios
        .put(`${process.env.REACT_APP_APIURL}/destacar/${e}`, payload)
      setRefresh(refresh ? false : true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDisponible = async (e, value) => {
    setDisponible(value);
    let payload;
    value ? (payload = { disponible: false }) : (payload = { disponible: true });
    try {
      await axios
        .put(`${process.env.REACT_APP_APIURL}/menuDisponible/${e}`, payload)
      setRefresh(refresh ? false : true);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePrecio = async (e) => {
    if (e.key === "Enter") {
      const values = {
        id: e.target.id,
        precio: precio,
      };
      await axios.put(
        `${process.env.REACT_APP_APIURL}/modPrecio/${e.target.id}`,
        values
      );
    }
  };

  const handleEdit = async (e) => {
    navigate(`/edit/${e.target.id}`);
  };
  return (
    <div className="container-fluid dash-wrap">
      <div className="d-flex title-logout w-50 ">
        <h1>Dashboard</h1>
        <button className="logout">Salir</button>
      </div>
      <div className="row d-flex cat-add-holder">
        <div className="col-11">
          <div className="row cat-holder">
            <div className="col-2 cat-col ">
              <span
                id="menu"
                className="cat-item"
                onClick={(e) => setSelected("menu")}
              >
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
            <span className="middle" onClick={e=>navigate("/add")}>+</span>
            {/* </div>
        <div className="dashboard-Actions">
        <span>Crear Oferta</span>
        </div>
        <div className="dashboard-Actions">
        <span>Otra cosa</span> */}
          </div>
        </div>
      </div>

      <div className="row p-3 table-head">
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
            <div
              id={item.uid}
              className="col-xl-5 col-lg-5 col-md-5 col-sm-5"
            >
              {item.plato}
            </div>
            <div
              id={item.uid}
              className="col-xl-2 col-lg-2 col-md-2 col-sm-2"
            >
              {catego.map((cat) =>
                cat.uid === item.id_catego2 ? cat.catego : ""
              )} 
            </div>
            <input
              id={item.uid}
              type="number"
              onChange={(e) => setPrecio(parseFloat(e.target.value))}
              placeholder={item.precio}
              onKeyDown={(e) => handlePrecio(e)}
              className="col-xl-1 col-lg-1 col-md-1 col-sm-1"
              name="precio"
            />

            <div className="col-xl-1 col-lg-1 col-md-1 col-sm-1">
              {item.disponible ? (
                <i
                  id={item.uid}
                  onClick={(e) => handleDisponible(item.uid, item.disponible)}
                  className="dash-ico fa-regular fa-square-check"
                ></i>
              ) : (
                <i
                  id={item.uid}
                  onClick={(e) => handleDisponible(item.uid, item.disponible)}
                  className="dash-ico fa-regular fa-square"
                ></i>
              )}
            </div>
            <div className="col-xl-1 col-lg-1 col-md-1 col-sm-1">
              <i
                id={item.uid}
                onClick={(e) => handleEdit(e)}
                className="dash-ico fa-regular fa-pen-to-square"
              ></i>
            </div>
            <div className="col-xl-1 col-lg-1 col-md-1 col-sm-1">
              <i
                id={item.uid}
                className="dash-ico fa-regular fa-trash-can"
                onClick={(e) => handleDelete(e)}
              ></i>
            </div>
            <div
              id={item.uid}
              onClick={(e) => handleDestacar(item.uid, item.destacado)}
              className="col-xl-1 col-lg-1 col-md-1 col-sm-1"
            >
              {item.destacado ? (
                <i className="dash-ico fa-regular fa-star"></i>
              ) : (
                <span>dest</span>
              )}
            </div>
          </div>
        ))}
      <div></div>
    </div>
  );
};

export default Dashboard;
