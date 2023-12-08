import React, { FC } from "react";
import { AuthModalBody } from "../../modal-components";
import { AppButton, TextField } from "../../UI";

interface SignInBodyProps {
     viewSwitcher: () => void;
}

export const SignInBody: FC<SignInBodyProps> = ({ viewSwitcher }) => {
     return (
          <div className="flex flex-col items-center gap-5 mx-auto w-[60%]">
               <AuthModalBody
                    modalTitle="Continue with sign in"
                    header={{
                         btnLabel: "create account",
                         title: "Not have an account?",
                         switcher: viewSwitcher,
                    }}
               >
                    <div className="p-3 w-full flex flex-col gap-5">
                         <TextField placeholder="abc123@mail.com" label="Email address" type="email" />

                         <TextField placeholder="choose secure password" label="password" type="email" />
                    </div>
                    <AppButton filled>Continue to login</AppButton>
               </AuthModalBody>
          </div>
     );
};
