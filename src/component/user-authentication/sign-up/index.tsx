import React, { FC, useState } from "react";
import { AuthModalHeader } from "../../modal-components";
import { AppButton, TextField } from "../../UI";
import { UserRegisterProps } from "../../../interface";
import { Formik } from "formik";
import { SignUpValidationSchema } from "../../../validation";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

interface SignUpBodyProps {
  registerFunc: ({
    email,
    fname,
    lname,
    mobile,
    password,
  }: UserRegisterProps) => void;
  loading?: boolean;
}

export const SignUpBody: FC<SignUpBodyProps> = ({ registerFunc, loading }) => {
  const [accept, setAccept] = useState<boolean>(false);
  const [password, showPassword] = useState<boolean>(false);

  const navigate = useNavigate();
  const handlePrivacyAccept = () => {
    setAccept(!accept);
  };
  return (
    <div className="flex flex-col items-center gap-3 mx-auto w-[70%] shadow-lg border py-10 rounded-lg">
      <h1 className="text-3xl font-semibold text-center capitalize">
        Create New Account
      </h1>
      <AuthModalHeader
        action={() => navigate("/sign-in")}
        btnText="Sign In"
        title="Already Have Account"
      />
      {/* {error} */}
      <Formik
        validationSchema={SignUpValidationSchema}
        initialValues={{
          email: "",
          fname: "",
          lname: "",
          mobile: "",
          password: "",
          c_password: "",
        }}
        onSubmit={registerFunc}
      >
        {({
          values,
          touched,
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit} className="w-full">
            <div className="p-3 w-full flex flex-col gap-5 px-5">
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
                maxLength={10}
                minLength={10}
                error={errors.mobile}
                touched={touched.mobile}
              />
              <div className="flex items-center gap-5">
                <TextField
                  placeholder="Choose secure password"
                  label="enter password"
                  type={password ? "password" : "text"}
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
              <TextField
                placeholder="Matched entered password"
                label="Confirm Password"
                type={password ? "password" : "text"}
                value={values.password}
                onChange={handleChange("password")}
                onBlur={handleBlur("password")}
                error={errors.password}
                touched={touched.password}
              />
            </div>
            <div className="flex gap-3 items-center pl-5 py-3">
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
            <div className="flex justify-end px-5">
              <AppButton
                disabled={!accept}
                loading={loading}
                type="submit"
                filled
              >
                Sign up account
              </AppButton>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};
