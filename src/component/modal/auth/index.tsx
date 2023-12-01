import React, { FC } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useLayoutSlice } from "../../../redux/features";
import clsx from "clsx";
import { AppButton, TextField } from "../../UI";
import { AuthModalBody, AuthModalFooter } from "../../modal-components";

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
                                   {viewType === "onboard" && (
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
                                   )}
                                   {viewType === "signin" && (
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
                                                       <TextField
                                                            placeholder="abc123@mail.com"
                                                            label="Email address"
                                                            type="email"
                                                       />

                                                       <TextField
                                                            placeholder="choose secure password"
                                                            label="password"
                                                            type="email"
                                                       />
                                                  </div>
                                                  <AppButton filled>Continue to login</AppButton>
                                             </AuthModalBody>
                                        </div>
                                   )}
                                   {viewType === "signup" && (
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
                                                            <TextField
                                                                 placeholder="abc123@mail.com"
                                                                 label="Email address"
                                                                 type="email"
                                                            />
                                                            <TextField
                                                                 placeholder="abc123@mail.com"
                                                                 label="Email address"
                                                                 type="email"
                                                            />
                                                       </div>
                                                       <TextField
                                                            placeholder="abc123@mail.com"
                                                            label="Email address"
                                                            type="email"
                                                       />
                                                       <TextField
                                                            placeholder="choose secure password"
                                                            label="password"
                                                            type="email"
                                                       />
                                                  </div>
                                                  <AppButton onClick={viewSwitcher as unknown as any} filled>
                                                       Continue to register
                                                  </AppButton>
                                             </AuthModalBody>
                                        </div>
                                   )}

                                   {viewType !== "signin" && <AuthModalFooter />}
                              </div>
                         </div>
                    </div>
               </div>
               <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
     );
};
