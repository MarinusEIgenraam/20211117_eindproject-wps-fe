///////////////////////
//// Build
import React, { createContext, useState } from "react";


///////////////////////
//// Environmental

///////////////////////
//// External

export const UtilityContext = createContext();


export default function UtilityProvider({ children }) {
    const [ theme, setTheme ] = useState("light");
    const [ isLoading, setIsLoading ] = useState(false);
    const [ hasError, setHasError ] = useState(false)
    const [ creationCount, setCreationCount ] = useState(0)

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
                hasError,
                setHasError,
                theme,
                toggleTheme,
                isLoading,
                setIsLoading,
                creationCount,
                setCreationCount
            } }>
            { children }
        </UtilityContext.Provider>
    );
};


