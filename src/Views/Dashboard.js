import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {

const navigate = useNavigate()

useEffect(()=>{
    if (!localStorage.getItem("token")) {
        alert("no tiene permiso para estar aqui");
        navigate("/")
    }
},[])

  return <div>Dashboard</div>;
};

export default Dashboard;
