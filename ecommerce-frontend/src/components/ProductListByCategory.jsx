import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductCard from "./ProductCard";
import Breadcrumbs from "./Breadcrumbs";
import PaginationComponent from "./Pagination";
import Filters from "./Filters"; 

const ProductListByCategory = () => {
  const { categoryName, subcategory } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(1);
  const [priceRange, setPriceRange] = useState([0, 1000]); // Initial range for slider
  const [defaultRange, setDefaultRange] = useState([0, 1000]); // Store default range
  const productsPerPage = 10;
  const [selectedAttributeFilters, setSelectedAttributeFilters] = useState({});


  useEffect(() => {
    const fetchPriceRange = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/api/products/by-category/prices?category=${categoryName}&subcategory=${subcategory || ""}`
        );
        const { minPrice, maxPrice } = response.data;
        setDefaultRange([minPrice, maxPrice]);
        setPriceRange([minPrice, maxPrice]);
      } catch (error) {
        console.error("Error fetching price range:", error);
      }
    };

    fetchPriceRange();
  }, [categoryName, subcategory]);

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/api/products/by-category`,
          {
            params: {
              category: categoryName,
              subcategory: subcategory || "",
              sortBy,
              page: currentPage,
              limit: productsPerPage,
              minPrice: priceRange[0],
              maxPrice: priceRange[1],
              filters: JSON.stringify(selectedAttributeFilters),
            },
          }
        );

        setProducts(response.data.products);
        setTotalPages(Math.ceil(response.data.totalCount / productsPerPage));
        setTotalCount(response.data.totalCount);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching filtered products:", error);
        setError("Failed to fetch products.");
        setLoading(false);
      }
    };

    fetchProductsByCategory();
  }, [categoryName, subcategory, sortBy, currentPage, priceRange, selectedAttributeFilters]);

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleSliderChange = (e) => {
    const { name, value } = e.target;
    setPriceRange((prev) =>
      name === "minPrice"
        ? [parseInt(value), prev[1]]
        : [prev[0], parseInt(value)]
    );
  };

  if (loading) {
    return <div>Loading products...</div>;
  }

  return (
    <div className="flex flex-col">
      <Breadcrumbs categoryName={categoryName} subcategory={subcategory} />
      <div className="divider mt-0 h-0"></div>
      <div className="flex flex-col justify-center items-center mb-2">
        <h1 className="productsHeader">
          {subcategory ? subcategory : categoryName}
        </h1>
        <h2 className="text-base text-slate-500">({totalCount} продукта)</h2>
      </div>

      {/* Sorting Dropdown */}
      <div className="flex justify-end mb-2">
        <div className="flex justify-between items-center gap-x-2">
          <h2 className="font-light">Подреди: </h2>
          <select
            onChange={handleSortChange}
            value={sortBy}
            className="p-2 border rounded-md"
          >
            <option value="">Популярни</option>
            <option value="price_asc">Цена възходяща</option>
            <option value="price_desc">Цена низходяща</option>
          </select>
        </div>
      </div>

      <div className="flex gap-12 m-2">
        {/* Filters Section */}
        <Filters
          categoryName={categoryName}
          subcategory={subcategory}
          priceRange={priceRange}
          defaultRange={defaultRange}
          handleSliderChange={handleSliderChange}
          onFiltersChange={(filters) => setSelectedAttributeFilters(filters)}
        />

        {/* Product List Section */}
        <div className="flex-1">
          <div className="flex flex-wrap justify-start gap-y-6">
            {products.length === 0 ? (
              <div>No products found in this category</div>
            ) : (
              products.map((product, index) => (
                <ProductCard key={index} card={product} categoryName={categoryName} subcategory={subcategory} />
              ))
            )}
          </div>
          {/* Pagination Controls */}
          {products.length > 0 && (
            <PaginationComponent
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductListByCategory;
