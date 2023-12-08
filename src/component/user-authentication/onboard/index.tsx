import React, { FC } from "react";
import { AuthModalBody } from "../../modal-components";
import { AppButton } from "../../UI";

interface OnboardBodyProps {
     viewSwitcher: () => void;
}

export const AuthOnboardBody: FC<OnboardBodyProps> = ({ viewSwitcher }) => {
     return (
          <div className="flex flex-col items-center gap-5 mx-auto w-[40%]">
               <AuthModalBody
                    modalTitle="Continue to emails"
                    header={{
                         btnLabel: "Login",
                         title: "already a member?",
                         switcher: viewSwitcher,
                    }}
               >
                    <div className="flex flex-col gap-5">
                         <button className="border rounded-md p-3 w-full text-primary-500 capitalize border-primary-500">
                              Sign up with google
                         </button>
                         <button className="rounded-md p-3 w-full capitalize  bg-[#1878f2] text-white">
                              Sign up with facebook
                         </button>
                         <hr />
                         <AppButton onClick={viewSwitcher as unknown as any} outlined>
                              Sign up with email
                         </AppButton>
                    </div>
               </AuthModalBody>
          </div>
     );
};
