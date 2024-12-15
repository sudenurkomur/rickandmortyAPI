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
  const [searchTerm, setSearchTerm] = useState("");

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

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
    setCurrentPage(1); // Arama sırasında sayfa sıfırlanır
  };

  const indexOfLastEpisode = currentPage * episodesPerPage;
  const indexOfFirstEpisode = indexOfLastEpisode - episodesPerPage;

  const filteredEpisodes = episodes.filter((episode) =>
    episode.name.toLowerCase().includes(searchTerm)
  );

  const currentEpisodes = filteredEpisodes.slice(
    indexOfFirstEpisode,
    indexOfLastEpisode
  );

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
      <div className="filter-controls">
        <div>
          <label htmlFor="episodesPerPage">Items per page: </label>
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
        <br />
        <div>
          <label htmlFor="filter">Filter: </label>
          <select id="filter" value={filter} onChange={handleFilterChange}>
            <option value="time">Filter with time</option>
            <option value="alphabetically">Sort Names</option>
          </select>
        </div>
        <br />
        <div>
          <label htmlFor="search">Search: </label>
          <input
            type="text"
            id="search"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search by name"
          />
        </div>
      </div>

      <table className="character-table">
        <thead>
          <h2>Episodes</h2>
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
          Page {currentPage} of {Math.ceil(filteredEpisodes.length / episodesPerPage)}
        </span>
        <button
          onClick={nextPage}
          disabled={
            currentPage === Math.ceil(filteredEpisodes.length / episodesPerPage)
          }
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default EpisodeTable;
