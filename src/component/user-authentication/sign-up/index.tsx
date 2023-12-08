import React, { FC } from "react";
import { AuthModalBody } from "../../modal-components";
import { AppButton, TextField } from "../../UI";

interface SignUpBodyProps {
     viewSwitcher: () => void;
}

export const SignUpBody: FC<SignUpBodyProps> = ({ viewSwitcher }) => {
     return (
          <div className="flex flex-col items-center gap-5 mx-auto w-[70%]">
               <AuthModalBody
                    modalTitle="Continue to creating account"
                    header={{
                         title: "Already a member",
                         btnLabel: "Login",
                         switcher: viewSwitcher,
                    }}
               >
                    <div className="p-3 w-full flex flex-col gap-5">
                         <div className="flex w-full gap-5">
                              <TextField placeholder="abc123@mail.com" label="Email address" type="email" />
                              <TextField placeholder="abc123@mail.com" label="Email address" type="email" />
                         </div>
                         <TextField placeholder="abc123@mail.com" label="Email address" type="email" />
                         <TextField placeholder="choose secure password" label="password" type="email" />
                    </div>
                    <AppButton filled>Continue to register</AppButton>
               </AuthModalBody>
          </div>
     );
};
