import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useParams, useLocation } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";
import ProductImages from "../components/ProductImages";
import AddToCartButton from "../components/AddToCartButton";
import AddToFavouritesButton from "../components/AddToFavouritesButton";
import AttributesTable from "../components/AttributesTable";

const Product = () => {
  const { id } = useParams(); // Get the product ID from the URL path
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const targetRef = useRef(null);

  // Access the query parameters (category and subcategory) using useLocation
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  let categoryName = queryParams.get("category");
  const subcategory = queryParams.get("subcategory");

  const scrollToTarget = () => {
    if (targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    // const incrementViewCount = async () => {
    //   try {
    //     await axios.post(`http://localhost:8081/api/products/product/view/${id}`);
    //   } catch (error) {
    //     console.error("Error updating view count:", error);
    //   }
    // };
  
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/api/products/by-category/product/${id}?category=${categoryName}&subcategory=${subcategory || ''}`
        );
        setProduct(response.data);
        setLoading(false);
        categoryName = categoryName ?? response.data.category[0];
  
        // Increment the view count after successfully fetching the product
        // incrementViewCount();
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to load product.");
        setLoading(false);
      }
    };
  
    fetchProduct();
  }, [id, categoryName, subcategory]);
  

  if (loading) return <div>Loading product...</div>;
  if (error) return <div>{error}</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="container mx-auto pl-8">
      {/* Pass the product name to the Breadcrumbs component */}
      <Breadcrumbs categoryName={categoryName} subcategory={subcategory} productName={product.title} />
      
      <div className="flex flex-col lg:flex-row">
        <ProductImages images={product.image} />

        {/* Product Details */}
        <div className="lg:w-1/2 lg:pl-8">
          <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
          <div className="divider divider-accent"></div>
          <p className="text-sm mb-4">
  Код: <span>{product.part_number}</span>
  <span className="pl-4">
    {product.instock > 0 ? (
      <span className="text-success">В наличност</span>
    ) : (
      <span className="text-warning">Не е наличен</span>
    )}
  </span>
</p>
          <div className="flex flex-col lg:flex-row m-4 ml-0 gap-x-2 ">

            {/* Features */}
            <div className="container shadow-inner bg-neutral rounded-lg w-full lg:w-1/2 p-4 font-light text-sm">
              <h3 className="font-normal text-base mb-4">Описание</h3>
              <ul>
                {product.attributes &&
                  product.attributes.slice(0, 5).map((attribute, index) => (
                    <li key={index} className="flex text-sm justify-between mb-2">
                      <span className="font-light text-sm">{attribute.name}:</span>
                      <span>{attribute.value}</span>
                    </li>
                  ))}
              </ul>
              <div className="flex items-stretch ">
                <button
                  className="btn flex self-end mt-4 bg-white text-secondary "
                  onClick={scrollToTarget}
                >
                  <span className="text-black">Пълни характеристики</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-2 transform transition-transform duration-300 group-hover:translate-x-1"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Price and buy */}
            <div className="inline-flex shadow-inner flex-col justify-between items-center bg-neutral p-6 rounded-lg w-full lg:w-1/2 sm:w-auto mt-4 lg:mt-0">
              <p className="text-3xl text-primary self-start font-extrabold mb-4">
                {product.price}
                <span className="text-sm align-top ml-0.5">00</span>{" "}
                <span className="text-sm text-black ml-0.5">лв.</span>
              </p>
              <div className="divider mt-0"></div>
              <div className="flex flex-col justify-end content-end gap-2">
                <AddToFavouritesButton />
                <AddToCartButton product={product} />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Product Attributes Table */}
      <AttributesTable ref={targetRef} attributes={product.attributes} />
    </div>
  );
};

export default Product;
