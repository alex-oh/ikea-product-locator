import React from "react";
import "./store-details.css";
// const geocoder = new google.maps.Geocoder();

const StoreDetails = ({ storeInfo }) => {
    let className = "storeDetail";
    const storeDetail = storeInfo.store;
    // get latitude and longitude
    const latlng = `${storeDetail.coordinates[1]}, ${storeDetail.coordinates[0]}`;
    // geocoder
    //     .geocode({ location: latlng })
    //     .then((response) => console.log(response));

    return (
        <div className={className}>
            <div className="storeLocation">
                <h3>{storeDetail.name}</h3>
                <p>Coordinates: {latlng}</p>
            </div>
            <div className="storeStock">
                <h3>Stock: {storeInfo.stock}</h3>
            </div>
        </div>
    );
};

export default StoreDetails;
