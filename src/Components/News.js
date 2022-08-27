import React from "react";

const News = () => {
  return (
    <section id="news">
      <div className="container-fluid  news-holder mt-5 p-5 ">
        <div className="row">
          <div className="col-lg-2 col-md-4 col-sm-12 card-news-holder">
            <div className="card news-card">
              <div className="card-body news-body">
                <div className="container recuadro">
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
                  />
                  Lorem Ipsum dolor sit amet
                  <br />
                  consectetur adipiscing elit, sed do eiusmod tempor <br />
                  --4.95€-- <br />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default News;
