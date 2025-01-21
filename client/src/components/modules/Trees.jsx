import React from "react";

const Trees = ({trees}) => {
    return (
        <div className="myTrees">
            <h3>My Trees</h3>
            <div className = "treeGrid">
                {trees.map((tree) => (
                    <div className = "tree-card">
                        {tree}
                    </div>)
                )
                }
            </div>
        </div>
    )
}
export default Trees;
