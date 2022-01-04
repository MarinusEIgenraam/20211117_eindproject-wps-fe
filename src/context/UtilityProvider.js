///////////////////////
//// Build
import React, { createContext, useState } from "react";


///////////////////////
//// Environmental

///////////////////////
//// External

export const UtilityContext = createContext(null);


export default function UtilityProvider({ children }) {
    const [ nightMode, setNightMode ] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    function toggleNightMode() {setNightMode(!nightMode)};
    function toggleLoading() {setIsLoading(!isLoading)};


    return (
        <UtilityContext.Provider
            value={ {
                nightMode,
                toggleNightMode,
                isLoading,
                toggleLoading
            } }>
            { children }
        </UtilityContext.Provider>
    );
};


