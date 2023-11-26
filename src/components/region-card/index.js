import React from "react";

import StoreDetails from "../store-details";
import stores from "../../data/stores.json";

const Region = ({ country }) => {
    // only render stores that have stock of item
    return (
        <div>
            <h1>{country.name}</h1>
            <h3>Country ID: {country.countryCode}</h3>
            {stores.filter(a => a.region == country.countryCode).map((s) => <StoreDetails key={s._id} store={s}/>)}
        </div>
    );
}

export default Region;
