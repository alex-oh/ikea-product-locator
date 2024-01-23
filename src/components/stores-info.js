import React, { useState, useEffect } from "react";

import "./stores-info.css";

import StoreDetails from "./store-details";
import MapView from "./map-view";
import countries from "../data/countries.json";

import { setDefaults } from "react-geocode";

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

function StoresInfo({ countryCode, itemId, onItemFound }) {
    const [stores, setStores] = useState([]);
    const [service, setService] = useState(null);
    let className = "storesInfo";

    const loadStores = async () => {
        try {
            const storesLoaded = await getItem(countryCode, itemId); // todo change literal to itemId
            // convert storesLoaded to list
            const storesList = Object.values(storesLoaded);
            setStores(storesList);
            if (storesList.length != 0) {
                onItemFound(true);
            } else {
                onItemFound(false);
            }
        } catch (error) {
            onItemFound(false);
            console.log("item dne"); // todo: show feedback that item was searched unsuccessfully
        }
    };

    useEffect(() => {
        // set defaults for react geocode
        setDefaults({
            key: "AIzaSyAtOkVFG3KbOaGdKqXHHyOQWtABKMT7YjQ", // Your API key here.
            language: "en", // Default language for responses.
            region: "us", // Default region for responses.
        });
    }, []);

    useEffect(() => {
        loadStores();
    }, [countryCode, itemId]);

    // useEffect(() => {
    //     console.log("places service has been updated: ", service);
    // }, [service]);

    // access each store in stores, and then pass to storedetails
    // TODO: fix child unique key render error with MapView component
    return (
        <div className={className}>
            <MapView storesList={stores} passPlacesService={setService} />

            <div className="storeDetailList">
                <h1>{getCountryName(countryCode)}</h1>
                {stores.length != 0 ? (
                    stores
                        .filter((s) => s.stock != 0)
                        .map((store, i) =>
                            service ? (
                                <StoreDetails
                                    key={store.createdAt}
                                    storeInfo={store}
                                    service={service}
                                />
                            ) : (
                                <></>
                            )
                        )
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
}

export default StoresInfo;
