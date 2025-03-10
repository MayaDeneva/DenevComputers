import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddToCartButton from "./AddToCartButton";


const ProductCard = ({ card, categoryName, subcategory }) => {
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    if (!isClicked) {
      setIsClicked(true); // Set to true when clicked
      console.log("Added to cart!");
    }
  };

  // Handle navigation when the card is clicked
  const handleCardClick = () => {
    // Include category and subcategory in the URL query
    navigate(`/products/by-category/product/${card._id}?category=${categoryName}&subcategory=${subcategory || ""}`);
  };

  return (
    <div
      className="card bg-base-100 bg-neutral w-72 shadow-xl transform transition duration-300 hover:shadow-2xl hover:border-1 cursor-pointer"
      onClick={handleCardClick} 
    >
      <figure>
        <img
          src={card.image[0] ? card.image[0] : 'https://media.tenor.com/Jojpr9QgMLoAAAAM/maxwell-maxwell-spin.gif'}
          alt={card.title}
          className="w-full h-52 transition duration-300 ease-in-out transform hover:scale-105"
        />
      </figure>
      <div className="card-body w-72 flex flex-col justify-between -ml-2">
        <h2 className="card-title w-64 flex justify-start p-2 right-4 relative bottom-6 text-left">
          {card.title}
        </h2>
        <div className="card-actions w-full flex flex-col">
          <p className="text-left text-secondary text-xl font-semibold">
            <span className="text-sm font-normal text-black">Цена: </span>
            {card.price.toFixed(2)} лв.
          </p>
          <div className="card-actions max-w-xs w-full">
            <AddToCartButton product={card} /> 
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
