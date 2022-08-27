import React from "react";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark navbar-holder">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
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
              <a className="nav-link active" aria-current="page" href="#home">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Menu
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link">Ordenar</a>
            </li>
            <li className="nav-item">
            <a className="nav-link" href="#about">Acerca de</a>

              
           
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
