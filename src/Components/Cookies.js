import React from "react";
import CookieConsent from "react-cookie-consent";

const CookiesH = () => {
  return (
    <CookieConsent
      location="bottom"
      buttonText="Acepto"
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
      Esta página utiliza cookies 🍪 propias y de terceros para ofrecer una
      mejor experiencia de usuario.
    </CookieConsent>
  );
};

export default CookiesH;
