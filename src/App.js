import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import FooterH from "./Components/FooterH";
import NavBar from "./Components/NavBar";
import "./Styles/App.css";
import Admin from "./Views/Admin";
import Checkout from "./Views/Checkout";
import Delivery from "./Views/Delivery";
import Home from "./Views/Home";
import Menu from "./Views/Menu";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/delivery" element={<Delivery />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
      <FooterH />
    </div>
  );
}

export default App;
