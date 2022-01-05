///////////////////////
//// Build
import React, { createContext, useEffect, useState } from "react";
import { Switch } from "react-router-dom";

///////////////////////
//// Environmental

///////////////////////
//// External

export const ThemeContext = createContext(null);

const darkTheme = {
    text: "var(--secondary)",
    sub_text: "var(--primary)",
    border: "var(--secondary-quarter)",
    windowBackground: "var(--white)",
    background: "var(--white)",
    shadow: "var(--shadow-thin-light)"
};

const lightTheme= {
    text: "var(--secondary)",
    border: "var(--secondary-quarter)",
    windowBackground: "var(--white)",
    background: "var(--white)",
    shadow: "var(--shadow-thin-light)"
};


export default function ThemeProvider({ children }) {
    const [themeState, setThemeState] = useState(true);
    const [ theme, setTheme ] = useState(lightTheme);

    useEffect(() => {
        if (themeState) {
            setTheme(lightTheme);
        } else {
            setTheme(darkTheme);
        }

    },[themeState]);

    function toggleTheme() {
        setThemeState(!themeState);
    }

    return (
        <ThemeContext.Provider
            value={ {
                toggleTheme,
                theme
            } }>
            { children }
        </ThemeContext.Provider>
    );
};


