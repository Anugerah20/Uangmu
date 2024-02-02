import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const user = localStorage.getItem("tokenUser");

export const UserLogin = () => {
     if (user) {
          return <Navigate to="/" />
     }
     return <Outlet />
}

export const ProtechUser = () => {
     if (!!user) {
          return <Navigate to="/login" />
     }
     return <Outlet />
}