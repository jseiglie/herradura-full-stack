import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import FooterH from "./Components/FooterH";
import NavBar from "./Components/NavBar";

import "./Styles/App.css";
import Admin from "./Views/Admin";
import Checkout from "./Views/Checkout";
import Dashboard from "./Views/Dashboard";
import Delivery from "./Views/Delivery";
import Edit from "./Views/Edit";
import Home from "./Views/Home";
import Menu from "./Views/Menu";
import DataProtection from "./Views/DataProtection";
import TermAndConditions from "./Views/TermAndConditions";
import CookiesPolicy from "./Views/CookiesPolicy";
import LegalNotice from "./Views/LegalNotice";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route
            path="/delivery"
            element={
              <h1
                style={{
                  height: "80vh",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Proximamente...
              </h1>
            }
          />
          <Route path="/pickup" element={<Delivery />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/add" element={<Edit />} />
          <Route path="/politica_de_cookies" element={<CookiesPolicy />} />
          <Route path="/aviso_legal" element={<LegalNotice />} />
          <Route path="/politica_de_privacidad" element={<DataProtection />} />
          <Route path="/terminos_y_condiciones" element={<TermAndConditions />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      <FooterH />
      </BrowserRouter>
    </div>
  );
}

export default App;
