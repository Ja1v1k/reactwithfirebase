import { Routes, Route } from "react-router-dom";

//components
import NavbarComp from "./components/Navbar";

//css
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';

//pages
import RegisterPage from "./pages/Register";
import LoginPage from "./pages/Login";
import ListingPage from "./pages/List";

function App() {
  return (
    <>
      <NavbarComp/>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/book/list" element={<ListingPage />} />
      </Routes>
    </>
  );
}

export default App;
