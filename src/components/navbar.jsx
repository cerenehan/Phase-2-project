import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "phosphor-react";
import Search from "./Search";
import "./navbar.css";
import "./search.css";
import IconButton from '@mui/material/IconButton';
import Brightness4OutlinedIcon from '@mui/icons-material/Brightness4Outlined';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';

const searchInputStyles = {
  width: '300px',
  height: '20px',
  fontSize: '18px',
  padding: '10px',
};

export const Navbar = ({ theme, toggleTheme }) => {
  const isDarkMode = theme === "dark";
  return (
    <div className="navbar">
      <div className="links">
        <div className="search-container">
          <Search id="nav-search" inputStyles={searchInputStyles} />
        </div>
        <Link id="nav-shop" to="/" > Shop </Link>
        <Link id="nav-contact" to="/contact"> Contact </Link>
        <Link id="nav-cart" to="/cart" >
          <ShoppingCart size={32} /> 
        </Link>
      </div>
      <div className="right-buttons">
        <IconButton color="inherit" title="Toggle Theme" onClick={toggleTheme}>
          <Brightness4OutlinedIcon />
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </IconButton>
        <Link to="/admin">
          <IconButton title="Admin Panel">
            <AdminPanelSettingsOutlinedIcon />Admin Panel
          </IconButton>
        </Link>
      </div>
    </div>
  );
};
