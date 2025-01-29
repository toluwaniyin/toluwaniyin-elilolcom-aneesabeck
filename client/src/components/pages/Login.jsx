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
    <div
      className="login-page"
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        background: "linear-gradient(to bottom, #87CEEB, #f0f8ff)", // Sky background
      }}
    >
      {/* Clouds GIF with infinite scrolling animation */}
      <div
        className="animated-background"
        style={{
          position: "absolute",
          width: "100%",
          height: "100vh",
          backgroundImage: "url('/field.gif')",
          backgroundSize: "cover",
          opacity: 0.7,
          backgroundRepeat: "repeat-x",
          // animation: "moveClouds 30s linear infinite",
          zIndex: 0,
        }}
      ></div>
      <h1
  style={{
    zIndex: 1,
    fontFamily: '"Berkshire Swash", serif',
    fontSize: "100px",
    color: "#4f772d",
    textAlign: "center",
    animation: "growText 1.5s ease-out forwards",
    opacity: 0, // Ensures animation starts correctly
  }}
>
  SkillGrow
</h1>

<style>
  {`
    @keyframes growText {
      0% {
        transform: scale(0);
        opacity: 0;
      }
      100% {
        transform: scale(1);
        opacity: 1;
      }
    }
  `}
</style>
      {/* Floating Login Image
      <img
        src="/loginimg.png"
        alt="Login"
        style={{
          width: "100vh", // Adjusted size
          height: "auto",
          animation: "floatUpDown 3s ease-in-out infinite",
          zIndex: 1,
        }}
      /> */}

      {/* Google Login Button */}
      <div style={{ zIndex: 1, marginTop: "20px" }}>
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      </div>

      <style>
        {`
          /* Floating animation */
          @keyframes floatUpDown {
            0% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0); }
          }

          /* Seamless cloud movement */
          @keyframes moveClouds {
            from { background-position: 0 0; }
            to { background-position: -100vw 0; }
          }
        `}
      </style>
    </div>
  );
};

export default LoginPage;
