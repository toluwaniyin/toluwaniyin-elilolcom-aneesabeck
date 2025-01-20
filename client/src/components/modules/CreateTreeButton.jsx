import React from "react";

const CreateTreeButton = ({onClick}) => {
    return(
        <button className="createTreeButton" onClick={onClick}>
            + Create New Tree
        </button>
    );
};

export default CreateTreeButton;
