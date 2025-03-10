import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

// Create a context
const CartContext = createContext();

// CartProvider Component
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({
    items: [],
    totalPrice: 0,
    totalQuantity: 0,
  });

  // Fetch cart from backend
  const fetchCart = async () => {
    try {
      const response = await axios.get("http://localhost:8081/api/cart");
      setCart(response.data);
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  // Fetch cart data once on provider initialization
  useEffect(() => {
    fetchCart();
  }, []);

  // Add to cart
  const addToCart = async (product) => {
    try {
      const response = await axios.post(
        "http://localhost:8081/api/cart",
        {
          productId: product._id,
        },
        { withCredentials: true } // Include session cookie
      );

      console.log("Updated Cart:", response.data.cart);
      await fetchCart(); // Display the updated cart
    } catch (error) {
      // 1) Check if this is a known "no more stock" error from server
      if (
        error.response?.status === 400 &&
        error.response?.data?.error === "No more stock available"
      ) {

        alert("Няма повече в наличност!");

        return;
      }

      console.error(
        "Error adding product to cart",
        error.response?.data || error
      );
      alert("Failed to add product to cart. Please try again.");
    }
  };

  // Remove exactly one unit of product from the cart
  const removeOneFromCart = async (productId) => {
    try {
      await axios.post(
        "http://localhost:8081/api/cart/remove",
        { productId },
        { withCredentials: true }
      );
      await fetchCart(); // Refetch cart
    } catch (error) {
      console.error("Error removing product from cart:", error);
    }
  };

  // Remove the entire item from the cart
  const removeItemFromCart = async (productId) => {
    try {
      await axios.post(
        "http://localhost:8081/api/cart/remove-item",
        { productId },
        { withCredentials: true }
      );
      await fetchCart(); // Refetch cart
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const clearCart = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:8081/api/cart/clear-cart`
      );
      if (response.status === 200) {
        console.log("Cart cleared successfully.");
      }
      await fetchCart();
    } catch (error) {
      console.error("Error clearing the cart:", error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        fetchCart,
        addToCart,
        removeOneFromCart,
        removeItemFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom Hook to use CartContext
export const useCart = () => useContext(CartContext);
