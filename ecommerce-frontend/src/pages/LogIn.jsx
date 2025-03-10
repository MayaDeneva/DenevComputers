// src/pages/LoginPage.jsx
import React, { useState, useContext, useEffect } from "react";
import SignInForm from "../components/SignInForm";
import SignUpForm from "../components/SignUpForm";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

/**
 * This component toggles between sign-in and sign-up using a 'type' state.
 * It uses Tailwind to style a container with two panels and an overlay.
 */
export default function LoginPage() {
    const [type, setType] = useState("signIn");
    const { user, loading } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && user) {
          // Redirect to a protected route after successful login
          navigate("/"); // Replace with your desired route
        }
      }, [user, loading, navigate]);

  // Toggle function
  const handleOnClick = (newType) => {
    if (newType !== type) {
      setType(newType);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
      <h2 className="mb-8 text-2xl font-bold text-secondary">Denev Computers</h2>

      {/* Outer container -> fixed width/height, relative positioning for overlay, etc. */}
      <div
        className={`
          relative w-[768px] max-w-full min-h-[480px] bg-white
          flex transition-all duration-700 overflow-hidden rounded shadow-2xl
        `}
      >
        {/* -- SIGN UP FORM -- */}
        <div
          className={`
            w-1/2 p-8 flex flex-col justify-center items-center
            transition-transform duration-700
            ${type === "signUp" ? "translate-x-0" : "-translate-x-full"}
          `}
        >
          <SignUpForm />
        </div>

        {/* -- SIGN IN FORM -- */}
        <div
          className={`
            w-1/2 p-8 flex flex-col justify-center items-center
            transition-transform duration-700
            ${type === "signUp" ? "translate-x-full" : "translate-x-0"}
          `}
        >
          <SignInForm />
        </div>

        {/* -- OVERLAY -- */}
        <div
          className={`
            absolute top-0 h-full w-1/2
            ${type === "signUp" ? "left-1/2" : "left-0"}
            transition-transform duration-700
            pointer-events-none
          `}
        >
          {/* Overlay content: 2 panels that user toggles */}
          <div
            className="relative h-full w-full bg-gradient-to-br from-sky-600 to-purple-700 text-white flex items-center justify-center"
          >
            {type === "signUp" ? (
              /* If in signUp mode, show the "Welcome Back" panel (overlay-left) */
              <div className="pointer-events-auto text-center p-6">
                <h1 className="text-2xl font-bold mb-2">Имаш акаунт?</h1>
                <p className="text-sm mb-4">
                  Влез в профила си, за да продължиш да изполваш нашите услуги!
                </p>
                <button
                  className="bg-transparent border border-white text-white px-5 py-2 rounded-full hover:bg-secondary hover:text-white hover:text-pink-600 transition-colors"
                  onClick={() => handleOnClick("signIn")}
                >
                  Влез в акаунт
                </button>
              </div>
            ) : (
              /* If in signIn mode, show the "Hello, Friend" panel (overlay-right) */
              <div className="pointer-events-auto text-center p-6">
                <h1 className="text-2xl font-bold mb-2">Нямаш акаунт?</h1>
                <p className="text-sm mb-4">
                  Няма проблем! Създай собствен профил, за да изполваш по-широка гама услуги в нашата платформа.
                </p>
                <button
                  className="bg-transparent border border-white text-white px-5 py-2 rounded-full hover:bg-secondary hover:text-white transition-colors"
                  onClick={() => handleOnClick("signUp")}
                >
                  Регистрация
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
