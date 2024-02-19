import clsx from "clsx";
import React, { FC } from "react";
import { AiOutlineLoading } from "react-icons/ai";

interface AppButtonProps {
     filled?: boolean;
     outlined?: boolean;
     flexed?: boolean;
     loading?: boolean;
     link?: boolean;
}

export const AppButton: FC<
     AppButtonProps & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
> = ({ filled, outlined, children, flexed, loading, link, ...rest }) => {
     return (
          <button
               className={clsx(
                    filled && `bg-primary-500 text-white disabled:bg-primary-300`,
                    outlined &&
                         `border-2 border-primary-500 text-primary-500 hover:text-white hover:dark:bg-primary-600 text-sm hover:bg-primary-200 duration-150 disabled:border-opacity-50 disabled:hover:bg-gray-200 disabled:bg-gray-200 disabled:text-gray-500 disabled:border-gray-500`,
                    flexed && `flex-1 w-full`,
                    `py-2 px-5 rounded-full capitalize flex items-center gap-5 justify-center`,
                    link && `text-primary-500 px-0 py-0`
               )}
               disabled={loading}
               {...rest}
          >
               {loading && <AiOutlineLoading size={22} className="animate animate-spin" color="#fff" />}
               {loading ? "please wait" : children}
          </button>
     );
};
