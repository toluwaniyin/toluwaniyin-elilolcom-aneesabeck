import React from "react";

const Trees = ({trees}) => {
    return (
        <div className="myTrees">
            <h3>My Trees</h3>
            <div className = "treeGrid">
                {trees.map((tree) => (
                    <div className = "tree-card"> //index or id for deletion 
                        {/* <img src="treeIcon.jpg" alt="Tree Card"></img>
                        <p>{tree.name}</p> */}
                        {tree}
                        {/* <button onClick = {}></button>                        */}
                    </div>)
                ) 
                }
            </div>
        </div>
    )
}
export default Trees;