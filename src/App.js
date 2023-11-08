import "./App.css";
import React, { useEffect, useState }  from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/navbar";
import { Shop } from "./pages/shop/shop";
import { Contact } from "./pages/contact";
import { Cart } from "./pages/cart/cart";
import { ShopContextProvider } from "./context/shop-context";
import { Checkout } from "./pages/checkout";
import './darkMode.css';

function App() {
  const [theme, setTheme] = useState('light');
  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);


  const [product, addProducts] = useState([])
  const [title, updateTitle] = useState("")

  const onSearchChange = (value) => {
    updateTitle(value)
  }

  useEffect(() => {
    fetch(`http://localhost:3001/products?q=${title}`)
    .then(res => res.json())
    .then(data =>
      addProducts(data)
    )
  }, [title])


  return (
    <div className={`App ${theme}`}>
      <ShopContextProvider PRODUCTS={product}>
        <Router>
        <Navbar onSearchChange={onSearchChange}/>
        <button onClick={toggleTheme}>Toggle Theme</button>
          <Routes>
            <Route path="/" element={<Shop products={product}/>} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart productList={product}/>} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </Router>
      </ShopContextProvider>
    </div>
  );
}

export default App;
