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
    // console.log(treeId);
    get("/api/tree_name", { treeId: treeId }).then((tree) => {
      setTreeName(tree.name);
    });
  }, [treeId]);

  return (
    <div>
      <NavBar />
      <div className="video-background">
        <video autoPlay loop muted playsInline>
          <source src="https://i.imgur.com/Gr455X7.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
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
