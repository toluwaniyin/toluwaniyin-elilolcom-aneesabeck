import React, { useState, useEffect, createContext } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./modules/NavBar";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom"; 
import "../utilities.css";

import { socket } from "../client-socket";

import { get, post } from "../utilities";

export const UserContext = createContext(null);

/**
 * Define the "App" component
 */
const App = () => {
  
  const [trees, setTrees] = useState([]);
  const [userId, setUserId] = useState(undefined);

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
      post("/api/initsocket", { socketid: socket.id });
    });
    // navigate(`/dashboard/${response.credential}`) /** */
  };

  const handleLogout = () => {
   setUserId(null);
    setTrees([]);
    post("/api/logout");
    // navigate(`/`)
  };

  const authContextValue = {
    userId, 
    handleLogin,
    handleLogout,
    trees,
    setTrees,

  };

  return (
    <div>
      <UserContext.Provider value={{ userId : userId, handleLogin, handleLogout }}>
          <NavBar />
          <Outlet />
      </UserContext.Provider>
    </div>
    
  );
};

export default App;
