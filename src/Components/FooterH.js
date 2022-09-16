const FooterH = () => {
  return (
    <div className="container-fluid bg-dark footer-holder" style={{ zIndex: 0 }}>    
      <img
        src="./img/herradura_logo.webp"
        alt="La Herradura Vinoteca Logo"
        className="mt-3"
        style={{ width: 50, height: "auto" }}
      />
      <p className="footer-text text-white ">
        La Herradura Vinoteca &#174;  
        </p>
    </div>
  );
};
export default FooterH;