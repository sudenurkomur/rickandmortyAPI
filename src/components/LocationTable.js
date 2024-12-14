import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Table.css";

const LocationTable = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    axios
      .get("https://rickandmortyapi.com/api/location")
      .then((response) => setLocations(response.data.results))
      .catch((error) => console.error("Location API Error:", error));
  }, []);

  return (
    <div>
      <h2>Locations</h2>
      <table border="1" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Dimension</th>
          </tr>
        </thead>
        <tbody>
          {locations.map((location) => (
            <tr key={location.id}>
              <td>{location.name}</td>
              <td>{location.type}</td>
              <td>{location.dimension}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LocationTable;
