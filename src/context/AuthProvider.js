///////////////////////
//// Build
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import { UtilityContext } from "./UtilityProvider";
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
            fetchUserData(decoded.sub, token);
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
        fetchUserData(decoded.sub, JWT, '/me');
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

    function setRole(roles) {
        if (roles.some(e => e.authority === 'ROLE_ADMIN')) {
            return 'Project lord'
        } else if (roles.some(e => e.authority === 'ROLE_SUPER_USER')) {
            return 'Project manager'
        } else if (roles.some(e => e.authority === 'ROLE_USER')) {
            return 'Project fanatic';
        } else {
            return 'whatwhat?'
        }
    }

    async function fetchUserData(username, token, redirectUrl) {
        setHasError(false);
        setIsLoading(true);

        try {
            const result = await axios.get(`${ REACT_APP_API_URL }users/${ username }`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${ token }`,
                },
            });

            toggleIsAuth({
                ...isAuth,
                isAuth: true,
                user: {
                    username: result.data.username,
                    email: result.data.email,
                    authorities: setRole(result.data.authorities),
                    enabled: result.data.enabled
                },
                status: 'done',
            });

            if (redirectUrl) {
                navigate(redirectUrl);
            }
            setIsLoading(false);

        } catch (e) {
            console.error(e);
            setHasError(true);
            toggleIsAuth({
                isAuth: false,
                user: null,
                status: 'done',
            });
        }
    }


    const contextData = {
        isAuth: isAuth.isAuth,
        user: isAuth.user,
        login: login,
        logout: logout,
        setRole: setRole
    };


    return (
        <AuthContext.Provider
            value={ contextData }>
            { children }
        </AuthContext.Provider>
    );
};


