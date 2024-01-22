import React, { useState } from "react";

import "./search.css";

import countries from "../data/countries.json";

function pad(pad, str, padLeft) {
    // source: https://stackoverflow.com/questions/2686855/is-there-a-javascript-function-that-can-pad-a-string-to-get-to-a-determined-leng
    if (typeof str === "undefined") return pad;
    if (padLeft) {
        return (pad + str).slice(-pad.length);
    } else {
        return (str + pad).substring(0, pad.length);
    }
}

function Search({ onSelection, onItemUpdate, defaultCountry, defaultItemId }) {
    const [searchBar, setSearchBar] = useState("");
    const [countryDropdown, setCountryDropdown] = useState("");
    const [searchIsHovered, setSearchIsHovered] = useState(false);

    var countrySelection = countries.map((c) => (
        <option value={c.countryCode}>{c.name}</option>
    ));

    const updateCountryDropdown = () => {
        const dropdownValue = document.getElementById("countryDropdown").value;
        setCountryDropdown(dropdownValue);
    };

    const updateItemSearched = () => {
        var searchBarValue = document.getElementById("itemSearch").value.split('.').join("");
        const searchItemId = pad(
            "00000000",
            searchBarValue,
            true
        );
        try {
            onItemUpdate(searchItemId);
            // update country selected
            onSelection(countryDropdown);
        }
        catch (error) {
            console.log(error);
        }
    };

    let searchButtonClass = "searchButton";

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
        </div>
    );
}

export default Search;
