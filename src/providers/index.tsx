import React, { FC, ReactNode } from "react";

import { Provider as ReduxProvider } from "react-redux";
import { AppStore } from "../redux";
import { BrowserRouter } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

interface AppProviderProps {
     children: ReactNode;
}

export const AppProvider: FC<AppProviderProps> = ({ children }) => {
     return (
          <ReduxProvider store={AppStore}>
               <ToastContainer position="top-right" autoClose={2000} />
               <BrowserRouter>{children}</BrowserRouter>
          </ReduxProvider>
     );
};
