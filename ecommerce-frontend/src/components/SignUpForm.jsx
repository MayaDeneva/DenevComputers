import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function SignUpForm() {
  const { register } = useContext(AuthContext); // Access the register function from context
  const [state, setState] = useState({
    fullName: "", // Add fullName to the state
    email: "",
    password: "",
  });
  const [error, setError] = useState(null); // Error state
  const [success, setSuccess] = useState(null); // Success message
  const [isSubmitting, setIsSubmitting] = useState(false); // Submission state

  const handleChange = (evt) => {
    const value = evt.target.value;
    setState((prev) => ({
      ...prev,
      [evt.target.name]: value,
    }));
  };

  const handleOnSubmit = async (evt) => {
    evt.preventDefault();
    const { fullName, email, password } = state;
    console.log("Submitting registration form:", { fullName, email, password });

    setIsSubmitting(true);
    // Attempt to register
    const result = await register(fullName, email, password); // Include fullName
    if (!result.success) {
      setError(result.message);
      setSuccess(null);
    } else {
      setError(null);
      setSuccess(result.message);
      // Optionally, redirect or perform additional actions upon successful registration
    }
    setIsSubmitting(false);
    // Clear form fields
    setState({ fullName: "", email: "", password: "" });
  };

  return (
    <div className="form-container sign-up-container w-full">
      <form onSubmit={handleOnSubmit} className="flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-4">Създай акаунт</h1>
        {/* <div className="flex space-x-2 mb-4">
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
        <span className="text-sm text-gray-500 mb-2">or use your email for registration</span> */}

        {error && <p className="text-red-500 mb-2">{error}</p>} {/* Display error message */}
        {success && <p className="text-green-500 mb-2">{success}</p>} {/* Display success message */}

        <input
          className="w-64 mb-2 px-3 py-2 border border-gray-300 rounded"
          type="text"
          name="fullName"
          placeholder="Име и фамилия"
          value={state.fullName}
          onChange={handleChange}
          required
        />
        <input
          className="w-64 mb-2 px-3 py-2 border border-gray-300 rounded"
          type="email"
          name="email"
          placeholder="Имейл"
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

        <button
          type="submit"
          disabled={isSubmitting}
          className={`bg-primary text-white px-5 py-2 rounded-full hover:bg-secondary hover:text-white transition-colors ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isSubmitting ? "Регистриране..." : "Регистрация"}
        </button>
      </form>
    </div>
  );
}

export default SignUpForm;
