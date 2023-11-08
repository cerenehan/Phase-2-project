import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-context";

export const CartItem = (props) => {
  const { id, quantity} = props.data;
  const { addToCart, removeFromCart, updateCartItemCount, products, getTotalCartAmount } = useContext(ShopContext);
  const product = products.find(p => p.id === id)

  const total = product.price*quantity

  const handleClick = () => {
    if (quantity > 0) {removeFromCart(id)}
  }

  return (
    <div className="cartItem">
      <img src={product.image} />
      <div className="description">
        <p>
          <b>{product.title}</b>
        </p>
        <p> Price: ${total.toFixed(2)}</p>
        <div className="countHandler">
          <button onClick={handleClick}> - </button>
          <input
            value = {quantity}
            onChange={(e) => updateCartItemCount(Number(e.target.value), id)}
          />
          <button onClick={() => addToCart(id)}> + </button>
        </div>
      </div>
    </div>
  );
};
