import React, { useState, useCallback, useEffect } from "react";
import {
    MarkerF,
    OverlayViewF,
    OVERLAY_MOUSE_TARGET,
    MARKER_LAYER,
} from "@react-google-maps/api";

import "./marker.css";
import "../styles/fonts.css";

function Marker({ store }) {
    // isShown sets popup dialogue as visible or not
    const [isShown, setIsShown] = useState(false);
    const [overlayPane, setOverlayPane] = useState(MARKER_LAYER);

    const changeIsShown = useCallback(() => {
        setIsShown(!isShown);
    }, [isShown]);

    console.log(store);
    const pinLocation = {
        lat: store.store.coordinates[1],
        lng: store.store.coordinates[0],
    };

    return (
        <>
            <MarkerF
                key={store.createdAt}
                position={pinLocation}
                options={{
                    label: {
                        text: `${store.stock}`,
                        color: "white",
                        fontWeight: "600",
                        fontSize: "16px"
                    },
                }}
                onClick={changeIsShown}
            />
            {isShown ? (
                <OverlayViewF position={pinLocation} mapPaneName={overlayPane}>
                    <div className="overlayWindow">
                        {store.store.name}
                        <br />
                        <b>Stock: {store.stock}</b>
                    </div>
                </OverlayViewF>
            ) : null}
        </>
    );
}

export default Marker;
