import React, { useEffect, useState } from "react";
import axios from "axios";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:8081/api/orders/my-orders", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming JWT authentication
          },
        });
        setOrders(response.data.orders);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError("Failed to load orders.");
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p>Loading your orders...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (orders.length === 0) return <p>You have no orders yet.</p>;

  return (
    <div className="my-orders container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Моите поръчки</h1>
      {orders.map((order) => (
        <div key={order._id} className="order-card p-4 mb-4 border rounded shadow-md">
          <h2 className="text-lg font-bold">Поръчка #: {order._id}</h2>
          <p className="text-sm text-gray-600">
            Създадена на: {new Date(order.createdAt).toLocaleDateString()}{" "}
            {new Date(order.createdAt).toLocaleTimeString()}
          </p>
          <p className="text-sm text-gray-600">
            Статус: <span className="font-semibold capitalize">{order.status}</span>
          </p>
          <p className="text-sm text-gray-600 font-semibold">
            Цена общо: {order.totalPrice.toFixed(2)} лв.
          </p>
          <div className="items mt-4">
            {order.items.map((item, index) => (
              <div key={index} className="item flex items-center mb-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-16 w-16 rounded mr-4 border"
                />
                <div className="item-details">
                  <h3 className="text-md font-semibold">{item.title}</h3>
                  <p className="text-sm text-gray-600">Цена: {item.price} лв.</p>
                  <p className="text-sm text-gray-600">Количество: {item.quantity}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyOrders;
