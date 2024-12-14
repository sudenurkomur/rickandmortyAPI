import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Table.css";

const EpisodeTable = () => {
  const [episodes, setEpisodes] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Sayfa durumu
  const [episodesPerPage] = useState(5); // Her sayfada gösterilecek episode sayısı
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Episode verilerini al
    axios
      .get("https://rickandmortyapi.com/api/episode")
      .then((response) => {
        setEpisodes(response.data.results);
        setLoading(false); // Veri yüklendikten sonra loading'i false yap
      })
      .catch((error) => console.error("Episode API Error:", error));
  }, []);

  useEffect(() => {
    if (episodes.length === 0) return; // Eğer episode'lar yoksa, karakterleri yüklemeyi geç

    // Episode verilerini aldıktan sonra, karakter URL'lerine istek yap
    const fetchCharacterData = async () => {
      let allCharacters = [];

      for (const episode of episodes) {
        const episodeCharacters = await Promise.all(
          episode.characters.map((characterUrl) =>
            axios.get(characterUrl).then((response) => response.data.name)
          )
        );
        allCharacters.push(episodeCharacters);
      }

      setCharacters(allCharacters);
    };

    fetchCharacterData();
  }, [episodes]);

  if (loading) {
    return <div>Loading...</div>; // Veriler yüklenene kadar yükleme mesajı
  }

  // Sayfa başına alınacak episode'ları hesaplama
  const indexOfLastEpisode = currentPage * episodesPerPage;
  const indexOfFirstEpisode = indexOfLastEpisode - episodesPerPage;
  const currentEpisodes = episodes.slice(indexOfFirstEpisode, indexOfLastEpisode);

  // Sayfa değiştirme işlevi
  const nextPage = () => {
    if (currentPage < Math.ceil(episodes.length / episodesPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="table-container">
      <h2>Episodes</h2>
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
                  ? characters[index].join(", ")
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
          {currentPage} of {Math.ceil(episodes.length / episodesPerPage)}
        </span>
        <button onClick={nextPage} disabled={currentPage === Math.ceil(episodes.length / episodesPerPage)}>
          Next
        </button>
      </div>
    </div>
  );
};

export default EpisodeTable;
