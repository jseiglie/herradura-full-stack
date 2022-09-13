import React from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark navbar-holder sticky-top">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <img
            src="./img/herradura_logo.webp"
            alt="La Herradura Vinoteca Logo"
            className=""
            style={{ width: 50, height: "auto" }}
          />
          <span className="p-2">La Herradura</span>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="navbar-nav me-auto mb-2 mb-md-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to={"/"}>
                <HashLink className="nav-link" to={"/#home"}>
                  <span className="nav-span">Home</span>
                </HashLink>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={"/menu"}>
                <HashLink className="nav-link" to={"/menu"}>
                  <span className="nav-span">La Carta</span>
                </HashLink>
              </Link>
            </li>
            <li className="nav-item">
              {/* <Link className="nav-link" to={"/delivery"}>
                <HashLink className="nav-link" to={"/delivery"}> */}
              <div className="nav-link">
                <div className="nav-link">
                  <span className="nav-span"  onClick={e=>alert("proximamente")}>Para Casa</span>
                </div>
              </div>
              {/* </HashLink>
              </Link> */}
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={"/menu"}>
                <HashLink className="nav-link" to={"/#about"}>
                  <span className="nav-span">A Nosotros</span>
                </HashLink>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
