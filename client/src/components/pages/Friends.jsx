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
    <div className="p-8 max-w-4xl mx-auto">
      <NavBar />
      <h1 className="text-4xl font-bold mb-8 text-center">Community Leaderboard</h1>

      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-6 text-center">Leaderboard</h2>
        <table className="min-w-full table-auto border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left">Rank</th>
              <th className="border border-gray-300 px-4 py-2 text-left">User ID</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Trees</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Total Progress</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((user, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                <td className="border border-gray-300 px-4 py-2">{user.userid}</td>
                <td className="border border-gray-300 px-4 py-2">{user.treeCount}</td>
                <td className="border border-gray-300 px-4 py-2">{user.totalProgress}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Friends;
