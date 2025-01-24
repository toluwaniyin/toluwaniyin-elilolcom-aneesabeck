import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import ProgressBar from "../modules/ProgressBar";
import { get } from "../../utilities";
import NavBar from "../modules/NavBar";

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
      <h1>Tree {<ProgressBar treeId={treeId} />}</h1>
      <h1>Tree: {treeName} </h1>
    </div>
  );
};

export default SingleTreeDetail;
