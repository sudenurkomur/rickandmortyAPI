import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Table.css";

const LocationTable = () => {
  const [locations, setLocations] = useState([]);
  const [residentNames, setResidentNames] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("normal"); // Filter to be applied (normal or planet-based)
  const [searchQuery, setSearchQuery] = useState(""); // State for the search query

  useEffect(() => {
    const fetchLocations = async () => {
      let allLocations = [];
      let page = 1;
      let totalLocations = 0;

      try {
        while (true) {
          const response = await axios.get(`https://rickandmortyapi.com/api/location?page=${page}`);
          const data = response.data;
          allLocations = [...allLocations, ...data.results];
          totalLocations = data.info.count;
          if (data.info.pages === page) break;
          page++;
        }

        setLocations(allLocations);
        setTotalPages(Math.ceil(totalLocations / itemsPerPage));
        setLoading(false);
      } catch (error) {
        setError("API ERROR");
        setLoading(false);
      }
    };

    fetchLocations();
  }, [itemsPerPage]);

  useEffect(() => {
    const fetchResidents = async () => {
      const residentData = {};
      for (const location of locations) {
        if (location.residents.length > 0) {
          try {
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

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const indexOfLastLocation = currentPage * itemsPerPage;
  const indexOfFirstLocation = indexOfLastLocation - itemsPerPage;

  // Apply filter based on type (planet or normal)
  let filteredLocations = locations;
  if (filter === "planet") {
    filteredLocations = filteredLocations.filter((location) =>
      location.type.toLowerCase().includes("planet")
    );
  }

  // Filter based on search query
  if (searchQuery) {
    filteredLocations = filteredLocations.filter((location) =>
      location.name.toLowerCase().includes(searchQuery)
    );
  }

  // Slice the filtered locations for pagination
  filteredLocations = filteredLocations.slice(indexOfFirstLocation, indexOfLastLocation);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="table-container">
      <div className="filter-controls">
        <div>
          <label htmlFor="itemsPerPage">Locations per page: </label>
          <select
            id="itemsPerPage"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
          >
            <option value={5}>5</option>
            <option value={8}>8</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>
        <br />
        <div>
          <label htmlFor="filter">Filter: </label>
          <select id="filter" value={filter} onChange={handleFilterChange}>
            <option value="normal">Normal</option>
            <option value="planet">Planets</option>
          </select>
        </div>
        <br />
        <div>
          <label htmlFor="search">Search by name: </label>
          <input
            type="text"
            id="search"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search by locations name"
          />
        </div>
      </div>

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
          {filteredLocations.map((location) => (
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
        <button onClick={prevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {Math.ceil(filteredLocations.length / itemsPerPage)}
        </span>
        <button onClick={nextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default LocationTable;
