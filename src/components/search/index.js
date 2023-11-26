import React from "react";

import countries from "../../data/countries.json";

function Search({ onSelection }) {
    var countrySelection = countries.map((c) => (
        <option value={c.countryCode}>{c.name}</option>
    ));

    const updateSelection = () => {
        const dropdownValue = document.getElementById("countryDropdown").value;
        console.log(dropdownValue);
        onSelection(dropdownValue);
    };

    return (
        <div>
            {/* Country selection dropdown */}
            <div>
                <span>Country</span>
                <select
                    name="country"
                    id="countryDropdown"
                    onChange={updateSelection}
                >
                    {countrySelection}
                </select>
            </div>
            {/* Search bar */}
            <div>
                <span>Enter ZIP Code:</span>
                <input type="text" />
            </div>
        </div>
    );
}

export default Search;
