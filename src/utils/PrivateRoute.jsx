import React from "react";
import { Navigate } from "react-router-dom";
import {useBankStore} from "../store/useBankStore";

const PrivateRoute = ({children})=>{

    const isLoggedIn = useBankStore((state)=> state.isLoggedIn);

    return isLoggedIn ? children : <Navigate to="/signin" replace/>
}

export default PrivateRoute;