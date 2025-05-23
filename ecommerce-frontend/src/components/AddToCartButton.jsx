import React, { useState, useContext } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";


const AddToCartButton = ({ product, }) => {
  const [isClicked, setIsClicked] = useState(false);
  // const [loading, setLoading] = useState(false); 
  const { addToCart } = useCart();

  const handleClick = (event) => {
    // if (!loading) {
      event.stopPropagation();
      setIsClicked(!isClicked);
      addToCart(product);
    // }
  };


  return (
    <div className="w-full">
      <button
        className={`btn btn-primary w-full flex items-center justify-center space-x-2 transition duration-300${
          isClicked ? "btn-accent hover:bg-accent" : "btn-primary hover:bg-secondary"
        }`}
        onClick={handleClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        <span className="text-white font-normal">
          {isClicked ? "Добавено!" : "Добави в количка"}
        </span>
      </button>
    </div>
  );
};

export default AddToCartButton;
