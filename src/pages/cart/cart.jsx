import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../../context/shop-context";
import { CartItem } from "./cart-item";
import { useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Confetti from 'react-confetti-boom';
import { Paper } from "@mui/material";
import "./cart.css";

export const Cart = ({ theme }) => {
  const {
    cartItems,
    getTotalCartAmount,
    deleteCart,
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

  const handleDeleteCart = () => {
    setIsExploding(true);
    setTimeout(() => {
      deleteCart();
    }, 10);
  };

  return (
    <Paper className={`cart-page ${theme === 'dark' ? 'dark-theme' : 'light-theme'}`}>
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
          <p>Subtotal: ${totalAmount}</p>
          <IconButton id="delete-button" aria-label="delete" onClick={handleDeleteCart}>
            <DeleteIcon />
          </IconButton>
          <button onClick={() => navigate("/")}>Continue Shopping</button>
          <button onClick={() => navigate("/checkout")}>Checkout</button>
        </div>
      ) : (
        <div>
          <h1 style={{ textAlign: 'center' }}>Your Shopping Cart is Empty</h1>
          <img src="https://i.imgur.com/Sgi0Rfs.png" alt="Empty Shopping Cart with Man" />
        </div>
      )}
        {isExploding && (
          <Confetti
          mode='boom'
          colors={["#33160f", "#b22222", "#ff7a00", "#f1c609", "#FFF347", "#FDFFA5"]}
          deg={270}
          particleCount={800}
          shapeSize={3.2528002417761357}
          shapeDeg={16.174975694309733}
          spreadDeg={20}
          launchSpeed={2.2}
          
          />
        )}
      </div>
    </Paper>
  );
};