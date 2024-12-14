import React, { useState } from "react";
import "./Dropdown.css"; // dropdown.css dosyasını import ettik

const Dropdown = () => {
  const [selectedFilter, setSelectedFilter] = useState("");

  const handleChange = (event) => {
    setSelectedFilter(event.target.value);
    // Seçim değiştiğinde yapılacak işlemler
  };

  return (
    <div className="dropdown">
      <select
        className="form-select"
        aria-label="Filter"
        value={selectedFilter}
        onChange={handleChange}
      >
        <option value="" disabled>
          Filter
        </option>
        <option value="filter">Filter</option>
        <option value="characters">Show Characters</option>
        <option value="locations">Show Locations</option>
        <option value="episodes">Show Episodes</option>
      </select>
    </div>
  );
};

export default Dropdown;
