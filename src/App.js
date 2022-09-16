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
import CondicionesUso from "./Views/CondicionesUso";
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
          <Route path="/protecciondatos" element={<Privacy />} />
          <Route path="/politica_de_cookies" element={<CookiesPolicy />} />
          <Route path="/aviso_legal" element={<LegalNotice />} />
          <Route path="/politica_de_privacidad" element={<DataProtection />} />
          <Route path="/condiciones_de_uso" element={<CondicionesUso />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </BrowserRouter>
      <FooterH />
    </div>
  );
}

export default App;
