import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import Header from "../modules/Header.jsx";
import Stats from "../modules/Stats.jsx";
import TreeCard from "../modules/TreeCard.jsx";
import {HandleCreateTree} from "../modules/CreateTreeButton";

import { get, post, del } from "../../utilities";


const Dashboard = () => {
  // hardcoded data
  const userName = "Lolade";
  const [streak, setStreak] = useState(0);
  const [treeNo, settreeNo] = useState(0);
  const [trees, setTrees] = useState([]);

  //GET streaks
  useEffect(() => {
    get("/api/user").then((userResponse) => {
      let streak = userResponse.streak;
      setStreak(streak);
    });
  }, []);

  //POST streaks - automatic on component load
  useEffect(() => {
    post("/api/streak", {}).then((updatedStreakResponse) => {
      setStreak(updatedStreakResponse);
    });
  }, []);

  // GET treeNo

  //POST treeNo
  //needs create new tree button

  // GET trees
  useEffect(() => {
    get("/api/tree").then((treesResponse) => {
      //list trees in reverse order
      let reversedTreeObjs = treesResponse.reverse();
      setTrees(reversedTreeObjs);
    });
  }, []);

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
        treeImgSrc={treeObj.image}
        onDelete={() => deleteTree(treeObj._id)}
      />
    ));
  }

  //POST trees
  //gets called when create new tree is hit to add to screen
  const createNewTree = (tree) => {
    setTrees([...trees, tree]);
  };


  return (
    <div className = "dashboard-container">
      <HandleCreateTree existingTrees={trees.map(tree => tree.name)} createTree={createNewTree} />
      <Header />
      <div className = "trees-section">
        <h1> My Trees </h1>
        {hasTrees ? <div className = "trees-grid">{treesList}</div> : <p>No trees available.</p>}
        </div>
        <div className = "stats-section"> 
        <h1>My Stats</h1>
        <h3>Your streak is {streak}</h3>
        </div>
      
    </div>
  );
};

export default Dashboard;
