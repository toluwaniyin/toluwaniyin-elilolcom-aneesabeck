import React, { useContext } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App.jsx";
import "./Login.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const { handleLogin } = useContext(UserContext);

  const handleLoginSuccess = (credentialResponse) => {
    handleLogin(credentialResponse);
    navigate(`/dashboard`);
  };

  return (
    <div className="login-page">
      {/* Full-screen container */}
      <div className="video-background">
        <video autoPlay loop muted playsInline>
          <source src="https://i.imgur.com/Gr455X7.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="login-content">
        {/* SkillGrow title */}
        <h1 className="login-title">SkillGrow</h1>

        {/* Google Login Button */}
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={() => {
            console.log("Login Failed");
          }}
          className="google-login-button"
        />
      </div>
    // </div>
  );
};

export default LoginPage;
