import React, { useState } from "react";

import Nav from "../components/navigation";
import StoresInfo from "../components/stores-info";
import Search from "../components/search";

import countries from "../data/countries.json";

function Home() {
    const [country, setCountry] = useState("at");
    const [itemId, setItemId] = useState("00402813");

    // need to pull in data from ikea api here also. default to djungelskog
    return (
        <div>
            <Nav />
            <Search
                onSelection={setCountry}
                onItemUpdate={setItemId}
                defaultCountry={country}
                defaultItemId={itemId}
            />
            <StoresInfo countryCode={country} itemId={itemId} />
        </div>
    );
}
export default Home;
