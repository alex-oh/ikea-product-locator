import React, { useState, useCallback, useEffect } from "react";
import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";

import "./map-view.css";

const containerStyle = {
    width: "100%",
    height: "25em",
    "border-radius": "10px",
};

const NW_DEFAULT = { lat: 46.639934, lng: 11.431081 };
const SE_DEFAULT = { lat: 48.255641, lng: 16.47254 };

function MapView({ storesList }) {
    var className = "mapContainer";

    // token auth for google maps
    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: "AIzaSyAtOkVFG3KbOaGdKqXHHyOQWtABKMT7YjQ", //TODO: make this an environment variable...
    });

    const [map, setMap] = useState(null);
    const [sc, setSc] = useState([]);

    // map initial loading function
    const onLoad = useCallback(function callback(map) {
        // load map with default boundaries
        loadMapBoundary(map, NW_DEFAULT, SE_DEFAULT);
        console.log("loading default map boundary");
    }, []);

    // loads the map frame with specified boundaries
    const loadMapBoundary = (map, nw_corner, se_corner) => {
        const bounds = new window.google.maps.LatLngBounds(
            nw_corner,
            se_corner
        );

        map.fitBounds(bounds);
        setMap(map);
    };

    // calculate corners given a set of coordinates
    // source: https://learn.microsoft.com/en-us/answers/questions/883272/find-max-min-latitude-and-longitude-from-coordinat
    function getExtents(locations) {
        if (locations && locations.length > 0) {
            var minLat = 90;
            var maxLat = -90;
            var minLon = 180;
            var maxLon = -180;

            for (var i = 0, len = locations.length; i < len; i++) {
                var lat = locations[i].lat;
                var lon = locations[i].lng;

                if (lat < minLat) {
                    minLat = lat;
                }

                if (lat > maxLat) {
                    maxLat = lat;
                }

                if (lon < minLon) {
                    minLon = lon;
                }

                if (lon > maxLon) {
                    maxLon = lon;
                }
            }

            return [minLon, minLat, maxLon, maxLat];
        }

        return null;
    }

    // load map boundary
    useEffect(() => {
        // check that map object exists in state
        if (map != null) {
            var nw = NW_DEFAULT;
            var se = SE_DEFAULT;

            if (sc.length != 0) {
                // calculate boundary
                const coordRange = getExtents(sc);
                console.log(coordRange);
                nw = { lat: coordRange[1], lng: coordRange[0] };
                se = { lat: coordRange[3], lng: coordRange[2] };
            }
            // load map with new calculated boundary
            loadMapBoundary(map, nw, se);
            console.log("loading map boundary - sc has changed");
        } else {
            console.log("map is null");
        }
    }, [sc]);

    // map unloading function
    const onUnmount = React.useCallback(function callback(map) {
        setMap(null);
    }, []);

    // create temp array to store coordinates as lat/lng
    var storeCoords = []; // TODO: refactor to only use sc state variable, remove this temp variable
    var storeMarkers = [];

    const getListOfCoordinates = () => {
        console.log("getting list of coordinates");
        if (storesList.length != 0) {
            // for each element in storesList collect lat/lng coordinates
            for (let i = 0; i < storesList.length; i++) {
                var s = storesList[i].store;
                var storeLat;
                storeLat = s.coordinates[1];
                const storeLng = s.coordinates[0];

                // only add marker if stock isn't 0
                if (storesList[i].stock != 0) {
                    storeCoords.push({ lat: storeLat, lng: storeLng });
                }

                // Use store coordinates to define map boundaries
                setSc(storeCoords);
            }
        }
    };

    useEffect(() => {
        getListOfCoordinates();
    }, [storesList]);

    // Generate google maps markers for each store coordinate
    storeMarkers = sc.map((pinLocation) => <MarkerF position={pinLocation} />);

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
