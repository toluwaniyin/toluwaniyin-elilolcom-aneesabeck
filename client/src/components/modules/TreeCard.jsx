import React from "react";
import { useNavigate } from "react-router-dom";

import "./TreeCard.css";

const TreeCard = (props) => {
  const navigate = useNavigate();

  const handleTreeCard = () => {
    navigate(`/tree/${props.treeId}`);
  };

  return (
    <div className="tree-card-container">
      <div className="tree-card" >
        <img src= "https://i.imgur.com/KwV6cm0.png" onClick={handleTreeCard}/>
        <p>{props.name}</p>
        <p>progress: {props.progress}%</p>
        <button className="delete-button" onClick={props.onDelete}>
        Delete Tree
      </button>
      </div>

    </div>
  );
};

export default TreeCard;
