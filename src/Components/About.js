import React from "react";

const About = () => {
  return (
    <section id="about" className="p-5">
      <div className="container about_wrapper">
        <div className="row text-center">
          <h2 className="section_Title">Acerca de:</h2>

          <div className="col-lg-4 col-md-12 col-sm1-2 about_Text">
            <p>
              Un magnifico rincón de encuentro para todas las personas que
              diariamente comparten un ratito de ocio, buen ambiente y amistad
              en La Herradura.
            </p>
            <div className="about_Info">
              <i className="fa-solid fa-location-dot"></i> Paseo de Extremadura
              117, 28011. Madrid, España.
            </div>
            <div className="about_Info">
              <i className="fa-solid fa-train-subway"></i> Alto de Extremadura
            </div>
            <div className="about_Info">
              <i className="fa-solid fa-bus-simple"></i> 31, 33, 36, 39, 65, 500
            </div>
            <div className="about_Info">
              <a className="about_Tel" href="tel:+34919303528">
                <i className="fa-solid fa-phone"></i> 919 303528
              </a>
            </div>
          </div>
          <div className="col-lg-8 col-md-12 col-sm1-2">
            <iframe
              className="about_Map"
              loading="lazy"
              allowFullScreen
              src="https://www.google.com/maps/embed/v1/place?q=Paseo%20de%20Extremadura%20117%2C%20Madrid%2C%20Espa%C3%B1a&key=AIzaSyDkeXnu-dRlLYlej8q_5ITFv8Ywb1q5ctA"
            ></iframe>
          </div>
          <div className="col-lg-6 col-md-6 col-sm1-2"></div>
        </div>
      </div>
    </section>
  );
};

export default About;
