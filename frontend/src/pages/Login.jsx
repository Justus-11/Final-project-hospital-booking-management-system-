import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [state, setState] = useState("Sign Up");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");

  // Eye toggle states
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (state === "Sign Up" && password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log({ name, email, password });
    // Later: API call to backend
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-blue-100 to-white px-4 py-10">
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8 border border-gray-100"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-3xl font-bold text-blue-600">
            {state === "Sign Up" ? "Create Account" : "Welcome Back"}
          </p>
          <p className="text-gray-500 mt-2">
            {state === "Sign Up"
              ? "Please sign up to book your appointment"
              : "Login to continue booking your appointments"}
          </p>
        </div>

        {/* Full Name */}
        {state === "Sign Up" && (
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>
        )}

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        {/* Password */}
        <div className="mb-4 relative">
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            className="w-full px-4 py-3 pr-10 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          <span
            className="absolute right-3 top-10 text-gray-500 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        {/* Confirm Password (only for Sign Up) */}
        {state === "Sign Up" && (
          <div className="mb-6 relative">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Confirm Password
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              required
              className="w-full px-4 py-3 pr-10 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
            <span
              className="absolute right-3 top-10 text-gray-500 cursor-pointer"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          {state === "Sign Up" ? "Create Account" : "Login"}
        </button>

        {/* Toggle State */}
        <p className="text-center text-sm text-gray-600 mt-6">
          {state === "Sign Up" ? (
            <>
              Already have an account?{" "}
              <span
                className="text-blue-600 font-medium cursor-pointer hover:underline"
                onClick={() => setState("Login")}
              >
                Login
              </span>
            </>
          ) : (
            <>
              Don’t have an account?{" "}
              <span
                className="text-blue-600 font-medium cursor-pointer hover:underline"
                onClick={() => setState("Sign Up")}
              >
                Sign Up
              </span>
            </>
          )}
        </p>
      </form>
    </div>
  );
};

export default Login;