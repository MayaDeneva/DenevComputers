import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CartItem from './CartItem';
import { useCart } from '../context/CartContext';

import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../index.css';

const CartDropdown = () => {
  const { cart } = useCart(); 
  const [isOpen, setIsOpen] = useState(false);  // Track dropdown visibility
  const navigate = useNavigate(); // Initialize useNavigate


  const { items, totalQuantity, totalPrice } = cart;



  const handleNavigateToCart = () => {
    setIsOpen(false);  // Close the dropdown when navigating
    navigate('/cart');  // Navigate to the /cart page
  };

  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost flex items-center space-x-1 hover:bg-neutral-500 "
        onClick={() => setIsOpen(!isOpen)} // Toggle dropdown visibility
      >
        <div className="indicator">
          <svg
            className="w-6 h-6"
            viewBox="0 0 34 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M26.8351 26.9C27.7103 26.9 28.5496 27.2477 29.1685 27.8665C29.7874 28.4854 30.1351 29.3248 30.1351 30.2C30.1351 31.0752 29.7874 31.9146 29.1685 32.5335C28.5496 33.1523 27.7103 33.5 26.8351 33.5C25.9598 33.5 25.1205 33.1523 24.5016 32.5335C23.8827 31.9146 23.5351 31.0752 23.5351 30.2C23.5351 28.3685 25.0036 26.9 26.8351 26.9ZM0.435059 0.5H5.83056L7.38156 3.8H31.7851C32.2227 3.8 32.6424 3.97384 32.9518 4.28327C33.2612 4.59271 33.4351 5.01239 33.4351 5.45C33.4351 5.7305 33.3526 6.011 33.2371 6.275L27.3301 16.9505C26.7691 17.957 25.6801 18.65 24.4426 18.65H12.1501L10.6651 21.3395L10.6156 21.5375C10.6156 21.6469 10.659 21.7518 10.7364 21.8292C10.8137 21.9065 10.9187 21.95 11.0281 21.95H30.1351V25.25H10.3351C9.45984 25.25 8.62048 24.9023 8.00161 24.2835C7.38274 23.6646 7.03506 22.8252 7.03506 21.95C7.03506 21.3725 7.18356 20.828 7.43106 20.366L9.67506 16.3235L3.73506 3.8H0.435059V0.5ZM10.3351 26.9C11.2103 26.9 12.0496 27.2477 12.6685 27.8665C13.2874 28.4854 13.6351 29.3248 13.6351 30.2C13.6351 31.0752 13.2874 31.9146 12.6685 32.5335C12.0496 33.1523 11.2103 33.5 10.3351 33.5C9.45984 33.5 8.62048 33.1523 8.00161 32.5335C7.38274 31.9146 7.03506 31.0752 7.03506 30.2C7.03506 28.3685 8.50356 26.9 10.3351 26.9ZM25.1851 15.35L29.7721 7.1H8.91606L12.8101 15.35H25.1851Z"
              fill="#1126EA"
            />
          </svg>

          <span className="badge badge-sm indicator-item bg-white">{totalQuantity ? totalQuantity : 0}</span>
        </div>
        <span className="hidden md:inline">Kоличка</span>
      </div>

      {isOpen && (  // Only show dropdown if isOpen is true
        <div className="card card-compact dropdown-content bg-base-100 bg-white z-[1] mt-3 w-72 shadow">
          <div className="card-body">
            <ul tabIndex={0} className="space-y-2 max-h-48 overflow-y-auto scroll-hidden"> 
              {items.length > 0 ? (
                items.map((item, index) => (
                  <div key={index}>
                    <CartItem product={item} />
                    {/* Add line between items */}
                    {index < items.length - 1 && <div className="border-t my-2"></div>}
                  </div>
                ))
              ) : (
                <li className="text-center text-sm text-gray-500">Количката е празна.</li>
              )}
            </ul>
            <div className="flex justify-between items-center mt-2">
              <span className="text-info">Общо: {totalPrice} лв.</span>
              <div className="card-actions">
                <button className="btn btn-secondary btn-block" onClick={handleNavigateToCart}>
                  Поръчка
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartDropdown;
