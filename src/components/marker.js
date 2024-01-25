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

    const pinLocation = {
        lat: storeIkeaData.store.coordinates[1],
        lng: storeIkeaData.store.coordinates[0],
    };

    return (
        <>
            <MarkerF
                key={storeDetail.createdAt}
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
                    key={storeDetail.createdAt}
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
