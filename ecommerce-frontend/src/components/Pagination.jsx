// src/components/PaginationComponent.js
import React from "react";

const PaginationComponent = ({ currentPage, totalPages, onPageChange }) => {
  // We'll build an array of page numbers [1..totalPages]
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center mt-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        className="btn bg-blue-700 text-white border rounded-md mx-2 shadow-xl"
        disabled={currentPage === 1}
      >
        {"<"}
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`btn border shadow-xl rounded-md mx-0 ${
            currentPage === page ? "bg-blue-500 text-white" : ""
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        className="btn bg-blue-700 text-white border rounded-md mx-2 shadow-xl"
        disabled={currentPage === totalPages}
      >
        {">"}
      </button>
    </div>
  );
};

export default PaginationComponent;
