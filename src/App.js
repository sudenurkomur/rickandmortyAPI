import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // React Router bileşenlerini ekliyoruz
import Navbar from "./components/Navbar";
import Dropdown from "./components/Dropdown";
import Footer from "./components/Footer";
import './App.css';
import SearchBar from "./components/Searchbar";
import CharacterTable from "./components/CharacterTable"; // Karakter tablosunu ekliyoruz
import InformationTable from "./components/InformationTable";
import LocationTable from "./components/LocationTable";
import EpisodeTable from "./components/EpisodeTable";

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <div className="dropdown-container">
          {/*<Dropdown />
          <SearchBar />*/}
        </div>

        {/* React Router Routes */}
        <Routes>
          <Route path="/" element={<InformationTable />} />
          <Route path="/episodes" element={<EpisodeTable />} />
          <Route path="/characters" element={<CharacterTable />} />
          <Route path="/locations" element={<LocationTable />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
