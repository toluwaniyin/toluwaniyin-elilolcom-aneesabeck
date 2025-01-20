import React from "react";

const Trees = ({trees}) => {
    return (
        <div className="myTrees">
            <h3>My Trees</h3>
            <div className = "treeGrid">
                {trees.map()}
            </div>
        </div>
    )
}