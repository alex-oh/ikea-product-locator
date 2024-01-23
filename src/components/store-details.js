import React, { useEffect, useState } from "react";
import "./store-details.css";

import { fromPlaceId } from "react-geocode";

const StoreDetails = ({ storeInfo, service }) => {
    let className = "storeDetail";
    const storeDetail = storeInfo.store;

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
                            // console.log("place Details:", place);
                            setPlaceDetails(place);
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
                <h3>{storeDetail.name}</h3>
                <p>{storeAddress != null ? storeAddress.address : ""}</p>
                {/* Store Operating Hours */}
                <p>
                    {placeDetails != null
                        ? placeDetails.opening_hours.weekday_text.map((day) => {
                              return <p>{day}</p>;
                          })
                        : ""}
                </p>
                <p>
                    {placeDetails != null ? <a href={placeDetails.url}>Google Maps</a> : ""}
                </p>
                <p>
                    {placeDetails != null ? <a href={placeDetails.website}>Website</a> : ""}
                </p>
            </div>
            <div className="storeStock">
                <h3>Stock: {storeInfo.stock}</h3>
            </div>
        </div>
    );
};

export default StoreDetails;
