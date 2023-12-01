import React, { FC } from "react";

interface TextFieldProps {
     label: string;
}

export const TextField: FC<
     React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & TextFieldProps
> = ({ label, ...rest }) => {
     return (
          <div className="group flex flex-col gap-2 w-full">
               <label htmlFor={label} className="capitalize group-hover:text-primary-500 text-gray-500 font-light">
                    {label}
               </label>
               <input
                    id={label}
                    className="border-b-2 text-primary-500 group-focus:border-primary-500 hover:border-primary-500 outline-none pb-2 flex-1 w-full bg-transparent"
                    {...rest}
               />
          </div>
     );
};
