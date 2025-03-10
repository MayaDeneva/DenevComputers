import React from "react";
import {useEffect, useState} from "react";
import axios from "axios";
import CategoryCard from "../components/CategoryCard";

const Products = () => {
  const [categories, setCategories] = useState([]);


  useEffect(() => {
    axios.get('http://localhost:8081/api/categories')
      .then((res) => setCategories(res.data))
      .catch((error) => console.error('Error fetching categories:', error));
  }, []);
  
  
    return (
      <div className="flex flex-wrap justify-center gap-y-6">
        {categories.length === 0 ? (
          <div>No categories found</div>
        ) : (
          categories.map((category, index) => (
            <CategoryCard key={index} category={category} />
          ))
        )}
      </div>
    );
};

export default Products;