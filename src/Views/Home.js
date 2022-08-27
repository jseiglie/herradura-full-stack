import React from "react";
import About from "../Components/About";
import CookiesH from "../Components/Cookies";
import MenuBanner from "../Components/MenuBanner";
import News from "../Components/News";

const Home = () => {
  return (
    <>
      <section id="home">
        <div className="container-fluid d-flex gx-0">
          <div className="header d-flex">
            <h1 className="main-title">La Herradura Vinoteca</h1> <br />
            <h3 className="main-title sub-title">
              El bar de siempre, un poco diferente
            </h3>
          </div>
        </div>
      </section>

    <MenuBanner />

   <News/>

<About/>
    
      <CookiesH />
    </>
  );
};

export default Home;
