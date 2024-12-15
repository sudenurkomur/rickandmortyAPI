import React from "react";
import "./Table.css";

const CharacterTable = () => {
  // Sabit karakter verileri
  const characters = [
    {
      id: 1,
      name: "Navigation Bar",
      description: [
        "As you can see in the Navigation Bar, there are four different options.",
        "You can get information about project usage by selecting Main Page.",
        "You can choose to view Episodes, Characters and Locations information."
      ]
    },
    {
      id: 2,
      name: "Episodes",
      description: [
        "Season and Episode Numbers",
        "Episode Names",
        "Release Dates",
        "Names of the Characters"
      ]
    },
    {
      id: 3,
      name: "Characters",
      description: [
        "Characters Name",
        "Status",
        "Type",
        "Species",
        "Gender",
        "Origin Name",
        "Image",
        "Episodes"
      ]
    },
    {
      id: 4,
      name: "Locations",
      description: [
        "Name",
        "Type",
        "Dimension",
        "Residents"
      ]
    }
  ];

  return (
    <div className="table-container">
      <h2>Information for Project</h2>
      <table className="character-table">
        <thead>
          <tr>
            <th>Options</th>
            <th>Purpose</th>
          </tr>
        </thead>
        <tbody>
          {characters.map((character) => (
            <tr key={character.id}>
              <td>{character.name}</td>
              <td>
                <ul>
                  {character.description.map((line, index) => (
                    <li key={index}>{line}</li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CharacterTable;
