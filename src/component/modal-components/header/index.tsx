import React, { FC } from "react";

interface AuthModalHeaderProps {
     title: string;
     subTitle?: string;
     btn: {
          label: string;
          switcher?: (btnType: string | null) => void;
     };
}

export const AuthModalHeader: FC<AuthModalHeaderProps> = ({ title, subTitle, btn }) => {
     const { label, switcher } = btn;
     return (
          <div className="flex gap-2 justify-center w-full">
               <span className="capitalize">{title}</span>{" "}
               <button className="text-primary-500 capitalize" onClick={switcher as unknown as any}>
                    {label}
               </button>
          </div>
     );
};
