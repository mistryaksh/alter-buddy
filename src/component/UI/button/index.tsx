import clsx from "clsx";
import React, { FC } from "react";

interface AppButtonProps {
     filled?: boolean;
     outlined?: boolean;
     flexed?: boolean;
}

export const AppButton: FC<
     AppButtonProps & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
> = ({ filled, outlined, children, flexed, ...rest }) => {
     return (
          <button
               className={clsx(
                    filled && `bg-primary-500 text-white`,
                    outlined &&
                         `border-2 border-primary-500 text-primary-500 hover:text-white hover:dark:bg-primary-600 text-sm hover:bg-primary-200 duration-150`,
                    `py-3 px-5 rounded-full capitalize`,
                    flexed && `flex-1 w-full`
               )}
               {...rest}
          >
               {children}
          </button>
     );
};
