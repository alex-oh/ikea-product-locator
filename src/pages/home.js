import React, { useState, useEffect } from "react";

import Nav from "../components/navigation";
import StoresInfo from "../components/stores-info";
import Search from "../components/search";

import countries from "../data/countries.json";

// import ikea availability checker library
const checker = require("ikea-availability-checker");

// search product by ID in all regions around the world, returns list of all stores and corresponding stock
const getItem = async (countryCode, productId) => {
    // make a list of all the stores in the region by country code
    const stores = checker.stores.findByCountryCode(countryCode);

    // get availabilities of product in each store in the region
    const storesAvailable = JSON.stringify(
        await checker.availabilities(stores, [productId])
    );

    // return json object of all stores with item in stock
    return JSON.parse(storesAvailable);
};

const getCountryName = (countryCode) => {
    // parses country name in countries.json from country code
    for (let i = 0; i < countries.length; i++) {
        let c = countries[i];
        if (c.countryCode == countryCode) {
            return c.name;
        }
    }
    return countryCode;
};

function Home() {
    const [countryCode, setCountryCode] = useState("at");
    const [itemId, setItemId] = useState("00402813");
    const [itemFound, setItemFound] = useState(false);
    const [stores, setStores] = useState([]);

    const loadStores = async () => {
        try {
            const storesLoaded = await getItem(countryCode, itemId);
            // convert storesLoaded to list
            const storesList = Object.values(storesLoaded);
            setStores(storesList);
            if (storesList.length != 0) {
                setItemFound(true);
            } else {
                setItemFound(false);
            }
        } catch (error) {
            console.log(error);
            setItemFound(false);
        }
    };

    useEffect(() => {
        loadStores();
    }, [countryCode, itemId]);

    // need to pull in data from ikea api here also. default to djungelskog
    return (
        <div>
            <Nav />
            <Search
                onSelection={setCountryCode}
                onItemUpdate={setItemId}
                defaultCountry={countryCode}
                defaultItemId={itemId}
                itemFoundStatus={itemFound} // gives us feedback on whether item was found in storesInfo component
            />
            <StoresInfo countryName={getCountryName(countryCode)} stores={stores} />
        </div>
    );
}
export default Home;
