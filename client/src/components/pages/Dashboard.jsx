import React, { useState, useEffect, useContext } from "react";
import "./Dashboard.css";
import Header from "../modules/Header.jsx";
import TreeCard from "../modules/TreeCard.jsx";
import { HandleCreateTree } from "../modules/CreateTreeButton";
import { UserContext } from "../App.jsx";
import { get, post, del } from "../../utilities";
import NavBar from "../modules/NavBar.jsx";

const Dashboard = () => {
  const userContext = useContext(UserContext);

  // hardcoded data
  const [user, setUser] = useState(undefined); //**** */
  const [streak, setStreak] = useState(0);
  const [trees, setTrees] = useState([]);

  // console.log("user", userContext.userId);

  // GET streaks
  useEffect(() => {
    // console.log("useEffect is running!");
    // console.log("userid:", userContext.userId);
    if (userContext.userId) {
      get("/api/user", { userId: userContext.userId })
        .then((userResponse) => {
          if (userResponse) {
            setUser(userResponse);
            // console.log("User Name:", userResponse.name);

            let streak = userResponse.streak;
            setStreak(streak);
          }
        })
        .catch((err) => {
          console.error("Error fetching user:", err);
        });
    }
  }, [userContext.userId]);

  // GET trees
  useEffect(() => {
    if (userContext.userId) {
      // console.log("Fetching trees for user:", userContext.userId);

      get(`/api/tree?userid=${userContext.userId}`).then((treesResponse) => {
        let reversedTreeObjs = treesResponse.reverse();
        setTrees(reversedTreeObjs);
      });
    }
  }, [userContext.userId]);

  // DELETE trees
  const deleteTree = (treeId) => {
    del(`/api/tree/${treeId}`).then(() => {
      // Update the local state after successful deletion
      setTrees(trees.filter((tree) => tree._id !== treeId));
    });
  };

  // Create treesList component
  let treesList = null;
  const hasTrees = trees.length !== 0;
  if (hasTrees) {
    treesList = trees.map((treeObj) => (
      <TreeCard
        key={`TreeCard_${treeObj._id}`}
        name={treeObj.name}
        treeId={treeObj._id}
        progress={treeObj.progress}
        treeImgSrc={treeObj.image}
        onDelete={() => deleteTree(treeObj._id)}
        userId={treeObj.userid}
      />
    ));
  }

  // Create new tree
  // const createNewTree = (tree) => {
  //   const newTreeObject = {
  //     _id: tree._id,
  //     name: tree.name,
  //     image: tree.image,
  //     progress: tree.progress || 0,
  //   };

  //   setTrees([...trees, newTreeObject]);
  // };

  // import TreeCard from "./TreeCard"; // Ensure this is imported

const createNewTree = (tree) => {
  setTrees([...trees, tree]);
};


  return (
    <div style={{ width: "100%", height: "100vh", position: "relative" }}>
    <div className="video-background">
      <video autoPlay loop muted playsInline>
        <source src="https://i.imgur.com/Gr455X7.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
      <NavBar />
      <div className="dashboard-all-container">
        <div className="header">
          {userContext.userId != null && user && <Header username={user.name} />}
        </div>

        <div className="dashboard-content">
          <div className="create-tree-section">
            <div className="streak-box">
              Streak: {streak} day{streak !== 1 ? "s" : ""}
            </div>
            <div className="create-tree-button">
              <HandleCreateTree
                existingTrees={trees.map((tree) => tree.name)}
                createTree={createNewTree}
              />
            </div>
          </div>

          <div className="trees-section">
            {hasTrees ? <div className="trees-grid">{treesList}</div> : <p>No trees available.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

// import React, { useState, useEffect, useContext } from "react";
// import "./Dashboard.css";
// import Header from "../modules/Header.jsx";
// import TreeCard from "../modules/TreeCard.jsx";
// import { HandleCreateTree } from "../modules/CreateTreeButton";
// import { UserContext } from "../App.jsx";
// import { get, post, del } from "../../utilities";
// import NavBar from "../modules/NavBar.jsx";

// const Dashboard = () => {
//   const userContext = useContext(UserContext);

//   // State variables
//   const [user, setUser] = useState(undefined);
//   const [streak, setStreak] = useState(0);
//   const [trees, setTrees] = useState([]);
//   const [loading, setLoading] = useState(true); // <-- Add loading state

//   console.log("user", userContext.userId);

//   // GET user and streak
//   useEffect(() => {
//     console.log("useEffect is running!");
//     console.log("userid:", userContext.userId);
//     if (userContext.userId) {
//       get("/api/user", { userId: userContext.userId })
//         .then((userResponse) => {
//           if (userResponse) {
//             setUser(userResponse);
//             console.log("User Name:", userResponse.name);
//             setStreak(userResponse.streak);
//           }
//         })
//         .catch((err) => {
//           console.error("Error fetching user:", err);
//         });
//     }
//   }, [userContext.userId]);

//   // GET trees
//   useEffect(() => {
//     if (userContext.userId) {
//       console.log("Fetching trees for user:", userContext.userId);
//       get(`/api/tree?userid=${userContext.userId}`)
//         .then((treesResponse) => {
//           let reversedTreeObjs = treesResponse.reverse();
//           setTrees(reversedTreeObjs);
//         })
//         .catch((err) => console.error("Error fetching trees:", err))
//         .finally(() => setLoading(false)); // <-- Set loading to false when done
//     }
//   }, [userContext.userId]);

//   // DELETE trees
//   const deleteTree = (treeId) => {
//     del(`/api/tree/${treeId}`).then(() => {
//       setTrees(trees.filter((tree) => tree._id !== treeId));
//     });
//   };

//   // Create new tree
//   // const createNewTree = (tree) => {
//   //   setTrees((prevTrees) => {
//   //     const updatedTrees = [...prevTrees, tree];
//   //     console.log("Updated Trees:", updatedTrees);
//   //     return [...updatedTrees]; // Force a new reference
//   //   });
//   // };

//   const createNewTree = (tree) => {
//     setTrees((prevTrees) => {
//       const updatedTrees = [...prevTrees, { ...tree }];
//       console.log("Updated Trees:", updatedTrees);
//       return updatedTrees; // Ensure React recognizes a fresh state update
//     });
//   };

//   // Render tree list
//   let treesList = null;
//   const hasTrees = trees.length !== 0;
//   if (hasTrees) {
//     treesList = trees.map((treeObj) => (
//       <TreeCard
//         key={`TreeCard_${treeObj._id}`}
//         name={treeObj.name}
//         treeId={treeObj._id}
//         progress={treeObj.progress}
//         treeImgSrc={treeObj.image}
//         onDelete={() => deleteTree(treeObj._id)}
//         userId={treeObj.userid}
//       />
//     ));
//   }

//   // Show a loading indicator while data is being fetched
//   if (loading || (userContext.userId && trees.length === 0)) {
//     return (
//       <div className="loading-container">
//         <p>Loading trees...</p>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <div
//         className="background-image"
//         style={{
//           position: "fixed",
//           top: 0,
//           left: 0,
//           width: "100%",
//           height: "100%",
//           backgroundImage: "url('/field (2).gif')",
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           opacity: 0.7,
//           zIndex: -1,
//         }}
//       ></div>
//       <NavBar />
//       <div className="dashboard-all-container">
//         <div className="header">
//           {userContext.userId != null && user && <Header username={user.name} />}
//         </div>

//         <div className="dashboard-content">
//           <div className="create-tree-section">
//             <div className="streak-box">
//               Streak: {streak} day{streak !== 1 ? "s" : ""}
//             </div>
//             <div className="create-tree-button">
//               <HandleCreateTree
//                 existingTrees={trees.map((tree) => tree.name)}
//                 createTree={createNewTree}
//               />
//             </div>
//           </div>

//           <div className="trees-section">
//             {hasTrees ? <div className="trees-grid">{treesList}</div> : <p>No trees available.</p>}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
