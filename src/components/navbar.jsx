import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "phosphor-react";
import Search from "./Search";
import "./navbar.css";

export const Navbar = () => {
  return (
    <div className="navbar">
      <div className="links">
        <Search id="nav-search" />
        <Link id="nav-shop" to="/" > Shop </Link>
        <Link id="nav-contact" to="/contact"> Contact </Link>
        <Link id="nav-cart" to="/cart">
          <ShoppingCart size={32} />
        </Link>
      </div>
    </div>
  );
};
