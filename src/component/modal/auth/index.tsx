import React, { FC } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { handleAuthModal, useLayoutSlice } from "../../../redux/features";
import clsx from "clsx";
import { AuthModalFooter } from "../../modal-components";
import { AuthOnboardBody, SignInBody, SignUpBody } from "../../user-authentication";
import { UserLoginProps, UserRegisterProps } from "../../../interface";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../../redux";

interface AuthModalProps {
     modalHandler: () => void;
     viewType: ModelType;
     viewSwitcher: (btnType: string | null) => void;
     loginFunc: ({ mobile, password }: UserLoginProps) => void;
     registerFunc: ({ email, fname, lname, mobile, password }: UserRegisterProps) => void;
     error: string | null;
     loading: boolean;
}

type ModelType = "signin" | "signup" | "onboard";

export const AuthModel: FC<AuthModalProps> = ({
     modalHandler,
     viewType,
     viewSwitcher,
     loginFunc,
     registerFunc,
     error,
     loading,
}) => {
     const dispatch = useAppDispatch();
     const { darkMode } = useLayoutSlice();
     return (
          <>
               <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="relative w-full h-full mx-auto">
                         {/*content*/}
                         <div
                              className={clsx(
                                   `border-0 rounded-lg shadow-lg relative flex flex-col w-full  outline-none justify-center items-center focus:outline-none h-full`,
                                   darkMode ? "dark" : "light"
                              )}
                         >
                              <div className="absolute right-20 top-20">
                                   <button onClick={modalHandler}>
                                        <AiOutlineClose size={30} />
                                   </button>
                              </div>
                              <div className="w-[60%] h-[60%] flex flex-col justify-between">
                                   {/* authentication component */}
                                   {/* ! :- SECURE COMPONENTS */}
                                   {viewType === "onboard" && (
                                        <AuthOnboardBody viewSwitcher={viewSwitcher as unknown as any} />
                                   )}
                                   {viewType === "signin" && (
                                        <SignInBody
                                             error={error}
                                             loading={loading}
                                             loginFunc={loginFunc}
                                             viewSwitcher={viewSwitcher as unknown as any}
                                        />
                                   )}
                                   {viewType === "signup" && (
                                        <SignUpBody
                                             error={error as string}
                                             loading={loading}
                                             registerFunc={registerFunc}
                                             viewSwitcher={viewSwitcher as unknown as any}
                                        />
                                   )}
                                   {/* only footer shows to sign up & onboard */}
                                   {viewType !== "signin" && <AuthModalFooter />}
                              </div>
                              <div className="text-center">
                                   <Link
                                        onClick={() => dispatch(handleAuthModal())}
                                        to="/mentor/login"
                                        className="underline text-primary-500 uppercase"
                                   >
                                        sign in to mentor panel
                                   </Link>
                              </div>
                         </div>
                    </div>
               </div>
               <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
     );
};
