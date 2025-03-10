// src/components/SignInForm.jsx
import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function SignInForm() {
  const { login } = useContext(AuthContext); // Access the login function from context
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null); // Error state

  const handleChange = (evt) => {
    const value = evt.target.value;
    setState((prev) => ({
      ...prev,
      [evt.target.name]: value,
    }));
  };

  const handleOnSubmit = async (evt) => {
    evt.preventDefault();
    const { email, password } = state;

    // Attempt to login
    const result = await login(email, password);
    if (!result.success) {
      setError(result.message);
    } else {
      setError(null);
      // Redirect or perform additional actions upon successful login
    }

    // Clear form fields
    setState({ email: "", password: "" });
  };

  return (
    <div className="form-container sign-in-container w-full">
      <form onSubmit={handleOnSubmit} className="flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-4">Вход в акаунт</h1>

        {/* Social icons or placeholders
        <div className="flex space-x-2 mb-4">
          <a href="#" className="w-8 h-8 flex items-center justify-center border border-gray-400 rounded-full">
            <i className="fab fa-facebook-f" />
          </a>
          <a href="#" className="w-8 h-8 flex items-center justify-center border border-gray-400 rounded-full">
            <i className="fab fa-google-plus-g" />
          </a>
          <a href="#" className="w-8 h-8 flex items-center justify-center border border-gray-400 rounded-full">
            <i className="fab fa-linkedin-in" />
          </a>
        </div>

        <span className="text-sm text-gray-500 mb-2">or use your account</span> */}

        {error && <p className="text-red-500 mb-2">{error}</p>} {/* Display error message */}

        <input
          className="w-64 mb-2 px-3 py-2 border border-gray-300 rounded"
          type="email"
          placeholder="Имейл"
          name="email"
          value={state.email}
          onChange={handleChange}
          required
        />
        <input
          className="w-64 mb-2 px-3 py-2 border border-gray-300 rounded"
          type="password"
          name="password"
          placeholder="Парола"
          value={state.password}
          onChange={handleChange}
          required
        />
        <a href="#" className="text-sm text-blue-500 mb-4">
         Забравена парола?
        </a>

        <button
          type="submit"
          className="bg-primary text-white px-5 py-2 rounded-full hover:bg-secondary hover:text-white transition-colors"
        >
          Влизане
        </button>
      </form>
    </div>
  );
}

export default SignInForm;
