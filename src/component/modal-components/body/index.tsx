import React, { FC, ReactNode } from "react";
import { AuthModalHeader } from "../header";

interface AuthModalBodyProps {
     children: ReactNode;
     modalTitle: string;
     header: {
          title: string;
          btnLabel: string;
          switcher?: (btnType: string | null) => void;
     };
}
export const AuthModalBody: FC<AuthModalBodyProps> = ({ children, header, modalTitle }) => {
     return (
          <div className="flex flex-col items-center gap-5 mx-auto w-full">
               <div className="w-full flex-1 gap-5 flex flex-col">
                    <h1 className="text-4xl text-center capitalize">{modalTitle}</h1>
                    <AuthModalHeader btn={{ label: header.btnLabel, switcher: header.switcher }} title={header.title} />
                    <main className="w-full flex flex-col gap-5">{children}</main>
               </div>
          </div>
     );
};
