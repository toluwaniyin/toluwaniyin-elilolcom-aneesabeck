import React, {useState, useEffect} from "react";
import "./Dashboard.css";
import Header from "../modules/Header.jsx";
import Stats from "../modules/Stats.jsx";
import Trees from "../modules/Trees.jsx";
import CreateTreeButton from "../modules/CreateTreeButton";

const Dashboard = () => {
    // hardcoded data
    const userName = "Lolade";
    const [streak, setStreak] = useState(0);
    const [treeNo, settreeNo] = useState(0);
    const [trees, setTrees] = useState([]);

    }
    //GET streaks
    useEffect (() =>{
        get("/api/streak").then((streakResponse) => {
            //do i need streakResponse.currentStreak?
            let streak = streakResponse;
            setStreak(streak)
        });
    }, []);

    //POST streaks - automatic on component load
    useEffect(() => {
        post("/api/streak", {}).then((updatedStreakResponse) => {
            setStreak(updatedStreakResponse);
        });
    }, []);

    // GET treeNo


    //POST treeNo
    //needs create new tree button


    // GET trees
    useEffect (() => {
        get("/api/trees").then((treesResponse) => {
            //list trees in reverse order
            let reversedTreeObjs = treesResponse.reverse();
            setTrees(reversedTreeObjs);
        });
    }, []);

    let treesList = null;
    const hasTrees = trees.length !== 0;
    if (hasTrees) {
        //not sure what TreeCard is doing here
        treesList = trees.map((treeObj) => (
            <TreeCard
                key={`TreeCard_${treeObj._id}`}
                //tree_name ??
                name = {treeObj.name}
            />
        )
    )
    }

    //POST trees
    //gets called when create new tree is hit to add to screen
    const createNewTree = (tree) => {
            setTrees([...trees, tree]);
        };

    return (
        <div>
            <handleCreateTree createTree = {createNewTree}/>
            <Header />
            <div>
                {hasTrees ? (
                    <div>{treesList}</div>
                ) : (
                    <p>No trees available.</p>
                )}
            </div>
            <h1>Your streak is {streak}</h1>
        </div>
    );
};

export default Dashboard;
