import React from "react";
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
    <div className="app-container">
      <Navbar />
      <div className="dropdown-container">
        <Dropdown />
        <SearchBar />        
      </div>
      {/*InformationTable/> */}
      {/*<EpisodeTable />*/}
      {/*<CharacterTable />*/}
      <LocationTable/>
      <Footer />
    </div>
  );
};

export default App;
