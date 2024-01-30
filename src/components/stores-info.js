import React, { useState, useEffect } from "react";

import "./stores-info.css";

import StoreDetails from "./store-details";
import MapView from "./map-view";

import { setDefaults } from "react-geocode";

function StoresInfo({ countryName, stores }) {
    const [service, setService] = useState(null);
    const [allStoresDetails, setAllStoresDetails] = useState([]);
    const [prevStores, setPrevStores] = useState(stores);

    let className = "storesInfo";

    // clear allStoresDetails when a new country is searched (when stores array changes)
    useEffect(() => {
        if (prevStores != stores) {
            setAllStoresDetails([]);
        }
    }, [countryName]);

    useEffect(() => {
        // set defaults for react geocode
        setDefaults({
            key: `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`,
            language: "en", // Default language for responses.
            region: "us", // Default region for responses.
        });
    }, []);

    // callback function that adds storeDetails to an array of all of the store details
    const storeDetailCallback = (storeDetails) => {
        setAllStoresDetails((prevDetails) => [...prevDetails, storeDetails]);
    };

    // access each store in stores, and then pass to storedetails
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
                                  key={i + store.createdAt}
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
