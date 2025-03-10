import React from "react";
import { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import axios from "axios";
import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";
import Partners from "../components/Partners";
import Carousel from "../components/Carousel";
import background from "../assets/background.jpg";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state

  const fetchApi = async () => {
    try {
      const response = await axios.get("http://localhost:8081/api/products/top");
      console.log("API response:", response.data);
      console.log(response.data);
      setProducts(response.data);
      setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      console.error("Error fetching products in frontend:", error);
      // setError("Failed to fetch products");
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  if (loading) {
    return <div>Loading products...</div>;
  }

  if (error) {
    return <div>{error}</div>; // Display error if there's any
  }
  return (
    <>
        <Hero />
        <Carousel></Carousel>
      <div className="flex flex-col">
        <div className="divider mt-6 mb-8 text-2xl font-extrabold">
          Най-продавани
        </div>

        <div className="mx-auto px-8 lg:px-12 max-w-screen-xl flex flex-col items-center">
          <div className="flex flex-wrap justify-center gap-y-6">
            {products.length === 0 ? (
              <div>No products found</div>
            ) : (
              products.map((product, index) => (
                <ProductCard key={index} card={product} />
              ))
            )}
          

          </div>
          <button className="btn btn-home text-black hover:text-white m-4">
          <Link to="/products">
            Вижте още
            </Link>
          </button>
        </div>
        <div className="divider mt-6 mb-8 text-2xl font-extrabold">
          Нашите сътрудници
        </div>
        <Partners />
      </div>

      </>
  );
};

export default Home;
