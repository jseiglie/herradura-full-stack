import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import FooterH from "./Components/FooterH";
import NavBar from "./Components/NavBar";
import "./Styles/App.css";
import Admin from "./Views/Admin";
import Checkout from "./Views/Checkout";
import Home from "./Views/Home";

function App() {
  return (
    <div className="App">
      <NavBar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
      <FooterH />
    </div>
  );
}

export default App;
