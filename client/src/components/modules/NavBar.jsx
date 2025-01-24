import React, {useContext} from "react";
import { UserContext } from "../App";
import "./NavBar.css";
import { GoogleLogin,  googleLogout} from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

const GOOGLE_CLIENT_ID = "302957686074-f03ek18k1rivju4hn5dkpd4nlap770ln.apps.googleusercontent.com";
import { Link } from "react-router-dom"
const NavBar = () => {
    const { userId, handleLogin, handleLogout } = useContext(UserContext);
    const navigate = useNavigate();
    return(
        <nav className="NavBar-container">
            <div className="NavBar-title u-inlineBlock">SkillGrow</div>
            <div className="NavBar-linkContainer u-inlineBlock">
                <Link to= "/dashboard" className = "NavBar-link u-inlineBlock">
                Dashboard
                </Link>
                <div className = "NavBar-link u-inlineBlock">
                <button
                onClick={() => {
                    googleLogout();
                    handleLogout();
                    navigate("/");
                }}
                >
                Logout
                </button>
                </div>
                
                
             </div>
        </nav>
    );
};

export default NavBar;