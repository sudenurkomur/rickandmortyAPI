import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Table.css";

const EpisodeTable = () => {
  const [episodes, setEpisodes] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Sayfa durumu
  const [episodesPerPage, setEpisodesPerPage] = useState(5); // Sayfa başına gösterilecek episode sayısı
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1); // Toplam sayfa sayısı
  const [error, setError] = useState(null); // Hata durumu için state

  useEffect(() => {
    // Tüm episode'ları almak için sayfa numaralarını döngüyle geziyoruz
    const fetchEpisodes = async () => {
      let allEpisodes = [];
      let page = 1;
      let totalEpisodes = 0;

      try {
        while (true) {
          const response = await axios.get(`https://rickandmortyapi.com/api/episode?page=${page}`);
          const data = response.data;
          allEpisodes = [...allEpisodes, ...data.results];
          totalEpisodes = data.info.count;
          if (data.info.pages === page) break; // Eğer son sayfaya gelindiyse döngüyü durdur
          page++;
        }

        setEpisodes(allEpisodes);
        setTotalPages(Math.ceil(totalEpisodes / episodesPerPage));
        setLoading(false); // Veri yüklendikten sonra loading'i false yap
      } catch (error) {
        setError("API ERROR"); // API hatası durumunda hata mesajı ayarla
        setLoading(false);
      }
    };

    fetchEpisodes();
  }, [episodesPerPage]);

  useEffect(() => {
    if (episodes.length === 0) return; // Eğer episode'lar yoksa, karakterleri yüklemeyi geç

    // Episode verilerini aldıktan sonra, karakter URL'lerine istek yap
    const fetchCharacterData = async () => {
      let allCharacters = [];

      for (const episode of episodes) {
        const episodeCharacters = await Promise.all(
          episode.characters.map((characterUrl) =>
            axios.get(characterUrl).then((response) => response.data.name) // Her karakterin adını alıyoruz
          )
        );
        allCharacters.push(episodeCharacters); // Karakter isimlerini allCharacters dizisine ekliyoruz
      }

      setCharacters(allCharacters); // Tüm karakter isimlerini state'e ekliyoruz
    };

    fetchCharacterData();
  }, [episodes]);

  if (loading) {
    return <div>Loading...</div>; // Veriler yüklenene kadar yükleme mesajı
  }

  if (error) {
    return <div>{error}</div>; // Hata durumunda "API ERROR" mesajını göster
  }

  // Sayfa başına alınacak episode'ları hesaplama
  const indexOfLastEpisode = currentPage * episodesPerPage;
  const indexOfFirstEpisode = indexOfLastEpisode - episodesPerPage;
  const currentEpisodes = episodes.slice(indexOfFirstEpisode, indexOfLastEpisode);

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

  const handleEpisodesPerPageChange = (e) => {
    setEpisodesPerPage(Number(e.target.value)); // Kullanıcının seçtiği sayfa başına episode sayısını al
    setCurrentPage(1); // Sayfa sıfırlanır çünkü yeni episode sayısı ile yeni veriler alınacak
  };

  return (
    <div className="table-container">
      <h2>Episodes</h2>
      <div>
        <label htmlFor="episodesPerPage">Episodes per page: </label>
        <select
          id="episodesPerPage"
          value={episodesPerPage}
          onChange={handleEpisodesPerPageChange}
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
            <th>Episode</th>
            <th>Name</th>
            <th>Air Date</th>
            <th>Characters</th>
          </tr>
        </thead>
        <tbody>
          {currentEpisodes.map((episode, index) => (
            <tr key={episode.id}>
              <td>{episode.episode}</td>
              <td>{episode.name}</td>
              <td>{episode.air_date}</td>
              <td>
                {characters[index] && characters[index].length > 0
                  ? characters[index].join(", ") // Karakter isimlerini virgülle ayırarak gösteriyoruz
                  : "No characters"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Sayfalama Düğmeleri */}
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

export default EpisodeTable;
