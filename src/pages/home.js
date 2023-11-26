import React from "react";

import Nav from "../components/navigation";
import StoresInfo from "../components/stores-info";
import Search from "../components/search";

function Home() {
    // need to pull in data from ikea api here also. default to djungelskog
    return (
        <div>
            <Nav />
            <Search />
            {/* <StoresInfo countryCode={"fr"} itemId={"00402813"} />/ */}
            <StoresInfo countryCode={"us"} itemId={"00402832"} />
        </div>
    );
}
export default Home;
