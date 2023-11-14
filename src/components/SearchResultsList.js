import React, { useState } from "react";
import { useShopContext } from "../context/shop-context";

function SearchResultsList({ theme }) {
  const { products } = useShopContext();
  const [inputValue, setInputValue] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const handleSearchChange = (e) => {
    console.log("Handling search change");
    const value = e.target.value;
    setInputValue(value);

    if (!value) {
      setFilteredProducts([]);
      return;
    }

    const searchedProducts = products.filter(
      (p) =>
        p.title.toLowerCase().includes(value.toLowerCase()) ||
        p.category.toLowerCase().includes(value.toLowerCase())
    );
    console.log("Filtered Products:", searchedProducts);
    setFilteredProducts(searchedProducts);
  };

  const handleResultClick = (productTitle) => {
    setInputValue(productTitle); // Update the input field for autocomplete
    setFilteredProducts([]); // Optionally clear or keep the search results
  };

  return (
    <div className={`results-list ${theme === 'light' ? 'light-theme' : 'dark-theme'}`}>
      <input
        type="text"
        placeholder="Search products"
        value={inputValue}
        onChange={handleSearchChange}
      />
      {filteredProducts.map((product) => (
        <div key={product.id} onClick={() => handleResultClick(product.title)}>
          {product.title}
          {/* Render additional product details if needed */}
        </div>
      ))}
    </div>
  );
}

export default SearchResultsList;
