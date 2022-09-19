import React from "react";
import CookieConsent from "react-cookie-consent";
import { Link } from "react-router-dom";
const CookiesH = () => {
  return (
    <CookieConsent
      location="bottom"
      buttonText="Aceptar"
      cookieName="CookieConsent"
      style={{ background: "#2B373B", zIndex: 100 }}
      buttonStyle={{
        backgroundColor: "#212529",
        color: "#f7f7f7",
        fontSize: "13px",
        borderRadius: "0.25rem"
      }}
      expires={150}
    >
      <div className="w-50 cookie-text-holder">

      Esta página utiliza cookies 🍪 propias y de terceros para ofrecer una
      mejor experiencia de usuario. Puede visitar nuestra <Link className="no-deco" to="politica_de_cookies">Politica de cookies</Link> para conocer qué son las cookies y cómo las utilizamos.
      </div>
    </CookieConsent>
  );
};
export default CookiesH;