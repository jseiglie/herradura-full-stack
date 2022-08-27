import React from "react";

const MenuBanner = () => {
  return (
    <section id="menu-banner" className="p-5">
      <div className="container">
        <div className="row carta-pedido-holder">
          <div className="col-sm-12 col-md-6 col-lg-6 ">
            <div className="carta-holder">
              <div className="menu-carta">
                <span className="menu-text">Nuestra Carta</span>
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-6">
            <div className="pedido-holder">
              <div className="menu-pedido">
                <span className="menu-text">Pedido en linea</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MenuBanner;
