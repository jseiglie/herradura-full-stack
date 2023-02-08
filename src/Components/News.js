
import React from "react";

const News = () => {
 

  const data = [
    {
        "uid": "0495d314-2482-11ed-a49a-50ebf6c32832",
        "plato": "Taco Mexicano de Cerdo (Ración)",
        "descripcion": "4 Tacos Mexicano de Cerdo",
        "precio": 9.95,
        "vegano": false,
        "disponible": true,
        "destacado": true,
        "createdAt": "2022-08-25T14:25:32.000Z",
        "updatedAt": "2022-08-25T14:25:32.000Z",
        "id_catego1": null,
        "id_catego2": "b3b4dc7e-247f-11ed-a49a-50ebf6c32832",
        "CategoryUid": "b3b4dc7e-247f-11ed-a49a-50ebf6c32832"
    },
    {
        "uid": "16036fce-2481-11ed-a49a-50ebf6c32832",
        "plato": "Empanadillas Colombianas de Cerdo (Ración)",
        "descripcion": "8 Empanadillas Colombianas de Cerdo",
        "precio": 9.95,
        "vegano": false,
        "disponible": true,
        "destacado": true,
        "createdAt": "2022-08-25T14:19:41.000Z",
        "updatedAt": "2022-08-25T14:19:41.000Z",
        "id_catego1": null,
        "id_catego2": "b3b4dc7e-247f-11ed-a49a-50ebf6c32832",
        "CategoryUid": "b3b4dc7e-247f-11ed-a49a-50ebf6c32832"
    },
    {
        "uid": "253bc98b-2482-11ed-a49a-50ebf6c32832",
        "plato": "Taco Mexicano de Ternera (Ración)",
        "descripcion": "4 Tacos Mexicano de Ternera",
        "precio": 9.95,
        "vegano": false,
        "disponible": true,
        "destacado": true,
        "createdAt": "2022-08-25T14:27:23.000Z",
        "updatedAt": "2022-08-25T14:27:23.000Z",
        "id_catego1": null,
        "id_catego2": "b3b4dc7e-247f-11ed-a49a-50ebf6c32832",
        "CategoryUid": "b3b4dc7e-247f-11ed-a49a-50ebf6c32832"
    },
    {
        "uid": "253bd48d-2482-11ed-a49a-50ebf6c32832",
        "plato": "Taco Mexicano de Pollo (Ración)",
        "descripcion": "4 Tacos Mexicano de Cerdo",
        "precio": 9.95,
        "vegano": false,
        "disponible": true,
        "destacado": true,
        "createdAt": "2022-08-25T14:27:23.000Z",
        "updatedAt": "2022-08-25T14:27:23.000Z",
        "id_catego1": null,
        "id_catego2": "b3b4dc7e-247f-11ed-a49a-50ebf6c32832",
        "CategoryUid": "b3b4dc7e-247f-11ed-a49a-50ebf6c32832"
    }
]



  return (
    <section id="news">
      <div className="container-fluid  news-holder mt-5 p-5 ">
        <div className="row">
          {data.map((item) => (
            <div key={item.uid} className="col-lg-2 col-md-6 col-sm-12 card-news-holder" >
            
              <div className="card news-card">
                <div className="card-body news-body" >
                  <div className="container recuadro" value={item.uid}>
                    <span className="dienesis-L">~</span>
                    <img
                      src="./img/herradura_logo.webp"
                      alt="La Herradura Vinoteca Logo"
                      className="news-logo"
                    />
                    <span className="dienesis-R">~</span>
                   <div  className="mt-4" style={{backgroundColor: "#00000010"}}>

                    {item.plato}
                    </div>
                    
                    <div className="line-clamp" >
                      {item.descripcion}
                      </div>
                    <br />
                    <div className="footer-wrapper">

                    --{item.precio}€-- <br />
                    </div>
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
