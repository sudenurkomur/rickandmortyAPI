import React from "react";
import "./Searchbar.css"; // Search bar stilini içeren CSS dosyası

const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <input
      type="text"
      className="search-bar"
      placeholder="Search..."
      value={searchTerm}
      onChange={onSearchChange}
    />
  );
};

export default SearchBar;
