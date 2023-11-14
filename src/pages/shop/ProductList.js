import React from "react";
import { useShopContext } from "../../context/shop-context"; // Adjust the path as needed
import { Product } from "./product";

function ProductList() {
  const { searchResults, products } = useShopContext();

  // Use searchResults if available, otherwise fallback to all products
  const productsToDisplay = searchResults.length > 0 ? searchResults : products;

  return (
    <div className="products">
      {productsToDisplay.map(product => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductList;
