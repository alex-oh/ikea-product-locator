import React, { useState } from "react";

import Nav from "../components/navigation";
import StoresInfo from "../components/stores-info";
import Search from "../components/search";

import countries from "../data/countries.json";

function Home() {
    const [selection, setSelection] = useState("us");

    // need to pull in data from ikea api here also. default to djungelskog
    return (
        <div>
            <Nav />
            <Search onSelection={setSelection} />
            <StoresInfo countryCode={selection} itemId={"00402813"} />
            {/* <StoresInfo countryCode={selection} itemId={"00402832"} /> */}
        </div>
    );
}
export default Home;
