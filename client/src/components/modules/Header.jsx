import React from "react";
import "./Header.css";
const Header = ({username}) => {
    return (
        <header className="dashboard-header"> 
            <h1>Welcome to {username}'s Forest... </h1>
        </header>
    );
};

export default Header