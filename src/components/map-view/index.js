import React, { useState, useCallback, useEffect } from "react";
import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
    width: "90%",
    height: "25em",
};

function MapView({ storesList }) {
    // token auth for google maps
    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: "AIzaSyAtOkVFG3KbOaGdKqXHHyOQWtABKMT7YjQ",
    });

    const [map, setMap] = useState(null);

    // store coordinates of each store so we can show them as markers
    const [storesCoord, setStoresCoord] = useState([]);

    // map loading function
    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds();
        map.fitBounds(bounds);
        setMap(map);
    }, []);

    // map unloading function
    const onUnmount = React.useCallback(function callback(map) {
        setMap(null);
    }, []);

    const onLoadMarker = (marker) => {
        /*
        console.log(
            "marker at %d, %d created",
            marker.position.lat,
            marker.position.lng
        );
        */
    };

    // from stores, display the pins of the store coordinates
    if (isLoaded && storesList.length != 0) {
        // create temp array to store coordinates as lat/lng
        var storesCoordinates = [];

        // for each element in storesList collect lat/lng coordinates
        for (let i = 0; i < storesList.length; i++) {
            var s = storesList[i].store;

            var storeLat;
            if (s.name == "Nice St. Isidore") {
                storeLat = s.coordinates[2];
            } else {
                storeLat = s.coordinates[1];
            }

            const storeLng = s.coordinates[0];
            const storeCoord = { lat: storeLat, lng: storeLng };

            if (storesList[i].stock != 0) {
                // only add marker if stock isn't 0
                storesCoordinates.push(storeCoord);
            }
        }

        // Generate google maps markers for each store coordinate
        var storeMarkers = storesCoordinates.map((sCoord) => (
            <MarkerF onLoad={onLoadMarker} position={sCoord} />
        ));

        return (
            <GoogleMap
                mapContainerStyle={containerStyle}
                zoom={15}
                onLoad={onLoad}
                onUnmount={onUnmount}
            >
                <>{storeMarkers}</>
            </GoogleMap>
        );
    } else {
        return <>Loading...</>;
    }
}

export default MapView;
