import React, { useState, useContext } from "react";
import { post } from "../../utilities";
import { UserContext } from "../App.jsx";


export const HandleCreateTree = (props) => {
    const userContext = useContext(UserContext)
  const addTree = (treeName, learningTopic) => {
    if (!treeName) {
      alert(`Enter a name for your tree`);
      return;
    }
    if (props.existingTrees.includes(treeName)) {
      alert(`Tree "${treeName}" already exists.`);
      return; // Exit early if treeName exists
    }
    const body = { name: treeName, userid: userContext.userId, progress: 0, learningTopic: learningTopic}; // fill in body with value
    // // props.createNewTree({_id: })

    post("/api/tree", body).then((tree) => props.createTree(tree));
  };
  return <CreateTreeButton onSubmit={addTree} />;
};

export const CreateTreeButton = (props) => {
  const [value, setValue] = useState("");
  const [learningTopic, setLearningTopic] = useState("");

  const handleClick = (event) => {
    console.log("buttonClicked");
    event.preventDefault();
    props.onSubmit(value, learningTopic);
    setValue("");
    setLearningTopic("");
  };
  return (
    <div className="createTreeButton">
      <input
        type="text"
        placeholder="Enter Tree Name"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      ></input>
      <input
        type="text"
        placeholder="I want to learn about..."
        value={learningTopic}
        onChange={(e) => setLearningTopic(e.target.value)}
      />

      <button onClick={handleClick}>+ Create New Tree</button>
    </div>
  );
};
