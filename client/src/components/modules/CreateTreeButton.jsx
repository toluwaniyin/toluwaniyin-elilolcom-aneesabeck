import React from "react";

const CreateTreeButton = ({onClick}) => {
    const createNewTree = () => {
        ;
    }

    return(
        <button className="createTreeButton" onClick={createNewTree}>
            + Create New Tree
        </button>
    );
};

export default CreateTreeButton;
