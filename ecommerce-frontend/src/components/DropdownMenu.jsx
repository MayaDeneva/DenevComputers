import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const DropdownMenu = ({ categories }) => {
  const navigate = useNavigate();
  const location = useLocation(); 
  const [menuVisible, setMenuVisible] = useState(true); // State to track menu visibility

  const handleCategoryClick = (categoryName) => {
    navigate(`/products/by-category/${categoryName}`); // Navigate to the selected category
    setMenuVisible(false); // Temporarily hide the menu
  };

  const handleSubcategoryClick = (categoryName, subcategory) => {
    navigate(`/products/by-category/${categoryName}/${subcategory}`); // Navigate to the selected subcategory
    setMenuVisible(false); // Hide the menu after selection
  };

  const renderSubcategories = (subcategories, categoryName) => {
    if (subcategories && subcategories.length > 0) {
      return (
        <ul className="submenu absolute left-60 hidden group-hover:block bg-white rounded-lg mt-2 pl-4 ">
          {subcategories.map((subcategory, index) => (
            <li
              key={index}
              className="p-2 cursor-pointer"
              onClick={() => handleSubcategoryClick(categoryName, subcategory)}
            >
              {subcategory}
            </li>
          ))}
        </ul>
      );
    }

    return null; // Return null if there are no subcategories
  };


  useEffect(() => {
    setMenuVisible(true); // Show the menu again when the route changes
  }, [location]);

  return (
    <ul
      className={`dropdown-content menu z-10 xl:min-w-max bg-white rounded-lg lg:min-w-max ${
        menuVisible ? "" : "hidden"
      }`}
      onMouseEnter={() => setMenuVisible(true)} // Show menu on hover
    >
      {categories.map((category) => (
        <li key={category._id} className="relative group">
          <a
            className="p-2 cursor-pointer"
            onClick={() => handleCategoryClick(category.main)}
          >
            {category.main}
          </a>

          {/* Render subcategories when the main category is hovered */}
          {renderSubcategories(category.subcategories, category.main)}
        </li>
      ))}
    </ul>
  );
};

export default DropdownMenu;
