import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CartItemCard from "../components/CartItemCard";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const { cart, fetchCart } = useCart();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await fetchCart();
      setLoading(false);
    };

    fetchData();
  }, [fetchCart]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!cart || !cart.items.length) {
    return <div>Количката е празна.</div>;
  }

  return (
    <div className="flex flex-col items-center m-6">
      <h1 className="text-4xl underline">Поръчка</h1>
      <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
            Продукти в количката
          </h2>
          <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
            <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
              <div className="space-y-6">
                {cart.items.map((item) => (
                  <CartItemCard key={item.productId} item={item} onCartUpdate={fetchCart} />
                ))}
              </div>
            </div>
            <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
              <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                <p className="text-xl font-semibold text-gray-900 dark:text-white">
                  За поръчката
                </p>
                <div className="space-y-4">
                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                      Брой Продукти:
                    </dt>
                    <dd className="text-base text-right font-medium text-gray-900 dark:text-white">
                      {cart.totalQuantity}
                    </dd>
                  </dl>
                  <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                    <dt className="text-base font-bold text-gray-900 dark:text-white">
                      Общо:
                    </dt>
                    <dd className="text-lg text-right font-bold text-primary dark:text-white pl-8">
                      {cart.totalPrice} лв.
                    </dd>
                  </dl>
                </div>
                <Link to="/delivery" className="btn btn-primary w-full">
                  Поръчай
                </Link>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                    или
                  </span>
                  <Link to="/products" className="text-primary-700 underline">
                    Продължи да пазаруваш
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Cart;
