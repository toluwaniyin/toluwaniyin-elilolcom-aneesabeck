import React from "react";

const Header = ({username}) => {
    return (
        <header className="dashboard-header"> 
            <h1>{username != "" ? `Welcome back ${username}` : "Welcome"}!</h1>
        </header>
    );
};

export default Header