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

    // toggle between two different products when switch is clicked
    const toggleItem = () => {
        const country = countriesItemDict[currentCountry];
        var itemToSearch = currentItemId; // should be either big or small djungelskog
        if (itemToSearch == country.skog) {
            // if item is already on big skog, switch to small skog
            itemToSearch = country.skogSmall;
            setLogo(logoSmall);
        } else {
            // if item is already on small skog, switch to BIG skog
            itemToSearch = country.skog;
            setLogo(logoBig);
        }
        // update the item and search it in the home component
        onItemUpdate(itemToSearch);
    };

    if (countriesItemDict != null) {
        return (
            <div className="navigation">
                <img src={logo} className="skog-img" alt="djungelskog"></img>
                <div className="skog-logo">
                    <h1 className="top">DJUNGELSKOG</h1>
                    <h3 className="bot">HUNTER</h3>
                </div>
                {currentItemId == countriesItemDict[currentCountry].skog ||
                currentItemId == countriesItemDict[currentCountry].skogSmall ? (
                    <Switch handleToggle={toggleItem} />
                ) : null}
            </div>
        );
    } else {
        return null;
    }
}

export default Nav;
