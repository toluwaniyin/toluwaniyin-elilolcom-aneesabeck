const GrowWithFriends = () => {
import React, { useState, useEffect, useContext } from "react";
import { get } from "../../utilities";
import { UserContext } from "../App.jsx";
import NavBar from "../modules/NavBar.jsx";

//GET request for leaderboard
const Friends = () => {
    const [leaderboard, setLeaderboard] = useState([]);

    useEffect(() => {
      const fetchLeaderboard = async () => {
        try {
          const data = await get("/api/trees/leaderboard");
          setLeaderboard(data);
        } catch (error) {
          console.error("Error fetching leaderboard:", error);
        }
      };

      fetchLeaderboard();
    }, []);

  return (
    <div>
      <NavBar />
      <h1>Grow With Friends</h1>
      <p>
        Grow with friends is a feature that allows you to connect with other users and share your
        progress with them. You can see what your friends are up to and even compare your progress
        with theirs.
      </p>
    </div>
  );
};

export default GrowWithFriends;
