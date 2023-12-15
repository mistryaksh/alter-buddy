import React, { FC, ReactNode } from "react";

import { Provider as ReduxProvider } from "react-redux";
import { AppStore } from "../redux";
import { BrowserRouter } from "react-router-dom";

interface AppProviderProps {
     children: ReactNode;
}

export const AppProvider: FC<AppProviderProps> = ({ children }) => {
     return (
          <ReduxProvider store={AppStore}>
               <BrowserRouter>{children}</BrowserRouter>
          </ReduxProvider>
     );
};
