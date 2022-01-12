////////////////////
//// Build
import React, { useContext } from 'react'
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

////////////////////
//// Environmental

////////////////////
//// External

export default function PrivateRoutes({ children, ...rest }) {
    const { isAuth } = useContext(AuthContext);


    return isAuth ? children : <Navigate to='/'/>;

}


/** Created by ownwindows on 04-01-22 **/
