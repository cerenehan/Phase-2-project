import React, { useContext, useState } from "react";
import { ShopContext } from "../../context/shop-context";
import { CartItem } from "./cart-item";
import { useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import ConfettiExplosion from 'react-confetti-explosion';

import "./cart.css";

export const Cart = () => {
  const { cartItems, getTotalCartAmount, checkout, deleteCart } = useContext(ShopContext);
  const totalAmount = getTotalCartAmount();

  const navigate = useNavigate();
  const [isExploding, setIsExploding] = useState(false);

  const explosionColors = [
    '#FF5733', 
    '#FF0000', 
    '#FFD700', 
    '#B22222', 
  ];

  return (
    <div className="cart">
      <div>
        <h1>Your Cart Items</h1>
      </div>
      <div className="cart">
        {cartItems.map((cartItem) => {
          return <CartItem data={cartItem} key={cartItem.id} />;
        })}
      </div>

      {totalAmount > 0 ? (
        <div className="checkout">
          <p> Subtotal: ${totalAmount} </p>
          <IconButton aria-label="delete" onClick={() => {
            deleteCart();
            setIsExploding(true);
            setTimeout(() => {
              setIsExploding(false);
            }, 3000);
          }}>
            <DeleteIcon />
          </IconButton>
          <button onClick={() => navigate("/")}> Continue Shopping </button>
          <button
            onClick={() => {
              checkout();
              navigate("/checkout");
            }}
          >
            {" "}
            Checkout{" "}
          </button>
        </div>
      ) : (
        <h1> Your Shopping Cart is Empty</h1>
      )}
      
      {isExploding && (
        <ConfettiExplosion
          colors={explosionColors}
          particleCount={600}
          width={175}
          height={180}
          force={0.9}
          duration={3000}
          
        />
      )}
    </div>
  );
}; 