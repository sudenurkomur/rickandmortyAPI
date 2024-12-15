import React from "react";
import { Link } from "react-router-dom"; // Link import edilmelidir
import logo from "../assets/images/logo.png";  // Logo dosyasını doğru yoldan içe aktarın
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <img src={logo} alt="Logo" className="navbar-logo" />
      <ul className="navbar-menu">
        <li className="navbar-menu-item">
          <Link to="/" className="navbar-link">Main Page</Link>
        </li>
        <li className="navbar-menu-item">
          <Link to="/episodes" className="navbar-link">Episodes</Link>
        </li>
        <li className="navbar-menu-item">
          <Link to="/characters" className="navbar-link">Characters</Link>
        </li>
        <li className="navbar-menu-item">
          <Link to="/locations" className="navbar-link">Locations</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
