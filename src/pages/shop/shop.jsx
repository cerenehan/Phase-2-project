import React from "react";
import ProductList from "./ProductList";
import "./shop.css";

export const Shop = () => {
  return (
    <div className="shop">
      <div className="shopTitle">
        <h1>Virtual Treasures</h1>
      </div>
      <ProductList/>
    </div>
  );
};
