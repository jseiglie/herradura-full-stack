import { Link } from "react-router-dom";
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
      <div className="row RGDP d-block ">
        <Link className="no-deco py-0 px-2" to={"/politica_de_privacidad"}>Politica de privacidad</Link>
        <Link className="no-deco py-0 px-2" to={"/aviso_legal"}>Aviso Legal</Link>
        <Link className="no-deco py-0 px-2" to={"/politica_de_cookies"}>Politica de cookies</Link>
        <Link className="no-deco py-0 px-2" to={"/terminos_y_condiciones"}>Terminos y condiciones</Link>
      </div>
    </div>
  );
};
export default FooterH;