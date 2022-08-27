import React from "react";

const FooterH = () => {
  return (
    <div className="container-fluid bg-dark p-3 mt-5 footer-holder" style={{ zIndex: 0 }}>
      
      <img
        src="./img/herradura_logo.webp"
        alt="La Herradura Vinoteca Logo"
        className=""
        style={{ width: 50, height: "auto" }}
      />
      <p className="text-white">
        La Herradura Vinoteca &#174;  
        </p>
    </div>
  );
};

export default FooterH;
