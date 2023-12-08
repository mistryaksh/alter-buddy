import React, { FC } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useLayoutSlice } from "../../../redux/features";
import clsx from "clsx";
import { AuthModalFooter } from "../../modal-components";
import { AuthOnboardBody, SignInBody, SignUpBody } from "../../user-authentication";

interface AuthModalProps {
     modalHandler: () => void;
     viewType: ModelType;
     viewSwitcher: (btnType: string | null) => void;
}

type ModelType = "signin" | "signup" | "onboard";

export const AuthModel: FC<AuthModalProps> = ({ modalHandler, viewType, viewSwitcher }) => {
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
                                        <SignInBody viewSwitcher={viewSwitcher as unknown as any} />
                                   )}
                                   {viewType === "signup" && (
                                        <SignUpBody viewSwitcher={viewSwitcher as unknown as any} />
                                   )}
                                   {/* only footer shows to sign up & onboard */}
                                   {viewType !== "signin" && <AuthModalFooter />}
                              </div>
                         </div>
                    </div>
               </div>
               <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
     );
};
