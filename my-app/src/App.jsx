import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  const [recipe, setRecipe] = useState([]);
  const [cart, setCart] = useState([]);
  const [show, setShow] = useState(false);

  async function fetchData() {
    const result = await fetch("https://dummyjson.com/recipes");
    const response = await result.json();
    setRecipe(response.recipes);
  }

  useEffect(() => {
    fetchData();
  }, []);

  function addToCart(product) {
    const exists = cart.find(item => item.id === product.id);
    if (exists) {
      toast.error(`${product.name} is already in the cart`);
    } else {
      setCart([...cart, product]);
      toast.success(`${product.name} is added to the cart`);
    }
  }

  function removeFromCart(id) {
    setCart(cart.filter(item => item.id !== id));
    toast.info("Item removed from cart");
  }

  return (
    <div className="app">
      <header className="header">
        <h1 className="store-title">🍽 Food Store</h1>
        <div className="cart-icon" onClick={() => setShow(true)}>
          🛒 Cart <span className="cart-count">{cart.length}</span>
        </div>
      </header>

      <ToastContainer autoClose={2000} />

      <main className="product-grid">
        {recipe.map((item) => (
          <div className="product-card" key={item.id}>
            <img className="product-image" src={item.image} alt={item.name} />
            <h2 className="product-name">{item.name}</h2>
            <p className="product-ingredients">
              {item.ingredients.join(", ")}
            </p>
            <button className="add-btn" onClick={() => addToCart(item)}>
              Add to Cart
            </button>
          </div>
        ))}
      </main>

      {show && (
        <div className="cart-overlay">
          <div className="cart-container">
            <h2>Your Cart</h2>
            {cart.length === 0 ? (
              <p className="empty-cart">Your cart is empty.</p>
            ) : (
              cart.map((item) => (
                <div className="cart-item" key={item.id}>
                  <img src={item.image} alt={item.name} className="cart-item-image" />
                  <span className="cart-item-name">{item.name}</span>
                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              ))
            )}
            <button className="close-btn" onClick={() => setShow(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;