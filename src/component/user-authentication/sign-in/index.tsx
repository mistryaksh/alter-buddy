import React, { FC, useState } from "react";
import { AuthModalBody } from "../../modal-components";
import { AppButton, TextField } from "../../UI";
import { UserLoginProps } from "../../../interface";
import { Formik } from "formik";
import {
  SignInInitialState,
  SignInValidationSchema,
} from "../../../validation";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

interface SignInBodyProps {
  loginFunc: ({ mobile, password }: UserLoginProps) => void;
  loading?: boolean;
}

export const SignInBody: FC<SignInBodyProps> = ({ loginFunc, loading }) => {
  const [accept, setAccept] = useState<boolean>(false);

  const handlePrivacyAccept = () => {
    setAccept(!accept);
  };

  const navigate = useNavigate();
  const [password, showPassword] = useState<boolean>(false);

  return (
    <div className="flex flex-col items-center gap-5 mx-auto w-[60%] h-full justify-center">
      <AuthModalBody
        modalTitle="Continue with sign in"
        header={{
          btnLabel: "create account",
          title: "Not have an account?",
          switcher: () => navigate("/sign-up"),
        }}
      >
        {/* {error?.length && <p className="text-red-500 uppercase text-center">{error}</p>} */}
        <Formik
          initialValues={SignInInitialState}
          validationSchema={SignInValidationSchema}
          onSubmit={loginFunc}
        >
          {({
            errors,
            values,
            handleBlur,
            touched,
            handleChange,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <div className="p-3 w-full flex flex-col gap-5">
                <TextField
                  value={values.mobile}
                  onChange={handleChange("mobile")}
                  onBlur={handleBlur("mobile")}
                  placeholder="Mobile Number / Email Address"
                  label="Enter email / mobile"
                  error={errors.mobile}
                  touched={touched.mobile}
                />
                <div className="flex items-center">
                  <TextField
                    placeholder="choose secure password"
                    label="enter password"
                    type={!password ? "password" : "text"}
                    value={values.password}
                    onChange={handleChange("password")}
                    onBlur={handleBlur("password")}
                    error={errors.password}
                    touched={touched.password}
                  />
                  <button type="button" onClick={() => showPassword(!password)}>
                    {password ? (
                      <AiOutlineEyeInvisible size={24} />
                    ) : (
                      <AiOutlineEye size={24} />
                    )}
                  </button>
                </div>
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
                      navigate("/privacy-policy");
                    }}
                    className="underline text-primary-500 cursor-pointer"
                  >
                    Terms & Condition
                  </span>{" "}
                  &{" "}
                  <span
                    onClick={() => {
                      navigate("/privacy-policy");
                    }}
                    className="underline text-primary-500 cursor-pointer"
                  >
                    Privacy Policy
                  </span>
                </label>
              </div>
              <div className="mt-4">
                <AppButton
                  disabled={!accept}
                  loading={loading}
                  type="submit"
                  filled
                  flexed
                >
                  Continue to login
                </AppButton>
              </div>
              <div className="mt-4">
                <AppButton flexed type="button">
                  Back to Home
                </AppButton>
              </div>
            </form>
          )}
        </Formik>
      </AuthModalBody>
    </div>
  );
};
