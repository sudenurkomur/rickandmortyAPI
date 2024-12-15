import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Table.css";

const EpisodeTable = () => {
  const [episodes, setEpisodes] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [episodesPerPage, setEpisodesPerPage] = useState(5);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("time"); // Filtre durumu

  useEffect(() => {
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
          if (data.info.pages === page) break;
          page++;
        }

        setEpisodes(allEpisodes);
        setTotalPages(Math.ceil(totalEpisodes / episodesPerPage));
        setLoading(false);
      } catch (error) {
        setError("API ERROR");
        setLoading(false);
      }
    };

    fetchEpisodes();
  }, [episodesPerPage]);

  useEffect(() => {
    if (episodes.length === 0) return;

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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const handleFilterChange = (e) => {
    const selectedFilter = e.target.value;
    setFilter(selectedFilter);
    if (selectedFilter === "time") {
      setEpisodes([...episodes].sort((a, b) => a.id - b.id));
    } else if (selectedFilter === "alphabetically") {
      setEpisodes([...episodes].sort((a, b) => a.name.localeCompare(b.name)));
    }
  };

  const indexOfLastEpisode = currentPage * episodesPerPage;
  const indexOfFirstEpisode = indexOfLastEpisode - episodesPerPage;
  const currentEpisodes = episodes.slice(indexOfFirstEpisode, indexOfLastEpisode);

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
    setEpisodesPerPage(Number(e.target.value));
    setCurrentPage(1);
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
      <div>
        <label htmlFor="filter">Filter: </label>
        <select id="filter" value={filter} onChange={handleFilterChange}>
          <option value="time">Filter with time</option>
          <option value="alphabetically">Alphabetically A-Z</option>
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
                  ? characters[index].join(", ")
                  : "No characters"}
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
