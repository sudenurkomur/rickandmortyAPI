import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import './App.css';
import CharacterTable from "./components/CharacterTable"; 
import InformationTable from "./components/InformationTable";
import LocationTable from "./components/LocationTable";
import EpisodeTable from "./components/EpisodeTable";

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <Routes>
          <Route path="/mainpage" element={<InformationTable />} />
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
