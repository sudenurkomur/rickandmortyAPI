import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Table.css";

const LocationTable = () => {
  const [locations, setLocations] = useState([]);
  const [residentNames, setResidentNames] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    axios
      .get("https://rickandmortyapi.com/api/location")
      .then((response) => setLocations(response.data.results))
      .catch((error) => console.error("Location API Error:", error));
  }, []);

  useEffect(() => {
    // Tüm lokasyonların sakinlerini al
    const fetchResidents = async () => {
      const residentData = {};
      for (const location of locations) {
        if (location.residents.length > 0) {
          try {
            // Tüm sakinler için API isteklerini Promise.all ile yapıyoruz
            const residentResponses = await Promise.all(
              location.residents.map((url) => axios.get(url))
            );
            residentData[location.id] = residentResponses.map(
              (response) => response.data.name
            );
          } catch (error) {
            console.error("Error fetching resident names:", error);
          }
        } else {
          residentData[location.id] = [""];
        }
      }
      setResidentNames(residentData);
    };

    if (locations.length > 0) {
      fetchResidents();
    }
  }, [locations]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentLocations = locations.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(locations.length / itemsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="table-container">
      <h2>Locations</h2>
      <table className="character-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Dimension</th>
            <th>Residents</th>
          </tr>
        </thead>
        <tbody>
          {currentLocations.map((location) => (
            <tr key={location.id}>
              <td>{location.name}</td>
              <td>{location.type}</td>
              <td>{location.dimension}</td>
              <td>
                {residentNames[location.id] ? (
                  residentNames[location.id].map((name, index) => (
                    <span key={index}>
                      {name}
                      {index < residentNames[location.id].length - 1 && ", "}
                    </span>
                  ))
                ) : (
                  "Loading..."
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button onClick={handlePrev} disabled={currentPage === 1}>
          Prev
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={handleNext} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default LocationTable;
