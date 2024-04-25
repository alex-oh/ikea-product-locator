import React, { useEffect, useState, useContext } from "react";
import "./store-details.css";
import CacheContext from "../data/cache-context.js";
import { fromPlaceId } from "react-geocode";

const StoreDetails = ({ storeInfo, service, storeDetailCallback }) => {
    let className = "storeDetail";
    const storeDetail = storeInfo.store;

    let storeStockClass = "storeStock";
    if (storeInfo.stock > 40) {
        storeStockClass += "-hi";
    } else if (storeInfo.stock >= 20) {
        storeStockClass += "-med";
    } else {
        storeStockClass += "-low";
    }

    const [storeAddress, setStoreAddress] = useState(null);
    const [placeId, setPlaceId] = useState("");
    const [placeDetails, setPlaceDetails] = useState(null);
    const { cacheData, updateCacheData } = useContext(CacheContext); // cache

    const getPlaceIdFromLatLng = async (lat, lng) => {
        // Get store's placeId from latitude & longitude.
        try {
            // find the ikea store closest to input lat/lng coordinates
            // make a placeId request using the bounds and keyword "ikea"
            if (service != null) {
                const latlngKey = `${lat}-${lng}`;
                if (latlngKey in cacheData) {
                    // check if data is in cache first
                    setPlaceId(cacheData[latlngKey]); // if lat/lng in cache, then return cache value
                } else {
                    // if data is not in cache, then request from API and add new value to the cache
                    var request = {
                        query: "ikea",
                        fields: ["name", "place_id"],
                        locationBias: new window.google.maps.LatLng(lat, lng),
                    };
                    service.findPlaceFromQuery(
                        request,
                        function (results, status) {
                            setPlaceId(results[0].place_id);

                            const newData = {};
                            newData[latlngKey] = results[0].place_id;
                            updateCacheData(newData); // add value to the cache
                        }
                    );
                }
            } else {
                console.log("service is null");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const formatAddressResult = (results) => {
        const a = results[0];
        const address = a.formatted_address;
        const { city, state, country } = results[0].address_components.reduce(
            (acc, component) => {
                if (component.types.includes("locality"))
                    acc.city = component.long_name;
                else if (
                    component.types.includes("administrative_area_level_1")
                )
                    acc.state = component.long_name;
                else if (component.types.includes("country"))
                    acc.country = component.long_name;
                return acc;
            },
            {}
        );
        setStoreAddress({
            address: address,
            city: city,
            state: state,
            country: country,
        });
    };

    // get placeId from latitude/longitude. only executes when component first initialized
    useEffect(() => {
        if (storeDetail.coordinates != null) {
            var lat = storeDetail.coordinates[1];
            var lng = storeDetail.coordinates[0];

            // TODO refactor lat/lng passing to avoid copy pasting code
            if (storeDetail.name == "Vaughan") {
                lat = "43.7872497";
                lng = "-79.5291876";
            }
            getPlaceIdFromLatLng(lat, lng);
        }
    }, []);

    // request the address of the placeId given, using fromPlaceId()
    async function getInfoFromPlaceId() {
        if (placeId != "") {
            try {
                if (placeId in cacheData) {
                    // console.log(`${placeId} is in cache`);
                    // check cache first for placeId key
                    const results = cacheData[placeId]["results"];
                    formatAddressResult(results);

                    const place = cacheData[placeId]["place"];
                    // set component state to place details for rendering
                    setPlaceDetails(place);
                    // send place details data to store-info level
                    storeDetailCallback([storeInfo, place]);
                } else {
                    // cache data doesnt exist -> request the data from the google maps API
                    const newData = {};
                    newData[placeId] = {};

                    const { results } = await fromPlaceId(`${placeId}`);
                    formatAddressResult(results);
                    newData[placeId]["results"] = results;

                    const detailsRequest = {
                        placeId: `${placeId}`,
                        fields: ["url", "website", "opening_hours"],
                    };

                    service.getDetails(
                        detailsRequest,
                        function (place, status) {
                            // add place to the cache
                            newData[placeId]["place"] = place;
                            // set component state to place details for rendering
                            setPlaceDetails(place);
                            // send place details data to store-info level
                            storeDetailCallback([storeInfo, place]);
                        }
                    );

                    // add data to the cache for the placeId
                    updateCacheData(newData);
                }
            } catch (e) {
                console.log(e);
            }
        }
    }
    useEffect(() => {
        getInfoFromPlaceId();
    }, [placeId]);

    return (
        <div className={className}>
            <div className="storeLocation">
                <div>
                    <h3>{storeDetail.name}</h3>
                    <p>{storeAddress != null ? storeAddress.address : ""}</p>
                </div>
                <div className={`storeStock ${storeStockClass}`}>
                    <h3>Stock: {storeInfo.stock}</h3>
                </div>
                {placeDetails != null ? (
                    <div className="storeLinks">
                        <a href={placeDetails.url} target="_blank">
                            Google Maps
                        </a>
                        <br />
                        <a href={placeDetails.website} target="_blank">
                            Website
                        </a>
                    </div>
                ) : null}
            </div>
            {/* Store Operating Hours */}
            <div className="storeHours">
                <b>
                    <u>Hours</u>
                </b>
                {placeDetails != null && placeDetails.opening_hours != null
                    ? placeDetails.opening_hours.weekday_text.map((day) => {
                          const keyVal = placeDetails.url + day;
                          return <p key={keyVal}>{day}</p>;
                      })
                    : ""}
            </div>
        </div>
    );
};

export default StoreDetails;
