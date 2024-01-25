import React, { useState, useEffect } from "react";

import "./stores-info.css";

import StoreDetails from "./store-details";
import MapView from "./map-view";

import { setDefaults } from "react-geocode";

function StoresInfo({ countryName, stores, onServiceCallback }) {
    const [service, setService] = useState(null);
    let className = "storesInfo";

    useEffect(() => {
        // set defaults for react geocode
        setDefaults({
            key: "AIzaSyAtOkVFG3KbOaGdKqXHHyOQWtABKMT7YjQ", // Your API key here.
            language: "en", // Default language for responses.
            region: "us", // Default region for responses.
        });
    }, []);

    // access each store in stores, and then pass to storedetails
    // TODO: fix child unique key render error with MapView component
    return (
        <div className={className}>
            <MapView storesList={stores} passPlacesService={setService} />

            <div className="storeDetailList">
                <h1>{countryName}</h1>
                {stores.length != 0
                    ? stores
                          .map((store, i) =>
                              service ? (
                                  <StoreDetails
                                      key={store.createdAt}
                                      storeInfo={store}
                                      service={service}
                                  />
                              ) : null
                          )
                    : null}
            </div>
        </div>
    );
}

export default StoresInfo;
