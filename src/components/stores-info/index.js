import React, { useState, useEffect } from "react";


import StoreDetails from "../store-details";
import MapView from "../../components/map-view";
import countries from "../../data/countries.json";

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

function StoresInfo({ countryId, countryCode, itemId }) {
    const [stores, setStores] = useState([]);

    const loadStores = async () => {
        const storesLoaded = await getItem(countryCode, itemId);
        // convert storesLoaded to list
        const storesList = Object.values(storesLoaded);

        if (storesList.length !== 0) {
            setStores(storesList);
        }
    };

    useEffect(() => {
        loadStores();
    }, []);

    // access each store in stores, and then pass to storedetails
    return (
        <div>
            <MapView storesList={stores} />
            <h1>Country Name</h1>
            <h3>Country ID: {countryCode}</h3>
            {stores
                .filter((s) => s.stock != 0)
                .map((s) => (
                    <StoreDetails key={s._id} storeInfo={s} />
                ))}
        </div>
    );
}

export default StoresInfo;
