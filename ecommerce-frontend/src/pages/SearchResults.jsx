// src/pages/SearchResultsPage.jsx
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import ProductList from "../components/ProductList";
import PaginationComponent from "../components/Pagination";

const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Optional: control how many items per page
  const limit = 5; // or 10, or user choice

  useEffect(() => {
    // If query is empty, reset
    if (!query.trim()) {
      setResults([]);
      setTotalPages(1);
      return;
    }

    const fetchResults = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Request the search endpoint with page & limit
        const response = await axios.get("http://localhost:8081/api/products/search", {
          params: {
            query,
            page: currentPage,
            limit,
          },
        });

        setResults(response.data.results || []);
        setTotalPages(response.data.totalPages || 1);
      } catch (err) {
        console.error("Search error:", err);
        setError("An error occurred while searching. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [query, currentPage, limit]);

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
  };

  return (
    <div className="container mx-auto p-4">
      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!isLoading && !error && results.length > 0 && (
        <div className="flex flex-col items-center gap-8">
        <h1>Резултати от търсене за "{query}" </h1>
        <ProductList products={results} />
        </div>
      )}

      {!isLoading && !error && results.length === 0 && query && (
        <p>Не са намерени продукти "{query}".</p>
      )}

      {/* Pagination */}
      {!isLoading && !error && totalPages > 1 && (
        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default SearchResultsPage;
