///////////////////////
//// Build
import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

///////////////////////
//// Environmental
import AuthContext from "./context/AuthProvider";
import UtilityContext from "./context/UtilityProvider";
import ThemeContext from "./context/ThemeProvider";

///////////////////////
//// Components
import App from './App';

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <UtilityContext>
                <ThemeContext>
                    <AuthContext>
                        <App/>
                    </AuthContext>
                </ThemeContext>
            </UtilityContext>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();
