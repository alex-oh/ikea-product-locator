import React, { useState, useEffect, useRef } from "react";
import {
    MarkerF,
    OverlayViewF,
    FLOAT_PANE,
    MAP_PANE,
    MARKER_LAYER,
    OVERLAY_LAYER,
    OVERLAY_MOUSE_TARGET,
} from "@react-google-maps/api";

/**
 * Hook that alerts clicks outside of the passed ref
 */
function useOutsideAlerter(ref, clickOutsideCallback, isShown) {
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target) && isShown) {
                console.log("You clicked outside of me!");

                // hide the component
                clickOutsideCallback(false);
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}

function MarkerInfo({ store, position, handleClickOutside, isShown }) {
    const [overlayPane, setOverlayPane] = useState(FLOAT_PANE);
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef, handleClickOutside, isShown);

    const storeIkeaData = store[0];
    const storeDetail = store[1];

    return (
        <OverlayViewF position={position} mapPaneName={overlayPane}>
            <div className="overlayWindow" ref={wrapperRef}>
                {storeIkeaData.store.name}
                <br />
                <b>Stock: {storeIkeaData.stock}</b>
                <br />
                <a href={storeDetail.url} target="_blank">
                    Google Maps
                </a>
                <br />
                <a href={storeDetail.website} target="_blank">
                    Website
                </a>
            </div>
        </OverlayViewF>
    );
}

export default MarkerInfo;
