import React, { useState, useContext } from "react";
import { post } from "../../utilities";
import { UserContext } from "../App.jsx";


export const HandleCreateTree = (props) => {
    const userContext = useContext(UserContext)
  const addTree = (treeName) => {
    if (!treeName) {
      alert(`Enter a name for your tree`);
      return;
    }
    if (props.existingTrees.includes(treeName)) {
      alert(`Tree "${treeName}" already exists.`);
      return; // Exit early if treeName exists
    }
    const body = { name: treeName, userid: userContext.userId, progress: 0 }; // fill in body with value
    // // props.createNewTree({_id: })

    post("/api/tree", body).then((tree) => props.createTree(tree));
  };
  return <CreateTreeButton onSubmit={addTree} />;
};

export const CreateTreeButton = (props) => {
  const [value, setValue] = useState("");

  const handleClick = (event) => {
    console.log("buttonClicked");
    event.preventDefault();
    props.onSubmit(value);
    setValue("");
  };
  return (
    <div className="createTreeButton">
      <input
        type="text"
        placeholder="Enter Tree Name"
        onChange={(e) => setValue(e.target.value)}
      ></input>

      <button onClick={handleClick}>+ Create New Tree</button>
    </div>
  );
};
