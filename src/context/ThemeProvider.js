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
    createSubText: "var(--primary)",

    border: "var(--secondary-quarter)",
    createBorder: "var(--quaternary-half)",

    shadow: "var(--shadow-medium)",
    createShadow: "var(--shadow-medium-create)",

    topShadow: "var(--shadow-top-thin-light)",
    boxShadow: "var(--quaternary-dark)",
    createBoxShadow: "var(--quaternary-quarter)",

    createBackground: "var(--white)",
    background: "var(--white)",
    windowBackground: "var(--quaternary-quarter)",

    svg: "var(--svg-light)"
};

const darkTheme = {
    text: "var(--white)",
    header: "var(--quaternary)",
    sub_text: "var(--secondary)",

    border: "var(--secondary-quarter)",

    shadow: "var(--shadow-medium-revert)",
    createShadow: "var(--shadow-medium-create-revert)",

    boxShadow: "var(--tertiary-quarter)",
    createBoxShadow: "var(--tertiary-quarter)",
    topShadow: "var(--shadow-top-thin-light)",

    windowBackground: "var(--tertiary)",
    createBackground: "var(--tertiary)",
    background: "var(--secondary)",

    svg: "var(--svg-dark)"
};

const themes = {
    light: lightTheme,
    dark: darkTheme,
}


export default function Theme({ children }) {
    const { theme } = useContext(UtilityContext);


    return (
        <ThemeProvider theme={ themes[theme] }>
            { children }
        </ThemeProvider>
    );
};


