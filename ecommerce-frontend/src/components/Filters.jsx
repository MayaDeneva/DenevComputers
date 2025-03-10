import React, { useEffect, useState } from "react";
import axios from "axios";

// Filters Component
const Filters = ({
  categoryName,
  subcategory,
  priceRange,
  defaultRange,
  handleSliderChange,
  onFiltersChange,
}) => {
  const [attributes, setAttributes] = useState({});
  const [selectedFilters, setSelectedFilters] = useState({});

  useEffect(() => {
    const fetchProductAttributes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/api/products/by-category/attributes?category=${categoryName}&subcategory=${
            subcategory || ""
          }`
        );
        setAttributes(response.data);
      } catch (error) {
        console.error("Error fetching product attributes:", error);
      }
    };

    fetchProductAttributes();
  }, [categoryName, subcategory]);

  // Handle checkbox selection for filters
  const handleFilterChange = (attribute, value) => {
    setSelectedFilters((prev) => {
      const newFilters = { ...prev };
      if (newFilters[attribute]?.includes(value)) {
        newFilters[attribute] = newFilters[attribute].filter(
          (item) => item !== value
        );
      } else {
        newFilters[attribute] = [...(newFilters[attribute] || []), value];
      }
      onFiltersChange(newFilters); // Pass updated filters to parent
      return newFilters;
    });
  };

  // Render filter UI
  const renderFilter = (attribute, values) => {
    if (values.length < 5) {
      // Use checkboxes for a small number of options
      return (
        <div key={attribute} className="mt-4">
          <label className="block mb-2 font-medium">{attribute}</label>
          <div className="flex flex-col">
            {values.map((value) => (
              <label key={value} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  checked={selectedFilters[attribute]?.includes(value) || false}
                  onChange={() => handleFilterChange(attribute, value)}
                  className="mr-2"
                />
                {value}
              </label>
            ))}
          </div>
        </div>
      );
    } else {
      // Use a select dropdown for more than 5 options
      return (
        <div key={attribute} className="mt-4">
          <label className="block mb-2 font-medium">{attribute}</label>
          <select
            // If user has picked something, display the first element
            value={selectedFilters[attribute]?.[0] || ""}
            onChange={(e) => {
              const newValue = e.target.value;
              // Convert newValue into an array of length 1
              const newFilters = {
                ...selectedFilters,
                [attribute]: newValue ? [newValue] : [],
              };
              setSelectedFilters(newFilters);
              onFiltersChange(newFilters);
            }}
            className="select select-bordered w-full max-w-xs"
          >
            <option value="" disabled>
              Избери {attribute}
            </option>
            {values.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
      );
    }
  };

  return (
    <div className="w-1/6 bg-neutral p-4 ml-4 rounded-lg">
      <h3 className="font-semibold text-lg mb-4">Филтри</h3>

      {/* Price Range Slider */}
      <div className="mt-4">
        <label className="block mb-2 font-medium">Цена</label>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Мин: {priceRange[0]} лв</span>
          <span className="text-sm font-medium">Макс: {priceRange[1]} лв</span>
        </div>
        <div className="relative">
          <input
            type="range"
            name="maxPrice"
            min={priceRange[0] + 1}
            max={defaultRange[1]}
            value={priceRange[1]}
            onChange={handleSliderChange}
            className="w-full mt-2"
          />
        </div>
      </div>

      {/* Dynamic Filters */}
      {Object.keys(attributes).map((attribute) =>
        renderFilter(attribute, attributes[attribute])
      )}
    </div>
  );
};

export default Filters;
