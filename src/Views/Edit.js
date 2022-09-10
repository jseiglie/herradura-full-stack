import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Edit = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [plato, setPlato] = useState();
  const [descripcion, setDescripcion] = useState();
  const [precio, setPrecio] = useState();
  const [vegano, setVegano] = useState(false);
  const [id_catego2, setId_catego2] = useState();
  const [disponible, setDisponible] = useState(true);
  const [destacar, setDestacar] = useState();
  const [categoryUid, setCategoryUid] = useState(id_catego2);

  const loader = async () => {
    if (id) {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_APIURL}/oneItem/${id}`
        );
        setData(res.data);
        
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    loader();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <h1>Añadir/Editar</h1>

      <div className="container">
        <form className="form-control" onSubmit={(e) => handleSubmit(e)}>
          <label htmlFor="plato">Plato</label>
          <input
            className="form-control"
            id="plato"
            type="text"
            placeholder={data.plato}
            name="plato"
            onChange={(e) => setPlato(e.target.value)}
          />
          <label htmlFor="descripcion">Descripcion</label>
          <input
            className="form-control"
            id="descripcion"
            type="text"
            placeholder={data.descripcion}
            name="descripcion"
            onChange={(e) => setDescripcion(e.target.value)}
          />
          <label htmlFor="precio">Precio</label>
          <input
            className="form-control"
            id="precio"
            type="number"
            placeholder={data.precio}
            name="precio"
            onChange={(e) => setPrecio(e.target.value)}
          />
          <label htmlFor="vegano">Vegano</label>
          ----options-----
          <label htmlFor="categoria">Categoria</label>
          <input
            className="form-control"
            id="categoria"
            type="text"
            placeholder={data.id_catego2}
            name="categoria"
            onChange={(e) => setId_catego2(e.target.value)}
          />
          <label htmlFor="disponible">Disponible</label>
          ----options-----
          <label htmlFor="destacar">Destacar</label>
          ----options-----
          <input className="form-control" type="submit" value={"enviar"} />
        </form>
      </div>
    </div>
  );
};

export default Edit;
