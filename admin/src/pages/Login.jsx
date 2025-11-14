import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "../context/adminContext.jsx";

const Login = () => {
  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);

  const { setAToken, backendUrl } = useContext(AdminContext);
  const navigate = useNavigate();

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setMessage(null);

    try {
      const response = await fetch(`${backendUrl}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        setAToken(data.token);
        localStorage.setItem("aToken", data.token);

        setMessage({ type: "success", text: "Login successful!" });

        // Wait briefly, then redirect
        setTimeout(() => {
          navigate("/admin/dashboard");
        }, 1000);
      } else {
        setMessage({
          type: "error",
          text: data.message || "Invalid credentials, please try again.",
        });
      }
    } catch (error) {
      console.error(error);
      setMessage({
        type: "error",
        text: "Something went wrong. Please try again later.",
      });
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-50"
    >
      <div className="bg-white shadow-2xl rounded-2xl px-8 py-10 w-[90%] max-w-md border border-gray-100">
        <p className="text-2xl font-semibold text-center text-gray-800 mb-6">
          <span className="text-blue-600">{state}</span> Login
        </p>

        {message && (
          <div
            className={`mb-4 text-center px-4 py-2 rounded-lg text-sm font-medium ${
              message.type === "success"
                ? "bg-green-100 text-green-700 border border-green-300"
                : "bg-red-100 text-red-700 border border-red-300"
            }`}
          >
            {message.text}
          </div>
        )}

        <div className="mb-4">
          <p className="text-gray-700 mb-1 font-medium">Email</p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        <div className="mb-6">
          <p className="text-gray-700 mb-1 font-medium">Password</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-all duration-300"
        >
          Login
        </button>

        <p className="text-center text-gray-600 mt-4">
          {state === "Admin" ? (
            <>
              Doctor Login{" "}
              <span
                onClick={() => setState("Doctor")}
                className="text-blue-600 hover:underline cursor-pointer font-medium"
              >
                Click here
              </span>
            </>
          ) : (
            <>
              Admin Login{" "}
              <span
                onClick={() => setState("Admin")}
                className="text-blue-600 hover:underline cursor-pointer font-medium"
              >
                Click here
              </span>
            </>
          )}
        </p>
      </div>
    </form>
  );
};

export default Login;



