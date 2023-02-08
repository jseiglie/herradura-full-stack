import React from "react";
import { Link } from "react-router-dom";

const MenuBanner = () => {
  return (
    <section id="menu-banner" className="p-5">
      <div className="container ">
        <div className="row carta-pedido-holder bg-dark ">
          <div className="col-sm-12 col-md-6 col-lg-6">
            <div className="carta-holder">
              <div className="menu-carta w-100">
                <span className="menu-text">
                  <Link className="no-deco" to={"/menu"}>
                   La Carta
                  </Link>
                </span>
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-6">
            <div className="pedido-holder">
              <div className="menu-pedido w-100">
                <span className="menu-text">
                  {/* <Link className="no-deco" to={"/delivery"}> */}
                   <a className="btn no-deco" href="https://order.tryotter.com/s/la-herradura-vinoteca/p.%C2%BA-de-extremadura%2C-117-madrid/1aecf53d-0287-49a9-b358-b340441bb0f8">
                    Take away
                    </a> 
                  {/* </Link> */}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MenuBanner;
