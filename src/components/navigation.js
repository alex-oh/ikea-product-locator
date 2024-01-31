import React, { useState } from "react";

import Switch from "./Switch";
import "./navigation.css";
import logoBig from "../assets/images/big-djungelskog.png";
import logoSmall from "../assets/images/small-djungelskog.png";

function Nav({
    onItemUpdate,
    currentCountry,
    currentItemId,
    countriesItemDict,
}) {
    const [logo, setLogo] = useState(logoBig);
    const [bigSkogSwitch, setBigSkogSwitch] = useState(true);

    if (countriesItemDict != null) {
        const country = countriesItemDict[currentCountry];

        // toggle between two different products when switch is clicked
        const toggleItem = () => {
            currentItemId == country.skog ? toggleSmallSkog() : toggleBigSkog();
        };

        // searches big djungelskog product
        const toggleBigSkog = () => {
            setLogo(logoBig);
            setBigSkogSwitch(true);

            // update the item and search it in the home component
            onItemUpdate(country.skog);
        };

        // searches small djungelskog product
        const toggleSmallSkog = () => {
            setLogo(logoSmall);
            setBigSkogSwitch(false);

            // update the item and search it in the home component
            onItemUpdate(country.skogSmall);
        };

        // resets the searched item to big djungelskog when clicked
        const resetItemSearch = () => {
            toggleBigSkog();
        };

        return (
            <div className="navigation">
                <div className="nav-logo-section">
                    <img
                        src={logo}
                        className="skog-img"
                        alt="djungelskog"
                    ></img>
                    <div
                        className="skog-logo"
                        title="Click to reset search to Djungelskogs"
                        onClick={resetItemSearch}
                    >
                        <h1 className="top">DJUNGELSKOG</h1>
                        <h3 className="bot">HUNTER</h3>
                    </div>
                </div>
                {/* toggle switch */}
                {currentItemId == countriesItemDict[currentCountry].skog ||
                currentItemId == countriesItemDict[currentCountry].skogSmall ? (
                    <Switch isOn={bigSkogSwitch} handleToggle={toggleItem} />
                ) : null}
            </div>
        );
    } else {
        return null;
    }
}

export default Nav;
