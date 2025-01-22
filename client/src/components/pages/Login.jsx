import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";  // If you want to redirect after login

const LoginPage = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Handle Google login success
  const handleLoginSuccess = (response) => {
    console.log("Login successful", response);
    // You can send the token to your backend for authentication
    // For now, we will simply redirect to the Dashboard
    navigate(`/dashboard/${response.credential}`);
  };

  // Handle Google login failure
  const handleLoginFailure = (error) => {
    console.error("Login failed", error);
    setError("Login failed. Please try again.");
  };

  return (
    <div className="login-page">
      <h1>Login Page</h1>
      <p>Welcome to SkillGrow! Please log in with your Google account.</p>

      {/* Google Login Button */}
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={handleLoginFailure}
      />

      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default LoginPage;
