import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom"

const CartItemCard = ({ item }) => {
  const [loading, setLoading] = useState(false);

  // Access all cart operations from context
  const { addToCart, removeOneFromCart, removeItemFromCart } = useCart();

  const handleIncrement = async () => {
    if (!loading) {
      setLoading(true);
      try {
        // item is the product object in your cart; pass it to addToCart
        await addToCart({ _id: item.productId }); 
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDecrement = async () => {
    if (!loading && item.quantity > 0) {
      setLoading(true);
      try {
        await removeOneFromCart(item.productId);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleRemove = async () => {
    if (!loading) {
      setLoading(true);
      try {
        await removeItemFromCart(item.productId);
      } finally {
        setLoading(false);
      }
    }
  };

  // Use the item from context (updated after each re-fetch)
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
      <div className="md:flex md:items-center md:justify-between md:gap-6">
        {/* Image */}
        <div className="shrink-0 md:order-1">
          <img className="h-20 w-20" src={item.image} alt={item.title} />
        </div>

        {/* Price + Quantity Controls */}
        <div className="flex items-center justify-between md:order-3 md:justify-end w-full">
          <h1 className="mr-4">{item.unitPrice} лв.</h1>
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={handleDecrement}
              disabled={loading || item.quantity < 1}
              className="inline-flex h-5 w-5 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none"
            >
              -
            </button>
            <input
              type="text"
              value={item.quantity}
              readOnly
              className="w-10 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none"
            />
            <button
              type="button"
              onClick={handleIncrement}
              disabled={loading}
              className="inline-flex h-5 w-5 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none"
            >
              +
            </button>
          </div>

          <div className="text-end md:w-32 ml-4">
            <p className="text-base font-bold text-gray-900">
              {/* total price for this item */}
              {item.quantity * item.unitPrice} лв
            </p>
          </div>
        </div>

        {/* Title + Remove */}
        <div className="w-full space-y-4 md:order-2 md:max-w-md mt-4 md:mt-0">
          <div className="text-base font-medium text-gray-900">
            {item.title}
          </div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="text-sm font-medium text-gray-500 hover:text-gray-900 underline"
            >
              <Link to="/contacts">
              Изпрати запитване за наличност
              </Link>
            </button>
            <button
              type="button"
              onClick={handleRemove}
              disabled={loading}
              className="text-sm font-medium text-red-600 hover:underline"
            >
              Премахни
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItemCard;
