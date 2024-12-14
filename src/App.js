import React from "react";
import Navbar from "./components/Navbar";
import Dropdown from "./components/Dropdown";
import Footer from "./components/Footer"; // Footer'ı ekledik
import './App.css';
import SearchBar from "./components/Searchbar";

const App = () => {
  return (
    <div>
      <Navbar />
      <div className="dropdown-container">
        <Dropdown />
        <SearchBar />
      </div>
      <Footer />
    </div>
  );
};

export default App;
