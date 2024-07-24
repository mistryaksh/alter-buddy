import React, { FC } from "react";
import { AuthModalBody } from "../../modal-components";
import { AppButton, TextField } from "../../UI";
import { UserLoginProps } from "../../../interface";
import { Formik } from "formik";
import {
  SignInInitialState,
  SignInValidationSchema,
} from "../../../validation";

interface SignInBodyProps {
  viewSwitcher: () => void;
  loginFunc: ({ mobile, password }: UserLoginProps) => void;
  loading?: boolean;
  error: string | null;
}

export const SignInBody: FC<SignInBodyProps> = ({
  viewSwitcher,
  loginFunc,
  error,
  loading,
}) => {
  return (
    <div className="flex flex-col items-center gap-5 mx-auto w-[60%]  h-full justify-center">
      <AuthModalBody
        modalTitle="Continue with sign in"
        header={{
          btnLabel: "create account",
          title: "Not have an account?",
          switcher: viewSwitcher,
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
                  placeholder="8669026895"
                  label="Enter mobile"
                  type="number"
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
              <AppButton loading={loading} type="submit" filled flexed>
                Continue to login
              </AppButton>
            </form>
          )}
        </Formik>
      </AuthModalBody>
    </div>
  );
};
