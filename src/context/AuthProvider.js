///////////////////////
//// Build
import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
///////////////////////
//// Environmental
export const AuthContext = createContext({} );
const { REACT_APP_API_URL } = process.env;
///////////////////////
//// External


export default function AuthProvider({ children }) {
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

    function loginUser(JWT) {
        localStorage.setItem('token', JWT);
        const decoded = jwt_decode(JWT);

        fetchUserData(decoded.sub, JWT, '/profile');
    }

    function logout() {
        localStorage.clear();
        toggleIsAuth({
            isAuth: false,
            user: null,
            status: 'done',
        });

        console.log('User is logged out');
        navigate.push('/');
    }

    async function fetchUserData(id, token, redirectUrl) {
        try {
            const result = await axios.get(`${ REACT_APP_API_URL }users/${ id }`, {
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
                    id: result.data.id,
                },
                status: 'done',
            });

            if (redirectUrl) {
                navigate(redirectUrl);
            }

        } catch (e) {
            console.error(e);
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
        loginUser: loginUser,
        logout: logout,
    };


    return (
        <AuthContext.Provider
            value={ { contextData } }>
            { children }
        </AuthContext.Provider>
    );
};


