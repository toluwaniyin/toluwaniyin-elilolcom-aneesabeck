import React, { useState } from "react";
import { GoogleLogin,  googleLogout} from "@react-oauth/google";
import { useNavigate } from "react-router-dom";  // If you want to redirect after login

const LoginPage = () => {
  const navigate = useNavigate();
  const { userId, handleLogin, handleLogout } = useContext(UserContext);

//   // Handle Google login success
//   const handleLoginSuccess = (response) => {
//     console.log("Login successful", response);
//     // You can send the token to your backend for authentication
//     // For now, we will simply redirect to the Dashboard
//     navigate(`/dashboard/${response.credential}`);
//   };


  return (
    <div className="login-page">
      <h1>Login Page</h1>
      <p>Welcome to SkillGrow! Please log in with your Google account.</p>
            {userId ? (
                <div className="NavBar-link u-inlineBlock">
                    <button
                    onClick={() => {
                        googleLogout();
                        handleLogout();
                    }}
                    >
                    Logout
                    </button>
                </div >
                ) : (
                    <GoogleLogin onSuccess={handleLogin} onError={(err) => console.log(err)} containerProps = {{"className":"NavBar-link NavBar-login u-inlineBlock"}}/>
                )}
    </div>
  );
};

export default LoginPage;
