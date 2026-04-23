import React from "react";
import "../styles/Navbar.css";
import SearchIcon from "../assets/search.svg";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <button className="menu-btn" aria-label="Toggle Sidebar">
        <div className="menu-line"></div>
        <div className="menu-line"></div>
        <div className="menu-line"></div>
      </button>

      <Link to="/" className="logo">
        Hammad Mart
      </Link>

      {/*SearchBar*/}
      <div className="search-container">
        <div className="search-box">
          <input type="text" placeholder="Search" className="search-input" />
          <div className="divider"></div>
          <button className="search-icon-btn">
            <img src={SearchIcon} alt="Search" className="search-svg" />
          </button>
        </div>
      </div>

      {/*buttons*/}
      <div className="action-buttons">
        <button className="nav-btn cart-btn">
          Cart
          {/*icon cart*/}
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#e9a8b6"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ marginLeft: "6px" }}
          >
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
        </button>

        <button className="nav-btn login-btn">Login/Sign-up</button>
      </div>
    </nav>
  );
}
