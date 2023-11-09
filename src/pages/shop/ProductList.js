import React from "react";
import { Product } from "./product";
import { useShopContext } from "../../context/shop-context";

function ProductList() {
  const {searchedProducts} = useShopContext()

    const itemData = searchedProducts?.map(product => {
      return <Product key={product.id} product={product} />
    });

    return (
      <div className="products">{itemData}</div>
    );
  }

export default ProductList;
