import React from "react";
import "./Header.css";
const Header = ({username}) => {
    return (
        <header className="dashboard-header"> 
            <h1>Welcome to {username}'s Forest... </h1>
            <p> Click the picture of your tree or create a new tree to get started </p>
        </header>
    );
};

export default Header