import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "phosphor-react";
import Search from "./Search";
import "./navbar.css";

const searchInputStyles = {
  width: '300px',       // Adjust the width
  height: '20px',       // Adjust the height
  fontSize: '18px',     // Adjust the font size
  padding: '10px',      // Adjust the padding
};

export const Navbar = ({ toggleTheme, onSearchChange}) => {
  return (
    <div className="navbar">
      <div className="links">
      <Search id="nav-search" onSearchChange={onSearchChange} inputStyles={searchInputStyles} />
        <Link id="nav-shop" to="/" > Shop </Link>
        <Link id="nav-contact" to="/contact"> Contact </Link>
        <Link id="nav-cart" to="/cart">
          <ShoppingCart size={32} />
        </Link>
      </div>
      <div className="right-buttons">
        <button onClick={toggleTheme}>Toggle Theme</button>
        <Link to="/admin"><button>Admin Login</button></Link>
      </div>
    </div>
  );
};