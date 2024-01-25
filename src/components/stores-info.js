import React, { useState, useEffect } from "react";

import "./stores-info.css";

import StoreDetails from "./store-details";
import MapView from "./map-view";

import { setDefaults } from "react-geocode";

function StoresInfo({ countryName, stores, onServiceCallback }) {
    const [service, setService] = useState(null);
    const [allStoresDetails, setAllStoresDetails] = useState([]);
    const [prevStores, setPrevStores] = useState(stores);

    let className = "storesInfo";

    // clear allStoresDetails when a new country is searched (when stores array changes)
    useEffect(() => {
        if (prevStores != stores) {
            setAllStoresDetails([]);
        }
    }, [stores]);

    useEffect(() => {
        // set defaults for react geocode
        setDefaults({
            key: "AIzaSyAtOkVFG3KbOaGdKqXHHyOQWtABKMT7YjQ", // Your API key here.
            language: "en", // Default language for responses.
            region: "us", // Default region for responses.
        });
    }, []);

    // callback function that adds storeDetails to an array of all of the store details
    const storeDetailCallback = (storeDetails) => {
        setAllStoresDetails((prevDetails) => [...prevDetails, storeDetails]);
    };

    // access each store in stores, and then pass to storedetails
    // TODO: fix child unique key render error with MapView component
    return (
        <div className={className}>
            <MapView
                storesList={allStoresDetails}
                passPlacesService={setService}
            />

            <div className="storeDetailList">
                <h1>{countryName}</h1>
                {stores.length != 0
                    ? stores.map((store, i) =>
                          service ? (
                              <StoreDetails
                                  key={store.createdAt}
                                  storeInfo={store}
                                  service={service}
                                  storeDetailCallback={storeDetailCallback}
                              />
                          ) : null
                      )
                    : null}
            </div>
        </div>
    );
}

export default StoresInfo;
