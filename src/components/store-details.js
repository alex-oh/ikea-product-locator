import React, { useEffect, useState } from "react";
import "./store-details.css";
import { getExtents } from "../utils.js";

import {
    setKey,
    setDefaults,
    setLanguage,
    setRegion,
    fromAddress,
    fromLatLng,
    fromPlaceId,
    setLocationType,
    geocode,
    RequestType,
    setBounds,
} from "react-geocode";

// set defaults for react geocode
setDefaults({
    key: "AIzaSyAtOkVFG3KbOaGdKqXHHyOQWtABKMT7YjQ", // Your API key here.
    language: "en", // Default language for responses.
    region: "us", // Default region for responses.
});

const StoreDetails = ({ storeInfo }) => {
    let className = "storeDetail";
    const storeDetail = storeInfo.store;

    // get latitude and longitude
    const lat = storeDetail.coordinates[1];
    const lng = storeDetail.coordinates[0];

    const [storeAddress, setStoreAddress] = useState(null);

    const getAddressFromLatLng = async (lat, lng) => {
        // Get formatted address, city, state, country from latitude & longitude.
        try {
            const boundsFactor = 0.005;
            const bounds = {
                northeast: { lat: lat + boundsFactor, lng: lng + boundsFactor },
                southwest: { lat: lat - boundsFactor, lng: lng - boundsFactor },
            };
            // get placeID from google maps api
            // make a placeId request using the bounds and keyword "ikea"
            // placeId = ??
            // request the coordinates of the placeId given, using fromPlaceId()

            const trueLat = lat;
            const trueLng = lng;
            // request the address of the coordinates obtained, using fromLatLng()
            const { results } = await fromLatLng(trueLat, trueLng);
            const address = results[0].formatted_address;
            const { city, state, country } =
                results[0].address_components.reduce((acc, component) => {
                    if (component.types.includes("locality"))
                        acc.city = component.long_name;
                    else if (
                        component.types.includes("administrative_area_level_1")
                    )
                        acc.state = component.long_name;
                    else if (component.types.includes("country"))
                        acc.country = component.long_name;
                    return acc;
                }, {});
            setStoreAddress({
                address: address,
                city: city,
                state: state,
                country: country,
            });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        console.log(`lat: ${lat}, lng: ${lng}`);
        console.log(storeAddress);
    }, [storeAddress]);

    // get address from latitude/longitude. only executes when component first initialized
    useEffect(() => {
        getAddressFromLatLng(lat, lng);
    }, []);

    return (
        <div className={className}>
            <div className="storeLocation">
                <h3>{storeDetail.name}</h3>
                <p>{storeAddress != null ? storeAddress.address : ""}</p>
            </div>
            <div className="storeStock">
                <h3>Stock: {storeInfo.stock}</h3>
            </div>
        </div>
    );
};

export default StoreDetails;
