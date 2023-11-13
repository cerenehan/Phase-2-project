import React, { useEffect, useState } from 'react';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/navbar';
import { Shop } from './pages/shop/shop';
import { Contact } from './pages/contact';
import { Cart } from './pages/cart/cart';
import { ShopContextProvider } from './context/shop-context';
import { Checkout } from './pages/checkout';
import SignInSide from './components/SignInSide';
import Dashboard from './pages/AdminPanel/Dashboard';
import DashboardAddNewItem from './pages/AdminPanel/DashboardAddNewItem';

const lightTheme = createTheme();
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

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
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <CssBaseline />
      <div className="App">
        <ShopContextProvider>
          <Router>
            <Navbar theme={theme} toggleTheme={toggleTheme} />
            <Routes>
              <Route path="/" element={<Shop />} />
              <Route path="/contact" element={<Contact theme={theme} toggleTheme={toggleTheme} />} />
              <Route path="/cart" element={<Cart theme={theme} toggleTheme={toggleTheme}/>} />
              <Route path="/checkout" element={<Checkout theme={theme} toggleTheme={toggleTheme}/>} />
              <Route path="/admin" element={<SignInSide theme={theme} toggleTheme={toggleTheme}/>} />
              <Route path="/dashboard/*" element={<Dashboard theme={theme} toggleTheme={toggleTheme} />} />
              <Route
                path="/dashboard/AddNewItem" 
                element={<DashboardAddNewItem theme={theme} toggleTheme={toggleTheme} />}
              />
            </Routes>
          </Router>
        </ShopContextProvider>
      </div>
    </ThemeProvider>
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
