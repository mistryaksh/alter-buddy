import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuthenticationSlice } from "../../redux/features";

const PrivateRoutes = () => {
     const { authentication } = useAuthenticationSlice();
     return authentication ? <Outlet /> : <Navigate to="/" />;
};

export { PrivateRoutes };
