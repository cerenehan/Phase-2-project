import { createContext, useEffect, useState, useContext } from "react";

export const ShopContext = createContext({});


export const ShopContextProvider = ({children}) => {

  const [products, setProducts] = useState([])
  const [cartItems, setCartItems] = useState([]);
  const [searchedProducts, setSearchResults] = useState([]);
  const [searchResults, setResultsList] = useState([]);
  const [buttonPosition, setButtonPosition] = useState({ top: 0, left: 0 });

  

  const fetchProducts = () => {
    fetch("http://localhost:3001/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setSearchResults(data);
      });
  };
  useEffect(() => {
    fetchProducts();
  }, []); 

  const addNewItemAndRefreshProducts = () => {
    console.log("Successfully rerendered products.")
    fetchProducts();
  }
    const getTotalCartAmount = () => {
      const cartProducts = cartItems.map(cartItem => {
        return cartItem = {product:products.find(p => p.id === cartItem.id), quantity:cartItem.quantity}
      })

      const cartPrices = cartProducts.map(item => item.product.price * item.quantity)
      const totalAmount = cartPrices.reduce((n, price) => n + price, 0)

      return totalAmount.toFixed(2)
    };

  const addToCart = (itemId) => {
    const currentCartItemIndex = cartItems.findIndex((cartItem) => cartItem.id === itemId )
    if (currentCartItemIndex === -1) {
      const newCartItem = {id: itemId, quantity: 1}
      const newCart = [...cartItems, newCartItem]
      setCartItems(newCart)
    } else {
      const updateCartItem = {...cartItems[currentCartItemIndex], quantity: cartItems[currentCartItemIndex].quantity+ 1}
      const newCart = [...cartItems]
      newCart[currentCartItemIndex]= updateCartItem
      setCartItems(newCart);
    }
  };

  const removeFromCart = (itemId) => {
    const currentCartItemIndex = cartItems.findIndex((cartItem) => cartItem.id === itemId )
    if (cartItems[currentCartItemIndex].quantity === 1) {
      const newCart = cartItems.filter(item => item !== cartItems[currentCartItemIndex])
      setCartItems(newCart);
      return
    }
      const updateCartItem = {...cartItems[currentCartItemIndex], quantity: cartItems[currentCartItemIndex].quantity- 1}
      const newCart = [...cartItems]
      newCart[currentCartItemIndex]= updateCartItem
      setCartItems(newCart);
  };

  const updateCartItemCount = (newAmount, itemId) => {
    setCartItems([...cartItems, {[itemId]: newAmount}]);
  };

  const checkout = () => {
    setCartItems([]);
  };
  const deleteCart = () => {
    setCartItems([]);
  };

  const contextValue = {
    fetchProducts,
    cartItems,
    products,
    searchedProducts,
    searchResults,
    setResultsList,
    setSearchResults,
    addToCart,
    updateCartItemCount,
    removeFromCart,
    getTotalCartAmount,
    checkout,
    deleteCart,
    buttonPosition,
    setButtonPosition,
    addNewItemAndRefreshProducts,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShopContext = () => useContext(ShopContext)
