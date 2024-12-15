import React from "react";
import { Link } from "react-router-dom"; 
import logo from "../assets/images/logo.png";  
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <img src={logo} alt="Logo" className="navbar-logo" />
      <ul className="navbar-menu">
        <li className="navbar-menu-item">
          <Link to="/mainpage" className="navbar-link">Main Page</Link>
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
        <li className="navbar-menu-item">
          <Link to="/locations" className="navbar-link"></Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
