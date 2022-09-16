import React from "react";

const Menu = () => {
  return (
    <>
      <div className="container-fluid">
        <h1 className="mt-5 mb-5">A la Carta</h1>
        <div className="row d-flex mt-2 menu-download-wrapp ">
        <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 menu-download-link download-desayuno d-flex">
            <a
              className="download-item-box "
              href={require("../menu/desayunos.pdf")}
            >
              <span className="download-item">Desayunos y bocadillos</span>
            </a>
          </div>
          <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 menu-download-link download-menu d-flex">
            <a
              className="download-item-box  "
              href={require("../menu/carta.pdf")}
            >
              <span className="download-item">Menu</span>
            </a>
          </div>
          <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 menu-download-link download-vinos d-flex">
            <a
              className="download-item-box "
              href={require("../menu/bocadillos.pdf")}
            >
              <span className="download-item">Vinos</span>
            </a>
          </div>
          <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 menu-download-link download-cerveza d-flex">
            <a
              className="download-item-box "
              href={require("../menu/cervezas.pdf")}
            >
              <span className="download-item">Cervezas</span>
            </a>
          </div>
        
        </div>
      </div>

      {/* <GeneralLoad url={"destacadosall"} receiveData={receiveData} /> */}
      {/* <GeneralLoad url={"menu"} /> */}
    </>
  );
};

export default Menu;
