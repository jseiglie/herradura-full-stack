import React, { useState } from "react";
import PropTypes from "prop-types";

const DeliveryNav = (props) => {
  const [items] = useState([props.items]);
  const [catego, setCatego] = useState();

  const selected = (e) => {
    setCatego(e.target.id);
    props.selected(catego);
  };
  return (
    <>
      <nav
        className="offcanvas offcanvas-start offcanvas-delivery"
        tabIndex="-1"
        id="offcanvas"
        data-bs-keyboard="false"
        data-bs-backdrop="true"
        data-bs-scroll="true"
      >
        <div className="offcanvas-header">
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body px-0">
          <ul className="navbar-nav">
            {items[0].map((item) => (
              <li
                key={item.uid}
                id={item.uid}
                onClick={(e) => selected(e)}
                className="nav-item delivery-nav-item"
              >
                {item.catego}
              </li>
            ))}
          </ul>
        </div>
      </nav>
      <button
        id="sidebarCollapse"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvas"
        role="button"
        aria-label="Toggle menu"
        className="gx-0 p-0 mx-0"
      >
        Menu
      </button>
    </>
  );
};

DeliveryNav.propTypes = {};

export default DeliveryNav;
