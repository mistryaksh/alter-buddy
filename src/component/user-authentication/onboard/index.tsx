import React, { FC } from "react";
import { AuthModalBody } from "../../modal-components";
import { AppButton } from "../../UI";
import { Link } from "react-router-dom";
import { handleAuthModal } from "../../../redux/features";
import { useAppDispatch } from "../../../redux";

interface OnboardBodyProps {
     viewSwitcher: () => void;
}

export const AuthOnboardBody: FC<OnboardBodyProps> = ({ viewSwitcher }) => {
     const dispatch = useAppDispatch();
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
                         <hr />
                         <AppButton onClick={viewSwitcher as unknown as any} outlined>
                              Sign up with email
                         </AppButton>
                    </div>
                    <div className="flex items-center mt-3 w-full justify-center">
                         <Link
                              onClick={() => dispatch(handleAuthModal())}
                              to="/mentor/login"
                              className="underline text-primary-500 uppercase text-center"
                         >
                              sign in as mentor panel
                         </Link>
                    </div>
               </AuthModalBody>
          </div>
     );
};
