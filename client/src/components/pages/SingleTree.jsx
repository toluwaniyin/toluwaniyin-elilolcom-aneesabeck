import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import ProgressBar from "../modules/ProgressBar";
import { get } from "../../utilities";
import NavBar from "../modules/NavBar";
import "./SingleTree.css";

const SingleTreeDetail = (props) => {
  const { treeId } = useParams();
  const [treeName, setTreeName] = useState("");

  useEffect(() => {
    console.log(treeId);
    get("/api/tree_name", { treeId: treeId }).then((tree) => {
      setTreeName(tree.name);
    });
  }, [treeId]);

  return (
    <div> 
      <NavBar />
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundImage: "url('/field (2).gif')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        opacity: 0.7,
        zIndex: -1,
      }}></div>
      <div className="single-tree-container">
        <div className="single-tree-content">
          <h2>Grow your {treeName} tree!</h2>
          {/* <div className="single-tree-card"> */}
            <ProgressBar treeId={treeId} />
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default SingleTreeDetail;
