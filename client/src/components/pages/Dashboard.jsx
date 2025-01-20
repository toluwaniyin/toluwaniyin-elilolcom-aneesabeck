import React, {useState} from "react";
import "./Dashboard.css";
import Header from "../modules/Header";
import Stats from "../modules/Stats";
import Trees from "../modules/Trees";
import CreateTreeButton from "../modules/CreateTreeButton";

const Dashboard = () => {
    // hardcoded data
    const userName = "Lolade";
    const [stats] = useState({streak: 0, treeNo});
    const [trees] = useState(["Tree 1", "Tree 2"]);

    return (
        <div className ="dashboard-header">
            <Header userName = {userName}></Header>
            <div className="dashboard-stats">
                <Stats stats = {stats} />
            </div>
            <div className="dashboard-trees">
                <Trees trees = {trees} /> 
            </div>
            <div className ="dashboard-button">
                <CreateTreeButton onClick = {createNewTree}/>
            </div>
        </div>
        
    );
};
