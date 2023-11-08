import React,  { useEffect, useState }  from "react";
import Search from "../../Search";
import ProductList from "./ProductList";
import "./shop.css";

export const Shop = () => {
  const [product, addProducts] = useState([])
  const [descr, updateDescription] = useState("")

  const onSearchChange = (value) => {
    updateDescription(value)
  }

  useEffect(() => {
    fetch(`http://localhost:3001/products?q=${descr}`)
    .then(res => res.json())
    .then(data =>
      addProducts(data)
    )
  }, [descr])

  return (
    <div className="shop">
      <div className="shopTitle">
       <h1>Virtual Treasures</h1>
      </div>
      <Search onSearchChange={onSearchChange}/>
      <ProductList products={product}/>
    </div>
  );
};
