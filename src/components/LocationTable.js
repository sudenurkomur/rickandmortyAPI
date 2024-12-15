import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Table.css";

const LocationTable = () => {
  const [locations, setLocations] = useState([]);
  const [residentNames, setResidentNames] = useState({});
  const [currentPage, setCurrentPage] = useState(1); // Sayfa durumu
  const [itemsPerPage, setItemsPerPage] = useState(5); // Sayfa başına gösterilecek location sayısı
  const [totalPages, setTotalPages] = useState(1); // Toplam sayfa sayısı
  const [loading, setLoading] = useState(true); // Loading durumu
  const [error, setError] = useState(null); // Hata durumu için state

  // Lokasyon verilerini çekerken sayfa parametresini kullan
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
          if (data.info.pages === page) break; // Eğer son sayfaya gelindiyse döngüyü durdur
          page++;
        }

        setLocations(allLocations);
        setTotalPages(Math.ceil(totalLocations / itemsPerPage)); // Sayfa sayısını hesapla
        setLoading(false); // Veri yüklendikten sonra loading'i false yap
      } catch (error) {
        setError("API ERROR");
        setLoading(false);
      }
    };

    fetchLocations();
  }, [itemsPerPage]); // itemsPerPage değiştiğinde tekrar veri çek

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
    setItemsPerPage(Number(e.target.value)); // Kullanıcının seçtiği sayfa başına location sayısını al
    setCurrentPage(1); // Sayfa sıfırlanır çünkü yeni location sayısı ile yeni veriler alınacak
  };

  // Sayfa başına gösterilecek verileri hesaplama
  const indexOfLastLocation = currentPage * itemsPerPage;
  const indexOfFirstLocation = indexOfLastLocation - itemsPerPage;
  const currentLocations = locations.slice(indexOfFirstLocation, indexOfLastLocation);

  // Sayfa değiştirme işlevi
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
    return <div>Loading...</div>; // Veriler yüklenene kadar yükleme mesajı
  }

  if (error) {
    return <div>{error}</div>; // Hata durumunda "API ERROR" mesajını göster
  }

  return (
    <div className="table-container">
      <h2>Locations</h2>
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

      {/* Sayfalama */}
      <div className="pagination">
        <button onClick={prevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={nextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default LocationTable;
