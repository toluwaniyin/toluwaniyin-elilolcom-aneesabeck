import React from "react";

const handleCreateTree = (props) => {
    const addTree = (treeName) => {
        const body = { name: treeName };  // fill in body with value
        // // props.createNewTree({_id: })
        post("/api/trees", body).then((tree)=>props.createTree(tree))
    }
    return <CreateTreeButton onClick={addTree} />
}

const CreateTreeButton = (props) => {
    const [value, setValue] = useState("")

    const handleClick = (event) => {
        event.preventDefault();
        props.onClick(value);
        setValue("")
    }
    return(
        <div className = "createTreeButton"> 
        <input>
            type = "text"
            placeholder= "Enter Tree Name"
            value = {value}
            onChange = {(e) => setTree(e.target.value)}
         </input>
         
         
        <button onClick={handleClick}>
            + Create New Tree
        </button>
        </div>
        
    );
};

export default {handleCreateTree, CreateTreeButton} ;
