import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../../context/shop-context";
import { CartItem } from "./cart-item";
import { useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import ConfettiExplosion from 'react-confetti-explosion';



import "./cart.css";

export const Cart = () => {
  const {
    cartItems,
    getTotalCartAmount,
    checkout,
    deleteCart,
    buttonPosition,
    setButtonPosition,
  } = useContext(ShopContext);
  const totalAmount = getTotalCartAmount();
  const navigate = useNavigate();
  const [isExploding, setIsExploding] = useState(false);

  useEffect(() => {
    
    const deleteButton = document.getElementById("delete-button");
    if (deleteButton) {
      const rect = deleteButton.getBoundingClientRect();
      setButtonPosition({ top: rect.top, left: rect.left });
    }
  }, [setButtonPosition]);

  const explosionColors = [
    '#FF5733',
    '#FF0000',
    '#FFD700',
    '#B22222',
  ];

  const handleDeleteCart = () => {
    setIsExploding(true);
    setTimeout(() => {
      deleteCart();
    }, 3000);
  };

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
          <IconButton
            id="delete-button"
            aria-label="delete"
            onClick={handleDeleteCart}
          >
            <DeleteIcon />
          </IconButton>
          <button onClick={() => navigate("/")}> Continue Shopping </button>
          <button
            onClick={() => {
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
          particleCount={700}
          width={500}
          height={500}
          force={0.9}
          duration={3000}
          particalSize={4}
          style={{
            position: 'absolute',
            top: buttonPosition.top + 'px',
            left: buttonPosition.left + 'px',
          }}
        />
      )}
    </div>
  );
};