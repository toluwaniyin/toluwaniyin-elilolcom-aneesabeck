import React from "react";

const CreateTreeButton = ({onClick}) => {
    const [treeName, setTreeName] = useState("")

    const handleCreateTree = (props) => {
        const addTree = (value) => {
            const body = {};  // fill in body with value
            post("/api/trees", body).then((tree)=>props.createNewTree(tree))
        }
        
    }

    const 
    return(
        <div className = "createTreeButton"> 
        <input>
            type = ""
            placeholder= ""
            value = {}
            onChange = {}
         </input>
         
         
        <button onClick={handleCreateTree}>
            + Create New Tree
        </button>
        </div>
        
    );
};

export default CreateTreeButton;
