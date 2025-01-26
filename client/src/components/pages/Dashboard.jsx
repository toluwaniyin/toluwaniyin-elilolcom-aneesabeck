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
  //const [treeNo, settreeNo] = useState(0);
  const [trees, setTrees] = useState([]);
  console.log("user", userContext.userId)

  //GET streaks
  useEffect(() => {
    console.log("useEffect is running!");
    // if (!name) {
    //     console.error("Name parameter is missing in the URL.");
    //     return; // Skip the request if the name is undefined
    //   }
    console.log("userid:", userContext.userId);
    if (userContext.userId){
        get("/api/user",{userId: userContext.userId}).then((userResponse) => {

            if (userResponse) {
              setUser(userResponse)
              // console.log("User Name:", userResponse.name)

              // let streak = userResponse.streak;
              // setStreak(streak);

              // setUserName(userResponse.name);
            }

          }).catch((err) => {
              console.error("Error fetching user:", err);
          });
    }
  }, [userContext.userId]);

  //POST streaks - automatic on component load
//   useEffect(() => {
//     post("/api/streak", {}).then((updatedStreakResponse) => {
//       setStreak(updatedStreakResponse);
//     });
//   }, []);

  // GET treeNo

  //POST treeNo
  //needs create new tree button

  // GET trees
  useEffect(() => {
    if (userContext.userId) {
        console.log("Fetching trees for user:", userContext.userId);

    console.log("user", userContext.userId)
        get(`/api/tree?userid=${userContext.userId}`).then((treesResponse) => {
            //list trees in reverse order
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

  let treesList = null;
  const hasTrees = trees.length !== 0;
  if (hasTrees) {
    //not sure what TreeCard is doing here
    treesList = trees.map((treeObj) => (

      <TreeCard
        key={`TreeCard_${treeObj._id}`}
        name={treeObj.name}
        treeId={treeObj._id}
        progress={treeObj.progress}
        treeImgSrc={treeObj.image}
        onDelete={() => deleteTree(treeObj._id)}
        userId= {treeObj.userid}
      />

    ));
  }
  
  //POST trees
  //gets called when create new tree is hit to add to screen
  const createNewTree = (tree) => {
    setTrees([...trees, tree]);
  };

  return (
    <div>
      <NavBar />
    <div className = "dashboard-container">

        <div className="create-tree-button">
        <HandleCreateTree existingTrees={trees.map(tree => tree.name)} createTree={createNewTree} />
        </div>

      {(userContext.userId != null) && user && <Header username = {user.name}/>}
      <div className = "trees-section">
        <h1> My Trees </h1>
        {hasTrees ? <div className="trees-grid">{treesList}</div> : <p>No trees available.</p>}
      </div>
      <div className="stats-section">
        <h1>My Stats</h1>
        <h3>Your streak is {streak}</h3>
      </div>
    </div>
    </div>

  );
};

export default Dashboard;
