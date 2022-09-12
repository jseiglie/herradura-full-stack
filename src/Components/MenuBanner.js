import React from "react";
import { Link } from "react-router-dom";

const MenuBanner = () => {
  return (
    <section id="menu-banner" className="p-5">
      <div className="container">
        <div className="row carta-pedido-holder bg-dark">
          <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4">
            <div className="carta-holder">
              <div className="menu-carta w-100">
                <span className="menu-text">
                  <Link className="no-deco" to={"/menu"}>
                    A la Carta
                  </Link>
                </span>
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4">
            <div className="pedido-holder">
              <div className="menu-pedido w-100">
                <span className="menu-text">
                  {/* <Link className="no-deco" to={"/delivery"}> */}
                   <button className="btn no-deco" onClick={e=>alert("proximamente")}>
                    A Recoger
                    </button> 
                  {/* </Link> */}
                </span>
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4">
            <div className="pedido-holder">
              <div className="menu-takeaway w-100">
                <span className="menu-text">
                  {/* <Link className="no-deco" to={"/delivery"}> */}
                  <button className="btn no-deco" onClick={e=>alert("proximamente")}>
                    A la Casa
                    </button>
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
