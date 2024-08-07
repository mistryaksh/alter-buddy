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
import { useAppDispatch } from "../../../redux";
import { handleAuthModal } from "../../../redux/features";

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
  const [accept, setAccept] = useState<boolean>(false);

  const handlePrivacyAccept = () => {
    setAccept(!accept);
  };

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center gap-5 mx-auto w-[60%] h-full justify-center">
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
                  placeholder="1234567890"
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
                    Terms & Condition
                  </span>{" "}
                  &{" "}
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
              <AppButton
                disabled={!accept}
                loading={loading}
                type="submit"
                filled
                flexed
              >
                Continue to login
              </AppButton>
            </form>
          )}
        </Formik>
      </AuthModalBody>
    </div>
  );
};
