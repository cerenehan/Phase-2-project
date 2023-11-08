import React from "react";
import { Product } from "./product";
import { useShopContext } from "../../context/shop-context";

function ProductList() {
  const {products} = useShopContext()

  const itemData = products?.map(product => {
      return <Product key={product.id} product={product} />
    });

    return (
      <div className="products">{itemData}</div>
    );
  }

export default ProductList;
