import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const ServiceCards = () => {
  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]); 
  const navigate = useNavigate();
  const location = useLocation();

  // Parse query parameters
  const queryParams = new URLSearchParams(location.search);
  const selectedCategoryQuery = queryParams.get("category");

  useEffect(() => {
    // Fetch all categories
    axios
      .get("http://localhost:8081/api/categories/services")
      .then((res) => setCategories(res.data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  useEffect(() => {
    // Fetch services for the selected category
    if (selectedCategoryQuery) {
      axios
        .get(`http://localhost:8081/api/services?category=${selectedCategoryQuery}`)
        .then((res) => setServices(res.data))
        .catch((error) => console.error("Error fetching services:", error));
    }
  }, [selectedCategoryQuery]);

  // Handle category click
  const handleCategoryClick = (category) => {
    if (selectedCategoryQuery === category.main) {
      navigate(""); // Clear query params
    } else {
      navigate(`?category=${category.main}`); // Update query params
    }
  };

  return (
    <div className="flex flex-col items-center gap-y-6">
      {/* Render categories */}
      <div className="flex flex-wrap justify-center gap-4">
        {categories.length === 0 ? (
          <div>No categories found</div>
        ) : (
          categories.map((category, index) => (
            <div
              key={index}
              className={`card bg-base-100 w-72 shadow-xl cursor-pointer hover:shadow-2xl ${
                selectedCategoryQuery === category.main ? "border-2 border-primary" : ""
              }`}
              onClick={() => handleCategoryClick(category)}
            >
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
          ))
        )}
      </div>

      {/* Services Table */}
      {selectedCategoryQuery && services.length > 0 && (
        <div className="bg-white shadow-lg rounded-lg p-6 mt-4 w-full max-w-4xl">
          <h2 className="text-lg font-semibold mb-4">
            Услуги: "{selectedCategoryQuery}"
          </h2>
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">Услуга</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Цена</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2">{service.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{service.price ? `${service.price} лв` : "По договаряне"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* No Services Message */}
      {selectedCategoryQuery && services.length === 0 && (
        <div className="text-center text-gray-500">
          No services found for "{selectedCategoryQuery}"
        </div>
      )}
    </div>
  );
};

export default ServiceCards;
