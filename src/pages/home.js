import React from "react";

import Nav from "../components/navigation";
import MapView from "../components/map-view";
import StoresInfo from "../components/stores-info";
import Search from "../components/search";

function Home() {
    // need to pull in data from ikea api here also. default to djungelskog
    return (
        <div>
            <h1>Homepage</h1>
            <Nav />
            <Search />
            <MapView />
            <StoresInfo />
        </div>
    );
}
export default Home;
