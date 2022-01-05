///////////////////////
//// Build
import React, { createContext, useState } from "react";
import { Switch } from "react-router-dom";

///////////////////////
//// Environmental

///////////////////////
//// External

export const AuthContext = createContext(null);


export default function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userType, storeUserType] = useState("visitor")
    const [ authState, setAuthState ] = useState(
        {
            username: '',
            userType: '',
            email: ''
        });

    function toggleAuthenticated() {
        setIsAuthenticated(!isAuthenticated);
    }

    function setUserType(userType) {
        setUserType(userType)
    }


    return (
        <AuthContext.Provider
            value={ {
                authState,
                setAuthState,
                isAuthenticated,
                toggleAuthenticated,
                setUserType,
            } }>
            { children }
        </AuthContext.Provider>
    );
};


