import clsx from "clsx";
import React, { FC } from "react";

interface MainFooterProps {
     darkMode: boolean;
     toggle: () => void;
}

export const MainFooter: FC<MainFooterProps> = ({ darkMode, toggle }) => {
     return (
          <div className={clsx(darkMode ? "dark" : "light")}>
               <footer className="bg-primary-100 py-10">
                    <p className="text-gray-500 text-center">© 2035 by Alterbuddy.</p>
               </footer>
          </div>
     );
};
