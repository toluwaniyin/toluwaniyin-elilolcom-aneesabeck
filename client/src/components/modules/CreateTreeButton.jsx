import React, { useState, useContext } from "react";
import { post } from "../../utilities";
import { UserContext } from "../App.jsx";

export const HandleCreateTree = (props) => {
  const userContext = useContext(UserContext);
  const addTree = (treeName, learningTopic, customText) => {
    if (!treeName) {
      alert(`Enter a name for your tree`);
      return;
    }
    if (props.existingTrees.includes(treeName)) {
      alert(`Tree "${treeName}" already exists.`);
      return; // Exit early if treeName exists
    }
    const body = {
      name: treeName,
      userid: userContext.userId,
      progress: 0,
      learningTopic: learningTopic,
      customText: customText,
      username: userContext.username,
    }; // fill in body with value
    // // props.createNewTree({_id: })

    post("/api/tree", body).then((tree) => props.createTree(tree));
  };
  console.log("UserContext:", userContext);

  return <CreateTreeButton onSubmit={addTree} />;
};

export const CreateTreeButton = (props) => {
  const [value, setValue] = useState("");
  const [learningTopic, setLearningTopic] = useState("");
  const [customText, setCustomText] = useState("");
  const [inputType, setInputType] = useState("learningTopic");

  const handleClick = (event) => {
    console.log("buttonClicked");
    event.preventDefault();
    props.onSubmit(value, learningTopic, customText);
    setValue("");
    setLearningTopic("");
    setCustomText("");
  };
  return (
    <div className="createTreeButton">
      <input
        type="text"
        placeholder="Enter Tree Name"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      ></input>
      <div>
        <label>
          <input
            type="radio"
            value="learningTopic"
            checked={inputType === "learningTopic"}
            onChange={() => setInputType("learningTopic")}
          />
          AI Learning
        </label>
        <label>
          <input
            type="radio"
            value="customText"
            checked={inputType === "customText"}
            onChange={() => setInputType("customText")}
          />
          Custom Text
        </label>
      </div>
      {inputType === "learningTopic" && (
        <input
          type="text"
          placeholder="What do you want to learn?"
          value={learningTopic}
          onChange={(e) => setLearningTopic(e.target.value)}
        />
      )}
      {inputType === "customText" && (
        <textarea
          placeholder="Enter your custom text"
          value={customText}
          onChange={(e) => setCustomText(e.target.value)}
        />
      )}
      <button onClick={handleClick}>+ Create New Tree</button>
    </div>
  );
};
