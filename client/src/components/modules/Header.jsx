import React from "react";

const Header = ({username}) => {
    return (
        <header className="dashboard-header"> 
            <h1>Welcome back {username}!</h1>
        </header>
    );
};

export default Header