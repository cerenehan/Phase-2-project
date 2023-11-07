import React from "react";
import { Product } from "./product";

function ProductList({products}) {
  const itemData = products.map(product => {
      return <Product key={product.id} product={product} />
    });

    return (
      <div className="products">{itemData}</div>
    );
  }

export default ProductList;
