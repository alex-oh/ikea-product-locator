import React, { useEffect, useState } from "react";
import "./store-details.css";

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

    // get latitude and longitude
    const lat = storeDetail.coordinates[1];
    const lng = storeDetail.coordinates[0];

    const [storeAddress, setStoreAddress] = useState(null);
    const [placeId, setPlaceId] = useState("");
    const [placeDetails, setPlaceDetails] = useState(null);

    const getPlaceIdFromLatLng = async (lat, lng) => {
        // Get store's placeId from latitude & longitude.
        try {
            // find the ikea store closest to input lat/lng coordinates
            // make a placeId request using the bounds and keyword "ikea"
            if (service != null) {
                var request = {
                    query: "ikea",
                    fields: ["name", "place_id"],
                    locationBias: new window.google.maps.LatLng(lat, lng),
                };
                service.findPlaceFromQuery(request, function (results, status) {
                    // console.log("results:", results[0].place_id);
                    setPlaceId(results[0].place_id);
                });
            } else {
                console.log("service is null");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const formatAddressResult = (results) => {
        // console.log(results[0]);
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
        getPlaceIdFromLatLng(lat, lng);
    }, []);

    // request the address of the placeId given, using fromPlaceId()
    useEffect(() => {
        async function getInfoFromPlaceId() {
            if (placeId != "") {
                try {
                    const { results } = await fromPlaceId(`${placeId}`);
                    formatAddressResult(results);

                    const detailsRequest = {
                        placeId: `${placeId}`,
                        fields: ["url", "website", "opening_hours"],
                    };

                    service.getDetails(
                        detailsRequest,
                        function (place, status) {
                            // set component state to place details for rendering
                            setPlaceDetails(place);
                            // send place details data to store-info level
                            storeDetailCallback([storeInfo, place]);
                        }
                    );
                } catch (e) {
                    console.log(e);
                }
            }
        }
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
                ) : (
                    ""
                )}
            </div>
            {/* Store Operating Hours */}
            <div className="storeHours">
                <b>
                    <u>Hours</u>
                </b>
                {placeDetails != null
                    ? placeDetails.opening_hours.weekday_text.map((day) => {
                          return <p>{day}</p>;
                      })
                    : ""}
            </div>
        </div>
    );
};

export default StoreDetails;
