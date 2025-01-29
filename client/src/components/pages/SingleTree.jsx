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
        <div className="single-tree-container">
        <div className="single-tree-content">
          <h2>Grow your {treeName} Tree!</h2>
            <div className="single-tree-card">
            {/* <h2>Progress: </h2> */}
            <ProgressBar treeId={treeId} />
            
            </div>
            
        </div>
        </div>
    </div>
  );
};

export default SingleTreeDetail;
