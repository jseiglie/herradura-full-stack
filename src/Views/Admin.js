import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";// eslint-disable-next-line
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
      });
  };
  return (
    <div className="admin-view">
      <div className="container w-75">
        <div className="row admin-container">
        <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 "></div>
          
          <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4 ">
            <img
              className="img-fluid admin-logo"
              src="./img/herradura_logo.webp"
              alt="Herradura logo"
            />
          </div>
          <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4 admin-form-wrapper">
            <div className="admin-form">
              <label className="p-2" htmlFor="username">
                Usuario
              </label>
              <br/>
              <input
                id="username"
                className="from-control"
                type="text"
                name="usename"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <br/>
              <label className="p-2" htmlFor="password">
                Contraseña
              </label>
              <br/>
              <input
                className="from-control"
                type="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <br/>
              <button className="m-3 btn" type="submit" onClick={handleSubmit}>
                Log in
              </button>
            </div>
          </div>
          <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 "></div>
        </div>
        {/* register
      <Register /> */}
      </div>
    </div>
  );
};
export default Admin;
