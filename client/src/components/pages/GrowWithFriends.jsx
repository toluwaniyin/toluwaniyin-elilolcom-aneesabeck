import React, { useState, useEffect, useContext } from "react";
import { get } from "../../utilities";
import { UserContext } from "../App.jsx";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use"; // Helps with confetti size
import NavBar from "../modules/NavBar";

const Friends = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const userContext = useContext(UserContext);
  const { width, height } = useWindowSize(); // Get window size for confetti

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const data = await get("/api/trees/leaderboard");
        // console.log("data", data);

        for (let i = 0; i < data.length; i++) {
          const user = await get(`/api/user`, { userId: data[i].userid });
          data[i].name = user.name;
        }
        setLeaderboard(data);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      }
    };

    fetchLeaderboard();
  }, []);

  // Find logged-in user's rank
  const userRank = leaderboard.findIndex(user => user.userid === userContext.userId);

  // Trigger confetti when user enters top 3
  useEffect(() => {
    if (userRank >= 0 && userRank <= 2) {
      setShowConfetti(true); // Start confetti

      // Stop confetti after 3 seconds
      setTimeout(() => {
        setShowConfetti(false);
      }, 3000);
    }
  }, [userRank]);

  return (
    <div>
      <div className="video-background">
        <video autoPlay loop muted playsInline>
          <source src="https://i.imgur.com/Gr455X7.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <NavBar />
      <div className="flex items-center justify-center min-h-screen relative" style={{ fontFamily: "'jersey 15', sans-serif" }}  >
      {/* Confetti burst when user is in top 3 */}
      {showConfetti && <Confetti width={width} height={height} numberOfPieces={250} />}

      <div className="bg-[#D3B898] shadow-lg rounded-lg p-10 border border-[#8B5E3B] max-w-full overflow-x-auto">
  <h2 className="text-4xl font-jersey text-[#5A752F] mb-8 text-center">
    Leaderboard
  </h2>

  <div className="overflow-auto max-h-[45vh]"> {/* Scrollable container */}
    <table className="w-full border-collapse border border-[#8B5E3B] rounded-lg overflow-hidden">
      <thead>
        <tr className="bg-[#5A752F] text-white text-2xl font-jersey">
          <th className="border border-[#8B5E3B] px-8 py-4 text-center">Rank</th>
          <th className="border border-[#8B5E3B] px-8 py-4 text-left">User</th>
          <th className="border border-[#8B5E3B] px-8 py-4 text-left">🌳 Trees</th>
          <th className="border border-[#8B5E3B] px-8 py-4 text-left">🌱 Total Progress</th>
        </tr>
      </thead>
      <tbody>
        {leaderboard.map((user, index) => {
          const isCurrentUser = user.userid === userContext.userId;
          const rankDisplay =
            index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : index + 1;

          return (
            <tr
              key={index}
              className={`transition-all text-xl ${
                isCurrentUser
                  ? "bg-[#C8A97E] font-semibold shadow-md scale-[1.02]"
                  : index % 2 === 0
                  ? "bg-[#F4EDE4]"
                  : "bg-[#E2D5C4]"
              }`}
            >
              <td className="border border-[#8B5E3B] px-8 py-4 text-center font-bold">
                {rankDisplay}
              </td>
              <td className="border border-[#8B5E3B] px-8 py-4 text-2xl font-jersey font-normal">
                {user.name || "???"}
              </td>
              <td className="border border-[#8B5E3B] px-8 py-4 text-green-700 text-xl">
                {user.treeCount} 🌳
              </td>
              <td className="border border-[#8B5E3B] px-8 py-4 text-green-600 text-xl">
                {user.totalProgress}%
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
</div>

      </div>
    </div>

  );
};

export default Friends;
