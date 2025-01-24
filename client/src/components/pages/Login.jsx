import React, { useContext } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App.jsx";

const LoginPage = () => {
  const navigate = useNavigate();
  const { handleLogin } = useContext(UserContext);

  const handleLoginSuccess = (credentialResponse) => {
    handleLogin(credentialResponse);
    navigate(`/dashboard`);
    console.log("Login Success");
  };

  return (
    <div className="login-page">
      <h1>Welcome to SkillGrow! Please log in with your Google account.</h1>
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </div>
  );
};

export default LoginPage;
