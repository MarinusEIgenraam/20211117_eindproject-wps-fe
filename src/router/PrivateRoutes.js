////////////////////
//// Build
import React, { useState } from 'react'
import { Route, Navigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthProvider";

////////////////////
//// Environmental

////////////////////
//// External

export default function PrivateRoutes({ children, ...rest }) {
    const { isAuthenticated } = useContext(AuthContext);


    return isAuthenticated ? children : <Navigate to='/'/>;

}


/** Created by ownwindows on 04-01-22 **/
