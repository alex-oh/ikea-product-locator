import React, { useState } from "react";

import Nav from "../components/navigation";
import StoresInfo from "../components/stores-info";
import Search from "../components/search";

function Home() {
    const [country, setCountry] = useState("at");
    const [itemId, setItemId] = useState("00402813");
    const [itemFound, setItemFound] = useState(false);

    // need to pull in data from ikea api here also. default to djungelskog
    return (
        <div>
            <Nav />
            <Search
                onSelection={setCountry}
                onItemUpdate={setItemId}
                defaultCountry={country}
                defaultItemId={itemId}
                itemFoundStatus={itemFound} // gives us feedback on whether item was found in storesInfo component
            />
            <StoresInfo countryCode={country} itemId={itemId} onItemFound={setItemFound} />
        </div>
    );
}
export default Home;
