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
    header: "var(--secondary-half)",
    sub_text: "var(--primary)",
    border: "var(--secondary-quarter)",
    windowBackground: "var(--quaternary-quarter)",
    boxShadow:"var(--quaternary-dark)",
    background: "var(--white)",
    shadow: "var(--shadow-thin-light)",
    createBorder: "var(--quaternary-half)",
    createBackground: "var(--white)",
    createBoxShadow:"var(--quaternary-quarter)",
    createSubText: "var(--primary)",
    createShadow: "var(--shadow-thin-create)"
};

const darkTheme= {
    text: "var(--white)",
    header: "var(--quaternary)",
    sub_text: "var(--secondary)",
    border: "var(--secondary-quarter)",
    windowBackground: "var(--tertiary)",
    createBackground: "var(--tertiary)",
    createBoxShadow:"var(--tertiary-quarter)",
    boxShadow:"var(--tertiary-quarter)",
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


