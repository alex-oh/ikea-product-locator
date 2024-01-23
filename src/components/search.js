import React, { useState } from "react";

import "./search.css";

import countries from "../data/countries.json";
import { useEffect } from "react";

function pad(pad, str, padLeft) {
    // source: https://stackoverflow.com/questions/2686855/is-there-a-javascript-function-that-can-pad-a-string-to-get-to-a-determined-leng
    if (typeof str === "undefined") return pad;
    if (padLeft) {
        return (pad + str).slice(-pad.length);
    } else {
        return (str + pad).substring(0, pad.length);
    }
}

function Search({
    onSelection,
    onItemUpdate,
    defaultCountry,
    defaultItemId,
    itemFoundStatus,
}) {
    const [searchBar, setSearchBar] = useState(defaultItemId);
    const [countryDropdown, setCountryDropdown] = useState(defaultCountry);

    var countrySelection = countries.map((c, i) => (
        <option key={i} value={c.countryCode}>
            {c.name}
        </option>
    ));

    const updateCountryDropdown = () => {
        const dropdownValue = document.getElementById("countryDropdown").value;
        setCountryDropdown(dropdownValue);
    };

    const updateItemSearched = () => {
        var searchBarValue = document
            .getElementById("itemSearch")
            .value.split(".")
            .join("");
        const searchItemId = pad("00000000", searchBarValue, true);
        try {
            onItemUpdate(searchItemId);
            // update country selected
            onSelection(countryDropdown);
        } catch (error) {
            console.log(error);
        }
    };

    let searchButtonClass = "searchButton";

    let itemFoundStatusClass = "itemFoundStatus";
    itemFoundStatus ? itemFoundStatusClass += "-true" : itemFoundStatusClass += "-false";

    return (
        <div className="search">
            {/* Country selection dropdown */}
            <div className="searchItem">
                <span>Country</span>
                <select
                    name="country"
                    id="countryDropdown"
                    defaultValue={defaultCountry}
                    onChange={updateCountryDropdown}
                >
                    {countrySelection}
                </select>
            </div>
            {/* Search bar */}
            <div className="searchItem">
                <span>Enter Product ID:</span>
                <input
                    type="text"
                    name="itemId"
                    id="itemSearch"
                    defaultValue={defaultItemId}
                    onChange={setSearchBar}
                />
            </div>
            <button className={searchButtonClass} onClick={updateItemSearched}>
                Search
            </button>
            <div className={`itemFoundStatus ${itemFoundStatusClass}`}>
                <p>{itemFoundStatus ? "Item found!" : "Item not found"}</p>
            </div>
        </div>
    );
}

export default Search;
