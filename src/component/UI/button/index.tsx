import clsx from "clsx";
import React, { FC } from "react";

interface AppButtonProps {
     filled?: boolean;
     outlined?: boolean;
}

export const AppButton: FC<
     AppButtonProps & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
> = ({ filled, outlined, children, ...rest }) => {
     return (
          <button
               className={clsx(
                    filled && `bg-primary-500`,
                    outlined &&
                         `border-2 border-primary-500 text-primary-500 text-sm hover:bg-primary-200 duration-150`,
                    `py-3 px-5 rounded-full capitalize`
               )}
               {...rest}
          >
               {children}
          </button>
     );
};
