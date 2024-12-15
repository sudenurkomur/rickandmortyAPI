import React, { useEffect, useState } from "react";
import "./Table.css";

const CharacterTable = () => {
  const [characters, setCharacters] = useState([]); // Tüm karakterler
  const [currentPage, setCurrentPage] = useState(1); // Mevcut sayfa
  const [itemsPerPage, setItemsPerPage] = useState(5); // Sayfa başına karakter sayısı (başlangıçta 5)
  const [totalPages, setTotalPages] = useState(1); // Toplam sayfa sayısı
  const [totalCharacters, setTotalCharacters] = useState(0); // Toplam karakter sayısı
  const [error, setError] = useState(null); // Hata durumu

  // API'den karakterleri alıyoruz
  useEffect(() => {
    const fetchCharacters = async () => {
      let allCharacters = []; // Tüm karakterleri tutacak dizi
      let page = 1; // Başlangıç sayfası
      let totalPages = 1; // Toplam sayfa sayısı
      try {
        // API'den ilk sayfayı al
        while (page <= totalPages) {
          const response = await fetch(
            `https://rickandmortyapi.com/api/character?page=${page}`
          );
          const data = await response.json();
          allCharacters = allCharacters.concat(data.results); // Yeni sayfadaki karakterleri mevcut listeye ekle
          totalPages = data.info.pages; // Toplam sayfa sayısını güncelle
          page++; // Bir sonraki sayfaya geç
        }

        setCharacters(allCharacters); // Tüm karakterleri set et
        setTotalCharacters(allCharacters.length); // Toplam karakter sayısını güncelle
        setTotalPages(Math.ceil(allCharacters.length / itemsPerPage)); // Toplam sayfa sayısını hesapla
        setError(null); // Hata durumu sıfırlanır
      } catch (error) {
        setError("API ERROR"); // API hatası durumunda error mesajını ayarla
      }
    };

    fetchCharacters();
  }, [itemsPerPage]); // itemsPerPage değiştiğinde verileri yeniden çek

  // Sayfa değiştiğinde, yeni verileri ayarlıyoruz
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

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value)); // Kullanıcının seçtiği sayfa başına öğe sayısını al
    setCurrentPage(1); // Sayfa sıfırlanır çünkü yeni öğe sayısı ile yeni veriler alınacak
  };

  // Sayfa başına gösterilecek öğe sayısına göre karakterleri ayarlıyoruz
  const indexOfLastCharacter = currentPage * itemsPerPage;
  const indexOfFirstCharacter = indexOfLastCharacter - itemsPerPage;
  const currentCharacters = characters.slice(indexOfFirstCharacter, indexOfLastCharacter);

  return (
    <div className="table-container">
      <h2>Rick and Morty Characters</h2>
      {error && <div className="error-message">{error}</div>} {/* Hata mesajı */}
      
      {/* Sayfa başına gösterilecek öğe sayısını seçme */}
      <div>
        <label htmlFor="itemsPerPage">Items per page: </label>
        <select id="itemsPerPage" value={itemsPerPage} onChange={handleItemsPerPageChange}>
          <option value={5}>5</option>
          <option value={8}>8</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </div>

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
              <td>{character.type || ""}</td>
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
