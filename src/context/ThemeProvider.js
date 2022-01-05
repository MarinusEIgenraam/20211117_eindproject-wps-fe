///////////////////////
//// Build
import React, { useContext } from "react";
import { ThemeProvider } from "styled-components";

///////////////////////
//// Environmental
import { UtilityContext} from "./UtilityProvider";
///////////////////////
//// External

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


