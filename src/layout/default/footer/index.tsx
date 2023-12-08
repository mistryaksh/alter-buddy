import clsx from "clsx";
import React, { FC } from "react";

interface MainFooterProps {
     darkMode: boolean;
     toggle: () => void;
}

export const MainFooter: FC<MainFooterProps> = ({ darkMode, toggle }) => {
     return (
          <div className={clsx(darkMode ? "dark" : "light")}>
               <footer className={clsx(darkMode ? "bg-primary-800" : "bg-primary-200", " py-10")}>
                    <p className={clsx(`text-center`, darkMode ? "text-white" : "text-black")}>© 2035 by Alterbuddy.</p>
               </footer>
          </div>
     );
};
