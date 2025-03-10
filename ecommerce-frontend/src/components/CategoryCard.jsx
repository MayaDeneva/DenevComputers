import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

const CategoryCard = ({ category }) => {
    const navigate = useNavigate();
    const handleCardClick = () => {
    
        navigate(`/products/by-category/${category.main}`);
      };
  return (
    <div className="card bg-base-100 w-96 shadow-xl"
    onClick={handleCardClick}>
      <div className="card-body">
        <h2 className="card-title">{category.main}</h2>
      </div>
      <figure>
        <img
          className="w-48 h-48 object-contain" 
          src={category.image}
          alt={category.main}
        />
      </figure>
    </div>
  );
};

export default CategoryCard;
