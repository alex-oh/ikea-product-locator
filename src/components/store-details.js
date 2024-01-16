import React from "react";

// const geocoder = new google.maps.Geocoder();

const StoreDetails = ({ storeInfo }) => {
    const storeDetail = storeInfo.store;
    // get latitude and longitude
    const latlng = `${storeDetail.coordinates[1]}, ${storeDetail.coordinates[0]}`;
    // geocoder
    //     .geocode({ location: latlng })
    //     .then((response) => console.log(response));
    
    return (
        <div>
            <h2>{storeDetail.name}</h2>
            <h3>Coordinates: {latlng}</h3>
            <p>Stock: {storeInfo.stock}</p>
        </div>
    );
};

export default StoreDetails;
