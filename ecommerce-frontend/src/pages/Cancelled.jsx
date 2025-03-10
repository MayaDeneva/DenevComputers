import React, { useEffect } from "react";
import Home from "./Home";
import { useLocation } from "react-router-dom";
import axios from 'axios';

const Cancelled = () => {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const orderId = queryParams.get('orderId');
  useEffect(() => {
    const modal = document.getElementById("my_modal_1");
    if (modal) {
      modal.showModal();
    }
    if (orderId) {
        deleteOrder(orderId);
      }
  }, [orderId]);

  const deleteOrder = async (orderId) => {
    try {
      await axios.delete(`http://localhost:8081/api/orders/${orderId}`);
      console.log(`Order ${orderId} deleted successfully`);
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  return (
    <div>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-error indicator "
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="font-bold text-lg p-2 ">Неуспешна транзакция!</span>
          <p className="py-4 text-gray-800">Моля, опитайте отново.</p>
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

export default Cancelled;
