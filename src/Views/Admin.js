import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Register from "../Components/Register";
const Admin = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  //authSTate
  const navigate = useNavigate("");
  const handleSubmit = async () => {
    if (!email || !password)
      alert("Asegúrese de haber introducido correo electrónico y contraseña");
    const payload = { email: email, password: password };
    await axios
      .post(`${process.env.REACT_APP_APIURL}/admin`, payload)
      .then((res) => {
        if (res.data.error) {
          alert("usuario y contraseña erroneos");
        } else {
          localStorage.setItem("token", res.data.token);
          navigate("/dashboard");
        }
        console.log(res);
      });
  };
  return (
    <div className="container w-50">
      <div className="card">
        <label htmlFor="username">Usuario</label>
        <input
          id="username"
          className="from-control"
          type="text"
          name="usename"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="password">Contraseña</label>
        <input
          className="from-control"
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" onClick={handleSubmit}>
          {" "}
          Log in
        </button>
      </div>
      register
      <Register />
    </div>
  );
};
export default Admin;