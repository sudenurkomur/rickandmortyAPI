import React from "react";
import logo from "../assets/images/logo.png";  // Logo dosyasını doğru yoldan içe aktarın
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <img src={logo} alt="Logo" className="navbar-logo" />
    </nav>
  );
};

export default Navbar;
