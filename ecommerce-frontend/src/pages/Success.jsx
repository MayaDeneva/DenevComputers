import React, { useEffect } from "react";
import Home from "./Home";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { useLocation } from "react-router-dom";

const Success = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const orderId = queryParams.get("orderId"); 
  const { cart, clearCart } = useCart();

  
  useEffect(() => {
    const runAll = async () => {
      // 1) Show modal
      const modal = document.getElementById("my_modal_1");
      if (modal) modal.showModal();

      // 2) Bail if no order or no cart items
      if (!orderId || !cart?.items?.length) {
        console.log("No orderId or no cart items to update");
        return;
      }

      // 3) Update order status
      try {
        await axios.post(`http://localhost:8081/api/orders/${orderId}/updateStatus`, {
          status: "placed",
        });
        console.log(`Order ${orderId} status set to "placed"`);
      } catch (error) {
        console.error("Error setting order status:", error);
      }

      // 4) Update order count for each product
      try {
        for (const item of cart.items) {
          console.log("About to update order count for", item.productId, "qty:", item.quantity);
          await axios.post("http://localhost:8081/api/orders/product-order-count", {
            productId: item.productId,
            quantity: item.quantity,
          });
          console.log(`Order count updated for product ${item.productId}`);
        }
      } catch (error) {
        console.error("An error occurred during the order count update loop:", error);
      }

      // 5) Clear cart after all updates
      clearCart();
    };

    runAll();
  }, [orderId, cart]);

  return (
    <div>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current indicator stroke-success"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="font-bold text-lg p-2 ">Плащането бе успешно!</span>
          <p className="py-4 text-gray-800">
            Благодарим за Вашето доверие. Очаквайте потвърждение на поръчката по
            имейл или по телефонен номер.
          </p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Затвори</button>
            </form>
          </div>
        </div>
      </dialog>
      <Home></Home>
    </div>
  );
};

export default Success;
