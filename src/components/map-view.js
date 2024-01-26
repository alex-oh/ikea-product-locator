import React, { useState, useCallback, useEffect } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { getExtents } from "../utils.js";

import "./map-view.css";
import Marker from "./marker.js";

const containerStyle = {
    width: "100%",
    height: "25em",
    borderRadius: "10px",
};

const NW_DEFAULT = { lat: 46.639934, lng: 11.431081 };
const SE_DEFAULT = { lat: 48.255641, lng: 16.47254 };

function MapView({ storesList, passPlacesService }) {
    var className = "mapContainer";

    // token auth for google maps
    const [libraries] = useState(["maps", "places"]);
    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`,
        libraries,
    });

    const [map, setMap] = useState(null);
    const [storeCoords, setStoreCoords] = useState([]);

    // map initial loading function
    const onLoad = useCallback(function callback(map) {
        // load map with default boundaries
        loadMapBoundary(map, NW_DEFAULT, SE_DEFAULT);
    }, []);

    // loads the map frame with specified boundaries
    const loadMapBoundary = (map, nw_corner, se_corner) => {
        const bounds = new window.google.maps.LatLngBounds(
            nw_corner,
            se_corner
        );

        map.fitBounds(bounds);
        setMap(map);
        passPlacesService(new window.google.maps.places.PlacesService(map));
    };

    // load map boundary
    useEffect(() => {
        // check that map object exists in state
        if (map != null) {
            var nw = NW_DEFAULT;
            var se = SE_DEFAULT;

            if (storeCoords.length != 0) {
                // calculate boundary
                const coordRange = getExtents(storeCoords);
                nw = { lat: coordRange[1], lng: coordRange[0] };
                se = { lat: coordRange[3], lng: coordRange[2] };
            }
            // load map with new calculated boundary
            loadMapBoundary(map, nw, se);
        } else {
            // console.log("map is null");
        }
    }, [storeCoords]);

    // map unloading function
    const onUnmount = React.useCallback(function callback(map) {
        setMap(null);
    }, []);

    // create temp arrays to store coordinates/stores as lat/lng

    const [storesInStock, setStoresInStock] = useState([]);

    const getStoresInStock = () => {
        var storeCoordsTemp = [];
        var storesInStockTemp = [];

        if (storesList.length != 0) {
            // for each element in storesList collect lat/lng coordinates
            for (let i = 0; i < storesList.length; i++) {
                const ikeaStore = storesList[i][0];
                const storeLat = ikeaStore.store.coordinates[1];
                const storeLng = ikeaStore.store.coordinates[0];

                // add lat/lng object to storeCoords for boundary checking
                storeCoordsTemp.push({ lat: storeLat, lng: storeLng });
                // add store object to an array that tracks stores in stock
                storesInStockTemp.push(storesList[i]);

                // Set state to a list of all stores with stock present
                setStoresInStock(storesInStockTemp);

                // Use store coordinates to define map boundaries
                setStoreCoords(storeCoordsTemp);
            }
        }
    };

    useEffect(() => {
        getStoresInStock();
    }, [storesList]);

    // Generate google maps markers for each store coordinate
    var storeMarkers = [];
    storeMarkers = storesInStock.map((store) => (
        <Marker key={store[1].createdAt} store={store} />
    ));

    // from stores, display the pins of the store coordinates
    return isLoaded ? (
        <div className={className}>
            <GoogleMap
                mapContainerStyle={containerStyle}
                zoom={15}
                onLoad={onLoad}
                onUnmount={onUnmount}
            >
                <>{storeMarkers}</>
            </GoogleMap>
        </div>
    ) : (
        // if maps api hasn't returned anything don't display GoogleMap component
        <div className={className}>Loading google maps...</div>
    );
}

export default MapView;
