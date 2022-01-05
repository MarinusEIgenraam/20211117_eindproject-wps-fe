///////////////////////
//// Build
import React, { useContext } from "react";
import { ThemeProvider } from "styled-components";

///////////////////////
//// Environmental
import { UtilityContext } from "./UtilityProvider";

///////////////////////
//// External

const lightTheme = {
    text: "var(--secondary)",
    sub_text: "var(--primary)",
    border: "var(--secondary-quarter)",
    windowBackground: "var(--white)",
    background: "var(--quaternary-quarter)",
    shadow: "var(--shadow-thin-light)"
};

const darkTheme= {
    text: "var(--white)",
    sub_text: "var(--secondary-quarter)",
    border: "var(--secondary-quarter)",
    windowBackground: "var(--tertiary)",
    background: "var(--secondary)",
    shadow: "var(--shadow-thin-light)"
};

const themes = {
    light: lightTheme,
    dark: darkTheme,
}


export default function Theme({ children }) {
    const { theme } = useContext(UtilityContext);



    return (
        <ThemeProvider theme={themes[theme]}>
            { children }
        </ThemeProvider>
    );
};


