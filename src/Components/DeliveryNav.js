import React, { useEffect, useState } from "react";
import axios from "axios";
const DeliveryNav = (props) => {
  const [categories, setCategories] = useState([]);
  const [catego, setCatego] = useState();
  const selected = (e) => {
    setCatego(e.target.id);
  };
  const loader = async () => {
    const resp = await axios.get(`${process.env.REACT_APP_APIURL}/categories`);
    setCategories(resp.data);
  };
  useEffect(() => {
    loader();
  }, []);
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
            {categories &&
              categories.map((item) => (
                <li
                  key={item.uid}
                  id={item.uid}
                  onClick={(e) => selected(e)}
                  data-bs-dismiss="offcanvas"
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
export default DeliveryNav;