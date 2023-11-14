import React, { useState } from "react";
import { useShopContext } from "../context/shop-context";

function Search({ inputStyles }) {
  const { products, setSearchResults } = useShopContext();
  const [inputValue, setInputValue] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (!value) {
      setFilteredProducts([]);
      setSearchResults([]);
      return;
    }

    const searchedProducts = products.filter(
      (p) =>
        p.title.toLowerCase().includes(value.toLowerCase()) ||
        p.category.toLowerCase().includes(value.toLowerCase()) ||
        p.description.toLowerCase().includes(value) 
    );

    setFilteredProducts(searchedProducts);
    setSearchResults(searchedProducts); // This updates the product list on the page
  };

  const handleResultClick = (productTitle) => {
    setInputValue(productTitle); // Update the search input
  
    // Perform a search with the autocompleted value
    const updatedSearchResults = products.filter(
      (product) =>
        product.title.toLowerCase().includes(productTitle.toLowerCase()) ||
        product.category.toLowerCase().includes(productTitle.toLowerCase()) ||
        product.description.toLowerCase().includes(productTitle.toLowerCase())
    );
  
    setFilteredProducts([]); // Clear the dropdown
    setSearchResults(updatedSearchResults); // Update the search results on the page
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search products"
        onChange={handleSearchChange}
        value={inputValue}
        style={inputStyles}
      />
      <div className="search-results">
        {filteredProducts.map((product) => (
          <div key={product.id} onClick={() => handleResultClick(product.title)}
          className="search-result-item"
          >
            {product.title}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;
