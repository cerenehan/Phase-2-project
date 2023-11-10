import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-context";

export const Product = ({product}) => {
  const { addToCart, cartItems } = useContext(ShopContext);
  const cartItem = cartItems.find(cartItem => cartItem.id === product.id)

  return (
    <div className="product">
      <img src={product.image} alt={product.title}/>
      <div className="description">
        <p>
          <b>{product.title}</b>
        </p>
        <p> ${product.price}</p>
      </div>
      <button className="addToCartBttn" onClick={() => addToCart(product.id)}>
        Add To Cart {cartItem ? cartItem.quantity : null}
      </button>
    </div>
  );
};
