import React, { useEffect, useState } from "react";
import "./Table.css";

const CharacterTable = () => {
  const [characters, setCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Mevcut sayfa
  const itemsPerPage = 4; // Her sayfada gösterilecek karakter sayısı

  useEffect(() => {
    // API'den karakterleri alıyoruz
    fetch("https://rickandmortyapi.com/api/character")
      .then((response) => response.json())
      .then((data) => setCharacters(data.results))
      .catch((error) => console.error("API Error:", error));
  }, []);

  // Mevcut sayfada görüntülenecek karakterleri hesaplama
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCharacters = characters.slice(indexOfFirstItem, indexOfLastItem);

  // Toplam sayfa sayısını hesaplama
  const totalPages = Math.ceil(characters.length / itemsPerPage);

  // Sayfa değiştirme işlemleri
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
      <h2>Rick and Morty Characters</h2>
      <table className="character-table">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Status</th>
            <th>Type</th>
            <th>Species</th>
            <th>Gender</th>
            <th>Origin Name</th> {/* Yeni kolon eklendi */}
            <th>Image</th>
            <th>Episodes</th> {/* Episode column */}
          </tr>
        </thead>
        <tbody>
          {currentCharacters.map((character) => (
            <tr key={character.id}>
              <td>{character.id}</td>
              <td>{character.name}</td>
              <td>{character.status}</td>
              <td>{character.type}</td>
              <td>{character.species}</td>
              <td>{character.gender}</td>
              <td>{character.origin.name}</td> {/* Origin Name */}
              <td>
                <a href={character.image} target="_blank" rel="noopener noreferrer">
                  View Image
                </a>
              </td>
              <td>
                {/* Tüm episode'ları göster */}
                {character.episode.map((episodeUrl, index) => {
                  // Episode URL'den episode ID'sini çıkarıyoruz
                  const episodeId = episodeUrl.split("/").pop();
                  return (
                    <span key={episodeId}>
                      Episode {episodeId}
                      {index < character.episode.length - 1 && ", "} {/* Virgül ekleyin ancak son episode'dan sonra eklemeyin */}
                    </span>
                  );
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Sayfalama düğmeleri */}
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

export default CharacterTable;
