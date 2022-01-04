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

///////////////////////
//// Components
import App from './App';

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <UtilityContext>
                <AuthContext>
                    <App/>
                </AuthContext>
            </UtilityContext>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
