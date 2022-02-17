///////////////////////
//// Build
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { UtilityContext } from "./UtilityProvider";
import { fetchUserData } from "../services/controllers/Auth";
///////////////////////
//// Environmental
export const AuthContext = createContext({});
const { REACT_APP_API_URL } = process.env;
///////////////////////
//// External


export default function AuthProvider({ children }) {
    const { setHasError, setIsLoading } = useContext(UtilityContext);


    const [ isAuth, toggleIsAuth ] = useState({
        isAuth: false,
        user: null,
        status: 'pending',
    });
    const navigate = useNavigate();


    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            const decoded = jwt_decode(token);
            fetchUserData(navigate, setHasError, setIsLoading, toggleIsAuth, isAuth, decoded.sub, token);
        } else {
            toggleIsAuth({
                isAuth: false,
                user: null,
                status: 'done',
            });
        }
    }, []);


    function login(JWT) {
        localStorage.setItem('token', JWT);
        const decoded = jwt_decode(JWT);
        fetchUserData(navigate, setHasError, setIsLoading, toggleIsAuth, isAuth, decoded.sub, JWT, '/me');
    }


    function logout() {
        localStorage.clear();
        toggleIsAuth({
            isAuth: false,
            user: null,
            status: 'done',
        });

        navigate('/');
    }


    const contextData = {
        isAuth: isAuth.isAuth,
        user: isAuth.user,
        login: login,
        logout: logout,
    };


    return (
        <AuthContext.Provider
            value={ contextData }>
            { children }
        </AuthContext.Provider>
    );
};


