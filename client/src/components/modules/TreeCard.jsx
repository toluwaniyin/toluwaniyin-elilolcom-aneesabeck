import React, {useContext} from "react";
import "./TreeCard.css"
const TreeCard = (props) => {
  return (
      <div className="tree-card">
        <img src= {props.treeImgSrc} />
        <p>{props.name}</p>
      </div>
    );
  }

export default TreeCard;
