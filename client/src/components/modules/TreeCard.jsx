import React from "react";
import { useNavigate } from "react-router-dom";

import "./TreeCard.css";

const TreeCard = (props) => {
  const navigate = useNavigate();

  const handleTreeCard = () => {
    navigate(`/tree/${props.name}`); 
  };

  return (
    <div className="tree-card" onClick={handleTreeCard}>
      <img src={props.treeImgSrc} alt={props.name} />
      <p>{props.name}</p>
    </div>
  );
};

export default TreeCard;
