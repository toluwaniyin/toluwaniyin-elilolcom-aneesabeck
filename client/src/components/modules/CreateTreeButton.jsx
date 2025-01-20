import React from "react";

const CreateTreeButton = ({onClick}) => {
    const createNewTree = () => {
        null;
    }
    return(
        <button className="createTreeButton" onClick={onClick}>
            + Create New Tree
        </button>
    );
};

export default CreateTreeButton;
