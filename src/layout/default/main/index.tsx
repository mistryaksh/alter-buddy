import React, { FC, ReactNode, useEffect } from "react";

import { MainNavBar, MainFooter } from "../";
import clsx from "clsx";
import { handleDarkMode, handleMobileMenu, useLayoutSlice } from "../../../redux/features";
import { useAppDispatch } from "../../../redux";

interface MainLayoutProps {
     children: ReactNode;
}

export const MainLayout: FC<MainLayoutProps> = ({ children }) => {
     const { darkMode, mobileMenu } = useLayoutSlice();
     const dispatch = useAppDispatch();
     const browserMode = localStorage.getItem("darkMode");
     useEffect(() => {
          if (!browserMode) {
               dispatch(handleDarkMode());
          }
     }, [browserMode, dispatch]);

     return (
          <div className="relative z-10">
               <MainNavBar
                    mobile={mobileMenu}
                    handleMenu={() => dispatch(handleMobileMenu())}
                    darkMode={darkMode}
                    toggle={() => dispatch(handleDarkMode())}
               />
               <main className={clsx(darkMode ? "dark" : "light", "mt-20")}>{children}</main>
               <MainFooter darkMode={darkMode} toggle={() => dispatch(handleDarkMode())} />
          </div>
     );
};
