import React, { useState, useEffect, createContext } from "react";
import { Outlet } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import "../utilities.css";

import { socket } from "../client-socket";

import { get, post } from "../utilities";

import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
export const UserContext = createContext(null);
import "./App.css";

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          onComplete();
          // return 100;
        }
        return prev + 1; // Slower increment
      });
    }, 30); // Slower update interval

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="loading-screen"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // Full viewport height
        flexDirection: "column",
      }}
    >
      <div className="loading-container" style={{ textAlign: "center" }}>
        <img
          src="/growing-tree-unscreen.gif"
          style={{ maxWidth: "100%", height: "auto" }}
        />
        <div
          className="loading-bar-wrapper"
          style={{ width: "50%", margin: "20px auto" }}
        >
          <div
            className="loading-bar"
            style={{
              width: `${progress}%`,
              height: "8px",
              backgroundColor: "#4caf50",
              borderRadius: "4px",
            }}
          ></div>
        </div>
      </div>
    </motion.div>
  );
};


/**
 * Define the "App" component
 */
const App = () => {
  const [trees, setTrees] = useState([]);
  const [userId, setUserId] = useState(undefined);
  const [userName, setUserName] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        setUserId(user._id);
      }
    });
  }, []);

  const handleLogin = (credentialResponse) => {
    const userToken = credentialResponse.credential;
    const decodedCredential = jwt_decode(userToken);
    // console.log(`Logged in as ${decodedCredential.name}`);
    post("/api/login", { token: userToken }).then((user) => {
      setUserId(user._id);
      // console.log("user streak: ", user.streak);
      post("/api/initsocket", { socketid: socket.id });
    });
  };

  const handleLogout = () => {
    setUserId(null);
    setTrees([]);
    post("/api/logout");
    navigate(`/`);
  };

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  const authContextValue = {
    userId,
    handleLogin,
    handleLogout,
    trees,
    setTrees,
  };

//   return (
//     <div className="App-container">
//       <UserContext.Provider value={{ userId: userId, handleLogin, handleLogout }}>
//         <Outlet />
//       </UserContext.Provider>
//     </div>
//   );
// };

  return (
    <UserContext.Provider value={authContextValue}>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loading" onComplete={handleLoadingComplete} />
        ) : (
          <motion.div
            key="app-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Outlet />
          </motion.div>
        )}
      </AnimatePresence>
    </UserContext.Provider>
  );
};

export default App;
