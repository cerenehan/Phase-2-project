import "./App.css";
import React, { useEffect, useState }  from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/navbar";
import { Shop } from "./pages/shop/shop";
import { Contact } from "./pages/contact";
import { Cart } from "./pages/cart/cart";
import { ShopContextProvider } from "./context/shop-context";
import { Checkout } from "./pages/checkout";
import SignInSide from "./components/SignInSide";
import Dashboard from "./pages/AdminPanel/Dashboard";
import DashboardAddNewItem from './pages/AdminPanel/DashboardAddNewItem';

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

  return (
    <div className={`App ${theme}`}>
      <ShopContextProvider>
        <Router>
          <Navbar toggleTheme={toggleTheme} />
          <Routes>
            <Route path="/" element={<Shop />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/admin" element={<SignInSide />} />
            <Route path="/dashboard/*" element={<DashboardLayout />} />
            <Route path="/dashboard/AddNewItem" element={<DashboardAddNewItem />} />
          </Routes>
        </Router>
      </ShopContextProvider>
    </div>
  );
}
function DashboardLayout() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </div>
  );
}
export default App;