import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-context";

export const ReviewItem = (props) => {
  const { id, quantity} = props.data;
  const { products } = useContext(ShopContext);
  const product = products.find(p => p.id === id)

  const total = product.price*quantity

  return (
    <div className="reviewItem">
      <img src={product.image} alt={product.title} />
      <div className="description">
        <p>
          <b>{product.title}</b>
        </p>
        <p> Price: ${total.toFixed(2)}</p>
        <div className="countHandler">
        <p>Quantity: {quantity}</p>  
        </div>
      </div>
    </div>
  );
};
