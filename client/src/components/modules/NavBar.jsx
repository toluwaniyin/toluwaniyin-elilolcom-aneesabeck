import React from "react";
import "./NavBar.css";
import { GoogleLogin, GoogleLogout } from "@react-oauth/google";
const GOOGLE_CLIENT_ID = "302957686074-f03ek18k1rivju4hn5dkpd4nlap770ln.apps.googleusercontent.com";

const NavBar = () => {
    return(
        <nav className="NavBar-container">
            <div className="NavBar-title">SkillGrow</div>
            <div className="NavBar-linkContainer u-inlineBlock">
                {props.userId ? (
            <GoogleLogout
                clientId={GOOGLE_CLIENT_ID}
                buttonText="Logout"
                onLogoutSuccess={props.handleLogout}
                onFailure={(err) => console.log(err)}
                className="NavBar-link NavBar-login"
            />
            ) : (
            <GoogleLogin
                clientId={GOOGLE_CLIENT_ID}
                buttonText="Login"
                onSuccess={props.handleLogin}
                onFailure={(err) => console.log(err)}
                className="NavBar-link NavBar-login"
            />
            )}
             </div>
        </nav>
    );
};

export default NavBar;