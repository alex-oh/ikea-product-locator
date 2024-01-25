import React, { useState, useCallback, useEffect } from "react";
import {
    MarkerF,
    OverlayViewF,
    FLOAT_PANE,
    MAP_PANE,
    MARKER_LAYER,
    OVERLAY_LAYER,
    OVERLAY_MOUSE_TARGET,
} from "@react-google-maps/api";

import "./marker.css";
import "../styles/fonts.css";

function Marker({ store }) {
    // isShown sets popup dialogue as visible or not
    const [isShown, setIsShown] = useState(false);
    const [overlayPane, setOverlayPane] = useState(FLOAT_PANE);

    const storeIkeaData = store[0];
    const storeDetail = store[1];

    const changeIsShown = useCallback(() => {
        setIsShown(!isShown);
    }, [isShown]);

    // console.log(store);
    const pinLocation = {
        lat: storeIkeaData.store.coordinates[1],
        lng: storeIkeaData.store.coordinates[0],
    };

    return (
        <>
            <MarkerF
                key={store.createdAt}
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
                <OverlayViewF position={pinLocation} mapPaneName={overlayPane}>
                    <div className="overlayWindow">
                        {storeIkeaData.store.name}
                        <br />
                        <b>Stock: {storeIkeaData.stock}</b>
                        <br />
                        <a href={storeDetail.url} target="_blank">
                            Google Maps
                        </a>
                        <br/>
                        <a href={storeDetail.website} target="_blank">Website</a>
                    </div>
                </OverlayViewF>
            ) : null}
        </>
    );
}

export default Marker;
