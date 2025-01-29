import React, { useState, useEffect, createContext } from "react";
import { Outlet } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import "../utilities.css";

import { socket } from "../client-socket";

import { get, post } from "../utilities";

import { AnimatePresence } from "framer-motion";

export const UserContext = createContext(null);
import "./App.css";

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          onComplete(); // Notify App that loading is complete
        }
        return prev + 1;
      });
    }, 30); // Adjust the speed of the progress bar
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="loading-screen"
    >
      <div className="loading-container">
        <img
          src="/loadingtree.gif"
          style={{ display: "block", marginLeft: "auto", marginRight: "auto" }}
        />
        <div className="loading-bar-wrapper" style={{ marginLeft: 400, marginRight: 400 }}>
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
    console.log(`Logged in as ${decodedCredential.name}`);
    post("/api/login", { token: userToken }).then((user) => {
      setUserId(user._id);
      console.log("user streak: ", user.streak);
      post("/api/initsocket", { socketid: socket.id });
    });
  };

  const handleLogout = () => {
    setUserId(null);
    setTrees([]);
    post("/api/logout");
    navigate(`/`);
  };

  const authContextValue = {
    userId,
    handleLogin,
    handleLogout,
    trees,
    setTrees,
  };

  return (
    <div className="App-container">
      <UserContext.Provider value={{ userId: userId, handleLogin, handleLogout }}>
        <Outlet />
      </UserContext.Provider>
    </div>
  );
};

//   return (
//     <UserContext.Provider value={authContextValue}>
//       <AnimatePresence mode="wait">
//         {isLoading ? (
//           <LoadingScreen key="loading" onComplete={handleLoadingComplete} />
//         ) : (
//           <motion.div
//             key="app-content"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//           >
//             <Outlet />
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </UserContext.Provider>
//   );
// };

export default App;
