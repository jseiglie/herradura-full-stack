import axios from "axios";
import { useEffect, useState } from "react";

const SupPizza = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    loader();
  }, []);

  const loader = async () => {
    const resp = await axios.get(`${process.env.REACT_APP_APIURL}/suppizza`);
    setData(resp.data);
  };

  return (
    <div className="container">
      <div className="row">
        {data
          ? data.map((item) => (
              <div
                key={item.uid}
                className="col-xl-2 col-lg-3 col-md-4 col-sm-12 card-group mb-3"
              >
                <div className="card card-wrap scale">
                  <div className="card-body pb-0">
                    <div className="row">
                      <div className=" card-text-wrapper mb-4">
                        <h5 className="line-clamp plato">
                          {item.ingredient.lenght >= 15 ? (
                            <>{item.plato}</>
                          ) : (
                            <>
                              {item.ingredient} <br />
                            </>
                          )}
                        </h5>
                        <div className="row footer-wrapper">
                          <div className="col-6 footer-price">
                            {item.price}€
                          </div>
                          <div className="col-6">
                            <span>
                              <i
                                id={item.uid}
                                className="fa-solid fa-cart-arrow-down fa-xl footer-cart-ico rotate"
                                //   onClick={(e) => handleItems(item)}
                              ></i>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          : ""}
      </div>
    </div>
  );
};

export default SupPizza;
