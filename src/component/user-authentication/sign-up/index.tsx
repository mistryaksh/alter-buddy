import React, { FC, useState } from "react";
import { AuthModalBody } from "../../modal-components";
import { AppButton, TextField } from "../../UI";
import { UserRegisterProps } from "../../../interface";
import { Formik } from "formik";
import { SignUpValidationSchema } from "../../../validation";
import { useNavigate } from "react-router-dom";
import { handleAuthModal } from "../../../redux/features";
import { useAppDispatch } from "../../../redux";

interface SignUpBodyProps {
     viewSwitcher: () => void;
     registerFunc: ({ email, fname, lname, mobile, password }: UserRegisterProps) => void;
     loading?: boolean;
     error: string;
}

export const SignUpBody: FC<SignUpBodyProps> = ({ viewSwitcher, registerFunc, loading, error }) => {
     const [accept, setAccept] = useState<boolean>(false);
     const dispatch = useAppDispatch();
     const navigate = useNavigate();
     const handlePrivacyAccept = () => {
          setAccept(!accept);
     };
     return (
          <div className="flex flex-col items-center gap-3 mx-auto w-[70%] ">
               <AuthModalBody
                    modalTitle="Continue to creating account"
                    header={{
                         title: "Already a member",
                         btnLabel: "Login",
                         switcher: viewSwitcher,
                    }}
               >
                    {error}
                    <Formik
                         validationSchema={SignUpValidationSchema}
                         initialValues={{ email: "", fname: "", lname: "", mobile: "", password: "" }}
                         onSubmit={registerFunc}
                    >
                         {({ values, touched, errors, handleBlur, handleChange, handleSubmit }) => (
                              <form onSubmit={handleSubmit}>
                                   <div className="p-3 w-full flex flex-col gap-5">
                                        <div className="flex w-full gap-5">
                                             <TextField
                                                  placeholder="Jhon"
                                                  label="First Name"
                                                  type="text"
                                                  onChange={handleChange("fname")}
                                                  onBlur={handleBlur("fname")}
                                                  error={errors.fname}
                                                  touched={touched.fname}
                                                  value={values.fname}
                                             />
                                             <TextField
                                                  placeholder="Doe"
                                                  label="Last Name"
                                                  type="text"
                                                  onChange={handleChange("lname")}
                                                  onBlur={handleBlur("lname")}
                                                  error={errors.lname}
                                                  touched={touched.lname}
                                                  value={values.lname}
                                             />
                                        </div>
                                        <TextField
                                             value={values.email}
                                             onChange={handleChange("email")}
                                             onBlur={handleBlur("email")}
                                             placeholder="abc123@gmail.com"
                                             label="Enter email address"
                                             type="email"
                                             error={errors.email}
                                             touched={touched.email}
                                        />
                                        <TextField
                                             value={values.mobile}
                                             onChange={handleChange("mobile")}
                                             onBlur={handleBlur("mobile")}
                                             placeholder="8669026895"
                                             label="Enter mobile"
                                             type="number"
                                             maxLength={10}
                                             minLength={10}
                                             error={errors.mobile}
                                             touched={touched.mobile}
                                        />
                                        <TextField
                                             placeholder="choose secure password"
                                             label="enter password"
                                             type="password"
                                             value={values.password}
                                             onChange={handleChange("password")}
                                             onBlur={handleBlur("password")}
                                             error={errors.password}
                                             touched={touched.password}
                                        />
                                   </div>
                                   <div className="flex gap-3 items-center pl-3 py-3">
                                        <input
                                             type="checkbox"
                                             className="w-4 rounded-full h-4"
                                             name="privacy"
                                             id="privacy"
                                             checked={accept}
                                             onChange={handlePrivacyAccept}
                                        />
                                        <label className="select-none" htmlFor="privacy">
                                             Accept{" "}
                                             <span
                                                  onClick={() => {
                                                       dispatch(handleAuthModal());
                                                       navigate("/privacy-policy");
                                                  }}
                                                  className="underline text-primary-500 cursor-pointer"
                                             >
                                                  Privacy Policy
                                             </span>
                                        </label>
                                   </div>
                                   <div className="flex justify-end">
                                        <AppButton disabled={!accept} loading={loading} type="submit" filled>
                                             Sign up account
                                        </AppButton>
                                   </div>
                              </form>
                         )}
                    </Formik>
               </AuthModalBody>
          </div>
     );
};
