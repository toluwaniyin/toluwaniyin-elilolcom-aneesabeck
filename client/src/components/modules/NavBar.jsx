import React, {useContext} from "react";
import { UserContext } from "../App";
import "./NavBar.css";
import { GoogleLogin,  googleLogout} from "@react-oauth/google";
const GOOGLE_CLIENT_ID = "302957686074-f03ek18k1rivju4hn5dkpd4nlap770ln.apps.googleusercontent.com";
import { Link } from "react-router-dom"
const NavBar = () => {
    const { userId, handleLogin, handleLogout } = useContext(UserContext);
    return(
        <nav className="NavBar-container">
            <div className="NavBar-title">SkillGrow</div>
            <div className="NavBar-linkContainer u-inlineBlock">
                <Link to="/" className = "NavBar-link">
                Dashboard
                </Link>
                {userId ? (
                <div>
                    <button
                    onClick={() => {
                        googleLogout();
                        handleLogout();
                    }}
                    >
                    Logout
                    </button>
                </div>
                ) : (
                    <GoogleLogin onSuccess={handleLogin} onError={(err) => console.log(err)} />
                )}
             </div>
        </nav>
    );
};

export default NavBar;