import React, { useState } from "react";

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

    var countrySelection = countries.map((c) => (
        <option value={c.countryCode}>{c.name}</option>
    ));

    const updateCountryDropdown = () => {
        const dropdownValue = document.getElementById("countryDropdown").value;
        setCountryDropdown(dropdownValue);
    };

    const updateItemSearched = () => {
        const searchItemId = pad(
            "00000000",
            document.getElementById("itemSearch").value,
            true
        );
        onItemUpdate(searchItemId);

        // update country selected
        onSelection(countryDropdown);
    };

    return (
        <div>
            {/* Country selection dropdown */}
            <div>
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
            <div>
                <span>Enter Product ID:</span>
                <input
                    type="text"
                    name="itemId"
                    id="itemSearch"
                    defaultValue={defaultItemId}
                    onChange={setSearchBar}
                />
                <button onClick={updateItemSearched}>Search</button>
            </div>
        </div>
    );
}

export default Search;
