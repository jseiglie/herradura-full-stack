import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Edit = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [plato, setPlato] = useState(data.plato);
  const [descripcion, setDescripcion] = useState(data.descripcion);
  const [precio, setPrecio] = useState(data.precio);
  const [vegano, setVegano] = useState(false);
  const [id_catego2, setId_catego2] = useState(data.id_catego2);
  const [disponible, setDisponible] = useState(true);
  const [destacar, setDestacar] = useState(data.destacar);
  const [categoryUid, setCategoryUid] = useState(id_catego2);
  const [catego, setCatego] = useState(data.catego);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const loader = async () => {
    if (id) {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_APIURL}/oneItem/${id}`
        );
        setData(res.data);
        setCatego(res.data.id_catego2);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const loadCat = async () => {
    const resp = await axios.get(`${process.env.REACT_APP_APIURL}/categories`);
    setCategories(resp.data);
  };

  useEffect(() => {
    loader();
    loadCat();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const title = () => {
    let result = categories.filter((item) => item.uid === catego);
    return result[0].catego;
  };

  return (
    <div>
      <h1 className="mt-4">Añadir/Editar</h1>

      <div className="container d-flex">
        <form
          className="form-control mt-4 mb-5 p-3"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="row">
            <div className="col-xl-6 col-lg-6  col-md-6 col-sm-12 col-xs-12 ">
              <label htmlFor="plato">Plato</label>
              <input
                className="form-control"
                id="plato"
                type="text"
                defaultValue={data.plato}
                name="plato"
                onChange={(e) => setPlato(e.target.value)}
              />
              <label htmlFor="descripcion">Descripcion</label>
              <input
                className="form-control"
                id="descripcion"
                type="text"
                defaultValue={data.descripcion}
                name="descripcion"
                onChange={(e) => setDescripcion(e.target.value)}
              />
              <label htmlFor="precio">Precio</label>
              <input
                className="form-control"
                id="precio"
                type="number"
                defaultValue={data.precio}
                name="precio"
                onChange={(e) => setPrecio(e.target.value)}
              />
              <label htmlFor="categoria">Categoria</label>
              <select
                className="form-control"
                id="categoria"
                name="categoria"
                onChange={(e) => setCatego(e.target.value)}
              >
                {categories.map((item) => (
                  <option value={item.uid}>{item.catego}</option>
                ))}
              </select>
            </div>
            <div className="col">
              <label htmlFor="vegano">Vegano</label>
              <select className="form-control" id="vegano" name="vegano">
                <option value={true}>Si</option>
                <option value={false} selected>
                  No
                </option>
              </select>
              <br />
              <label htmlFor="disponible">Disponible</label>
              <select
                className="form-control"
                id="disponible"
                name="disponible"
              >
                <option value={true} selected>
                  Si
                </option>
                <option value={false}>No</option>
              </select>
              <br />
              <label htmlFor="destacar">Destacar</label>
              <select className="form-control" id="destacar" name="destacar">
                <option value={true}>Si</option>
                <option value={false} selected>
                  No
                </option>
              </select>
            </div>
          </div>
          <input
            className="form-control mt-3 w-50 mx-auto mt-5 btn btn-success add-edit-btn"
            type="submit"
            value={"Enviar"}
          />
          <button
            className="form-control mt-3 w-50 mx-auto mt-5 btn btn-danger add-edit-btn"
            onClick={(e) => navigate("/dashboard")}
          >
            Cancelar
          </button>
          <p className="text-muted form-text-advice ">
            *todos los datos son obligatorios
          </p>
        </form>
      </div>
    </div>
  );
};

export default Edit;