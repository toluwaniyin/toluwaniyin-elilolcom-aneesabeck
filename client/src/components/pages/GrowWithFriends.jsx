// import React, { useState, useEffect,  useContext } from "react";
// import { get } from "../../utilities";
// import { UserContext } from "../App.jsx";

// // GET request for leaderboard
// const Friends = () => {
//   const [leaderboard, setLeaderboard] = useState([]);
//   const userContext = useContext(UserContext);
//   console.log("user check", userContext.userId);

//   useEffect(() => {
//     const fetchLeaderboard = async () => {
//       try {
//         const data = await get("/api/trees/leaderboard");
//         console.log("data", data);

//         for (let i = 0; i < data.length; i++) {
//           const user = await get(`/api/user`, { userId: data[i].userid });
//           data[i].name = user.name;
//         }
//         setLeaderboard(data);
//       } catch (error) {
//         console.error("Error fetching leaderboard:", error);
//       }
//     };

//     fetchLeaderboard();
//   }, []);

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-green-50">
//       <div className="p-8 max-w-4xl w-full bg-gradient-to-b from-green-50 to-green-100 rounded-xl shadow-md">
//         <h1 className="text-4xl font-extrabold text-green-800 mb-6 text-center">
//           🌿 Community Leaderboard 🌿
//         </h1>

//         <div className="bg-white shadow-lg rounded-lg p-6 border border-green-200">
//           <h2 className="text-2xl font-semibold text-green-700 mb-4 text-center">Leaderboard</h2>

//           <table className="w-full border-collapse border border-green-300 rounded-lg overflow-hidden">
//             <thead>
//               <tr className="bg-green-700 text-white">
//                 <th className="border border-green-300 px-4 py-2 text-left">Rank</th>
//                 <th className="border border-green-300 px-4 py-2 text-left">User</th>
//                 <th className="border border-green-300 px-4 py-2 text-left">🌳 Trees</th>
//                 <th className="border border-green-300 px-4 py-2 text-left">🌱 Total Progress</th>
//               </tr>
//             </thead>
//             <tbody>
//               {leaderboard.map((user, index) => (
//                 <tr key={index} className={index % 2 === 0 ? "bg-green-50" : "bg-green-100"}>
//                   <td className="border border-green-300 px-4 py-2 font-semibold">{index + 1}</td>
//                   <td className="border border-green-300 px-4 py-2">{user.name || "???"}</td>
//                   <td className="border border-green-300 px-4 py-2 font-bold text-green-700">
//                     {user.treeCount} 🌳
//                   </td>
//                   <td className="border border-green-300 px-4 py-2 font-bold text-green-600">
//                     {user.totalProgress}%
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Friends;


import React, { useState, useEffect, useContext } from "react";
import { get } from "../../utilities";
import { UserContext } from "../App.jsx";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use"; // Helps with confetti size
import NavBar from "../modules/NavBar.jsx";

const Friends = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const userContext = useContext(UserContext);
  const { width, height } = useWindowSize(); // Get window size for confetti

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const data = await get("/api/trees/leaderboard");
        console.log("data", data);

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
        <NavBar />
    <div className="flex items-center justify-center min-h-screen bg-[#DED0BA] relative">
      {/* Confetti burst when user is in top 3 */}
      {showConfetti && <Confetti width={width} height={height} numberOfPieces={250} />}

      <div className="p-12 max-w-6xl w-full bg-[#F4EDE4] rounded-xl shadow-lg">
        <h1 className="text-6xl font-extrabold text-[#5A752F] mb-10 text-center">
          🌿 Community Leaderboard 🌿
        </h1>

        <div className="bg-[#D3B898] shadow-lg rounded-lg p-10 border border-[#8B5E3B]">
          <h2 className="text-4xl font-bold text-[#5A752F] mb-8 text-center">Leaderboard</h2>

          <table className="w-full border-collapse border border-[#8B5E3B] rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-[#5A752F] text-white text-2xl font-bold">
                <th className="border border-[#8B5E3B] px-8 py-4 text-center">Rank</th>
                <th className="border border-[#8B5E3B] px-8 py-4 text-left">User</th>
                <th className="border border-[#8B5E3B] px-8 py-4 text-left">🌳 Trees</th>
                <th className="border border-[#8B5E3B] px-8 py-4 text-left">🌱 Total Progress</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((user, index) => {
                const isCurrentUser = user.userid === userContext.userId;

                // Replace ranks 1, 2, 3 with medals
                const rankDisplay =
                  index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : index + 1;

                return (
                  <tr
                    key={index}
                    className={`transition-all text-xl ${
                      isCurrentUser
                        ? "bg-[#C8A97E] font-semibold shadow-md scale-[1.02]" // Highlight current user
                        : index % 2 === 0
                        ? "bg-[#F4EDE4]"
                        : "bg-[#E2D5C4]"
                    }`}
                  >
                    <td className="border border-[#8B5E3B] px-8 py-4 text-center font-bold">
                      {rankDisplay}
                    </td>
                    <td className="border border-[#8B5E3B] px-8 py-4 text-2xl font-bold">{user.name || "???"}</td>
                    <td className="border border-[#8B5E3B] px-8 py-4 text-green-700 text-xl">{user.treeCount} 🌳</td>
                    <td className="border border-[#8B5E3B] px-8 py-4 text-green-600 text-xl">{user.totalProgress}%</td>
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

