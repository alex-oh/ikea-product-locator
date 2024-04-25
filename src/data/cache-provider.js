import CacheContext from "./cache-context.js";
import { useState } from "react";

export const CacheProvider = ({ children }) => {
    const [cacheData, setCacheData] = useState({});

    // update the cache
    const updateCacheData = (newData) => {
        setCacheData((prevCacheData) => ({ ...prevCacheData, ...newData }));
    };

    return (
        <CacheContext.Provider value={{ cacheData, updateCacheData }}>
            {children}
        </CacheContext.Provider>
    );
};
