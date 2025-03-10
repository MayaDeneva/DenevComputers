import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";

const ProductList = ({products}) => {

  return (
    <div className="flex flex-wrap justify-center gap-y-6">
      {products.length === 0 ? (
        <div>No products found</div>
      ) : (
        products.map((product, index) => (
          <ProductCard key={index} card={product} />
        ))
      )}
    </div>
  );
};

export default ProductList;
