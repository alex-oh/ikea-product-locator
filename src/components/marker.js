import React, { useState, useCallback, useEffect } from "react";
import { MarkerF } from "@react-google-maps/api";

import MarkerInfo from "./marker-info";

import "./marker.css";
import "../styles/fonts.css";

function Marker({ store }) {
    // isShown sets popup dialogue as visible or not
    const [isShown, setIsShown] = useState(false);

    const storeIkeaData = store[0];
    const storeDetail = store[1];

    const changeIsShown = useCallback(() => {
        setIsShown(!isShown);
    }, [isShown]);
    
    var storeLat = storeIkeaData.store.coordinates[1];
    var storeLng = storeIkeaData.store.coordinates[0];

    // TODO refactor lat/lng passing to avoid copy pasting code
    if (storeIkeaData.store.name == 'Vaughan') {
        storeLat = 43.7872497;
        storeLng = -79.5291876;
    }

    const pinLocation = {
        lat: storeLat,
        lng: storeLng
    };

    return (
        <>
            <MarkerF
                position={pinLocation}
                options={{
                    label: {
                        text: `${storeIkeaData.stock}`,
                        color: "white",
                        fontWeight: "600",
                        fontSize: "16px",
                    },
                }}
                onClick={changeIsShown}
            />
            {isShown ? (
                <MarkerInfo
                    store={store}
                    position={pinLocation}
                    handleClickOutside={setIsShown}
                    isShown={isShown}
                />
            ) : null}
        </>
    );
}

export default Marker;
