import React from "react";
import "./Stats.css";

const Stats = ({ stats }) => {
    return(
        <div className = "StatsContainer"> 
            <p>Your current streak is {stats.streak} days</p>
            <p>You have {stats.treeNo} trees</p>
        </div>
    );
};

export default Stats;
