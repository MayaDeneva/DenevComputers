// src/components/CartItem.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CartItem = ({ product }) => {

  return (
    <li className="flex w-fit justify-between items-center ">
      <div className="flex gap-2 w-2/3 items-center pr-4">
        <img
          src={product.image} // Use the image from the fetched product details
          alt={product.title}
          className="w-12 h-12 object-cover rounded"
        />
        <span className="text-sm font-medium">{product.title}</span>
      </div>
      <div className="flex gap-4 w-1/3 items-center text-sm text-info">
        <span>×{product.quantity}</span>
        <span>{product.price} лв.</span>
      </div>
    </li>
  );
};

export default CartItem;
