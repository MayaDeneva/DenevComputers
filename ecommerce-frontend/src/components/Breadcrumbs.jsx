import React from "react";
import { useNavigate } from "react-router-dom";

const Breadcrumbs = ({ categoryName, subcategory, productName }) => {
  const navigate = useNavigate();

  return (
    <div className="breadcrumbs text-sm mb-2 mt-2 flex justify-start pl-4">
      <ul className="flex space-x-2">
        {/* Always show "Продукти" */}
        <li>
          <a
            className="text-blue-900 hover:underline cursor-pointer"
            onClick={() => navigate("/products")}
          >
            Продукти
          </a>
        </li>

        {/* Only render category if it's not undefined/null and not an empty string */}
        {categoryName &&
          typeof categoryName === "string" &&
          categoryName.trim() && (
            <li>
              <a
                className="text-blue-900 hover:underline cursor-pointer"
                onClick={() => navigate(`/products/by-category/${categoryName}`)}
              >
                {categoryName}
              </a>
            </li>
          )}

        {/* Subcategory (if you want the same rule) */}
        {subcategory &&
          typeof subcategory === "string" &&
          subcategory.trim() && (
            <li>
              <a
                className="text-blue-900 hover:underline cursor-pointer"
                onClick={() =>
                  navigate(`/products/by-category/${categoryName}/${subcategory}`)
                }
              >
                {subcategory}
              </a>
            </li>
          )}

        {/* ProductName can still be displayed if it exists */}
        {productName && <li className="text-gray-500">{productName}</li>}
      </ul>
    </div>
  );
};

export default Breadcrumbs;
