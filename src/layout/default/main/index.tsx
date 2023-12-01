import React, { FC, ReactNode, useEffect } from "react";

import { MainNavBar, MainFooter } from "../";
import clsx from "clsx";
import {
     handleAuthModal,
     handleAuthModalView,
     handleDarkMode,
     handleMobileMenu,
     useLayoutSlice,
} from "../../../redux/features";
import { useAppDispatch } from "../../../redux";
import { AuthModel } from "../../../component";

interface MainLayoutProps {
     children: ReactNode;
}

export const MainLayout: FC<MainLayoutProps> = ({ children }) => {
     const { darkMode, mobileMenu, authModal, modalView } = useLayoutSlice();
     const dispatch = useAppDispatch();
     const browserMode = localStorage.getItem("darkMode");
     useEffect(() => {
          if (!browserMode) {
               dispatch(handleDarkMode());
          }
     }, [browserMode, dispatch]);

     const viewSwitcher = (btnType: string | null) => {
          if (btnType === "onboard") {
               dispatch(handleAuthModalView("signin"));
          }
          if (btnType === "signin") {
               dispatch(handleAuthModalView("signup"));
          }
          if (btnType === "signup") {
               dispatch(handleAuthModalView("signin"));
          }
     };

     return (
          <div className="relative z-10">
               <MainNavBar
                    authModal={() => dispatch(handleAuthModal())}
                    mobile={mobileMenu}
                    handleMenu={() => dispatch(handleMobileMenu())}
                    darkMode={darkMode}
                    toggle={() => dispatch(handleDarkMode())}
               />
               <main className={clsx(darkMode ? "dark" : "light", "mt-20")}>{children}</main>
               <MainFooter darkMode={darkMode} toggle={() => dispatch(handleDarkMode())} />
               {authModal && (
                    <AuthModel
                         viewSwitcher={() => viewSwitcher(modalView)}
                         viewType={modalView}
                         modalHandler={() => dispatch(handleAuthModal())}
                    />
               )}
          </div>
     );
};
