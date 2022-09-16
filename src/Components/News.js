import axios from "axios";
import React, { useEffect, useState } from "react";

const News = () => {
  const [data, setData] = useState([]);
  const url = process.env.REACT_APP_APIURL;
  const getData = async () => {
    const resp = await axios.get(`${url}/destacados`);
    setData(resp.data);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <section id="news">
      <div className="container-fluid  news-holder mt-5 p-5 ">
        <div className="row">
          {data.map((item) => (
            <div key={item.uid} className="col-lg-2 col-md-6 col-sm-12 card-news-holder" >           
              <div className="card news-card">
                <div className="card-body news-body" >
                  <div className="container recuadro" id={item.uid}>
                    <span className="dienesis-L">~</span>
                    <img
                      src="./img/herradura_logo.webp"
                      alt="La Herradura Vinoteca Logo"
                      className="news-logo"
                    />
                    <span className="dienesis-R">~</span>
                    <img
                      src=""
                      alt="Platos nuevos"
                      className="img-fluid news-img"
                    /><p  className="mt-4" style={{backgroundColor: "#00000010"}}>
                    {item.plato}
                    </p>                
                    <p className="line-clamp" >
                      {item.descripcion}
                      </p>
                    <br />
                    <p className="footer-wrapper">
                    --{item.precio}€-- <br />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default News;