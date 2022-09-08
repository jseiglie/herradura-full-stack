import axios from "axios";
import React, { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom"

const Register = () => {
  
  const [password, setPassword] = useState();
  const [email, setEmail] = useState()

const navigate = useNavigate("")

  const handleSubmit =  async () => {
    const payload = {email: email, password: password}

    const res = await axios.post(`${process.env.REACT_APP_APIURL}/register`, payload).then((res)=>{
      if (res.data.error){
        alert("usuario y contraseña erroneos")
      }else {
        localStorage.setItem("token", res.data)
        console.log(res)
    }
    }) 

    console.log(payload)
  };

  return (
    <div className="container w-50">
      <div className="card">
        <label htmlFor="email">Correo electrónico</label>
        <input
          id="email"
          className="from-control"
          type="text"
          name="email"
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
        <button type="submit"  onClick={handleSubmit}> Log in</button>
      </div>
    </div>
  );
};

export default Register;