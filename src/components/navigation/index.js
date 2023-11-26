import React from "react";
import "./index.css";
import logo from "../../assets/images/big-djungelskog.png"

function Nav() {
    return (
        <div className="navigation">
            <img src={logo} className="skog-img" alt="djungelskog"></img>
            <div className="skog-logo">
                <h1 className="top">DJUNGELSKOG</h1>
                <h3 className="bot">LOCATOR</h3>
            </div>
        </div>
    );
}

export default Nav;
