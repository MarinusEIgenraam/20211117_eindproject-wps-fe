///////////////////////
//// Build
import React, { createContext, useState } from "react";


///////////////////////
//// Environmental

///////////////////////
//// External

export const UtilityContext = createContext(null);


export default function UtilityProvider({ children }) {
    const [ theme, setTheme ] = useState("light");
    const [isLoading, setIsLoading] = useState(false);

    function toggleLoading() {setIsLoading(!isLoading)};

    function toggleTheme() {
        if (theme === "light") {
            setTheme("dark");
        } else {
            setTheme("light");
        }
    }


    return (
        <UtilityContext.Provider
            value={ {
                theme,
                toggleTheme,
                isLoading,
                toggleLoading
            } }>
            { children }
        </UtilityContext.Provider>
    );
};


