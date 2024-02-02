import React from "react";
import { redirect, Outlet, Navigate } from "react-router-dom";

const user = localStorage.getItem("tokenUser");

export const UserLogin = () => {
     if (user) {
          return <Navigate to="/" />
     }
     return <Outlet />
}

export const ProtechUser = () => {
     if (!user) {
          return <Navigate to="/login" />
     }
     return <Outlet />
}