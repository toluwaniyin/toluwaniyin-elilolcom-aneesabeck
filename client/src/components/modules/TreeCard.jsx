import React from "react";
import { useNavigate } from "react-router-dom";

import "./TreeCard.css";

const TreeCard = (props) => {
  const navigate = useNavigate();

  const handleTreeCard = () => {
    navigate(`/tree/${props.name}`); 
  };

  return (
    <div className="tree-card-container">
      <div className="tree-card" onClick={handleTreeCard}>
      <img src={props.treeImgSrc} />
      <p>{props.name}</p>
    </div>
    <button className="delete-button" onClick={props.onDelete}>
      Delete Tree
    </button>
    </div>
    
  );
};

export default TreeCard;
