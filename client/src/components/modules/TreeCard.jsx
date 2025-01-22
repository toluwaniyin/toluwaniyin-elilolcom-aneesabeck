import React, {useContext} from "react";
import "./TreeCard.css"
const TreeCard = (props) => {
  return (
<<<<<<< HEAD
      <div className="tree-card">
        <img src= {props.treeImgSrc} />
        <p>{props.name}</p>
      </div>
    );
  }
=======
    <div className="Card-container">
      <img src={props.treeImgSrc} />
      <p>{props.name}</p>
    </div>
  );
};
>>>>>>> fd1722c9ae1bfe8d5eebc7259acbcd39c5482757

export default TreeCard;
