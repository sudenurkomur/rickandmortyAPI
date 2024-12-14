import React from "react";
import "./Table.css";

const CharacterTable = () => {
  // Sabit karakter verileri
  const characters = [
    { id: 1, name: "Filter", description: "Scientist, inventor, and the grandpa of Morty." },
    { id: 2, name: "Show Characters", description: "Rick's grandson, often dragged into dangerous adventures.Rick's daughter, a veterinarian who struggles with family dynamics.Rick's daughter, a veterinarian who struggles with family dynamics.Rick's daughter, a veterinarian who struggles with family dynamics.Rick's daughter, a veterinarian who struggles with family dynamics.Rick's daughter, a veterinarian who struggles with family dynamics.Rick's daughter, a veterinarian who struggles with family dynamics.Rick's daughter, a veterinarian who struggles with family dynamics.Rick's daughter, a veterinarian who struggles with family dynamics.Rick's daughter, a veterinarian who struggles with family dynamics." },
    { id: 3, name: "Show Locations", description: "Rick's granddaughter, often more responsible than Morty.Rick's daughter, a veterinarian who struggles with family dynamics.Rick's daughter, a veterinarian who struggles with family dynamics.Rick's daughter, a veterinarian who struggles with family dynamics.Rick's daughter, a veterinarian who struggles with family dynamics.Rick's daughter, a veterinarian who struggles with family dynamics.Rick's daughter, a veterinarian who struggles with family dynamics.Rick's daughter, a veterinarian who struggles with family dynamics.Rick's daughter, a veterinarian who struggles with family dynamics.Rick's daughter, a veterinarian who struggles with family dynamics." },
    { id: 4, name: "Show Episodes", description: "Rick's daughter, a veterinarian who struggles with family dynamics.Rick's daughter, a veterinarian who struggles with family dynamics.Rick's daughter, a veterinarian who struggles with family dynamics.Rick's daughter, a veterinarian who struggles with family dynamics.Rick's daughter, a veterinarian who struggles with family dynamics.Rick's daughter, a veterinarian who struggles with family dynamics.Rick's daughter, a veterinarian who struggles with family dynamics." },
    
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
              <td>{character.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CharacterTable;
