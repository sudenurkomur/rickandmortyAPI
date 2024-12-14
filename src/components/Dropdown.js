import React from "react";
import "./Dropdown.css"; // dropdown.css dosyasını import ettik

const Dropdown = () => {
  return (
    <div className="dropdown">
      <button
        className="btn btn-primary dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Filter
      </button>
      <ul className="dropdown-menu">
        <li>
          <a className="dropdown-item" href="#">
            Show All
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="#">
          Show Alphabetically
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Dropdown;
