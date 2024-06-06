import React, { useEffect } from "react";
import { MainLayout } from "../../../../layout";
import { AppButton, TextField } from "../../../../component";
import { Link, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { IMentorAuthProps } from "../../../../interface";
import {
  MentorSignInProps,
  MentorSignInValidationSchema,
} from "../../../../validation";
import { useAppDispatch } from "../../../../redux";
import { useMentorSignInMutation } from "../../../../redux/rtk-api";
import {
  handleError,
  handleMentorAuthentication,
  // useLayoutSlice,
} from "../../../../redux/features";
import { getMentorToken, setMentorToken } from "../../../../utils";

export const MentorLoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // const { error } = useLayoutSlice();
  const [
    MentorSignIn,
    {
      isError: isMentorError,
      error: mentorError,
      isLoading: isMentorLoading,
      isSuccess: isMentorSuccess,
      data: mentorData,
    },
  ] = useMentorSignInMutation();
  const localStore = getMentorToken();

  useEffect(() => {
    if (isMentorError) {
      if ((mentorError as any)?.data) {
        dispatch(handleError((mentorError as any)?.data?.message));
      } else {
        console.log(mentorError);
      }
    }
    if (isMentorSuccess) {
      dispatch(handleError(null));
      setMentorToken(mentorData?.data?.token as string);
      if (localStore) {
        dispatch(
          handleMentorAuthentication({
            token: mentorData?.data.token as string,
          })
        );
      }
      navigate("/mentor/dashboard");
    }
  }, [
    isMentorError,
    mentorError,
    dispatch,
    isMentorSuccess,
    mentorData,
    localStore,
    navigate,
  ]);

  const handleSubmit = async ({ password, username }: IMentorAuthProps) => {
    await MentorSignIn({ username, password });
  };

  return (
    <MainLayout hideNav>
      <div className="flex justify-center h-screen items-center bg-gradient-to-tr from-primary-100 to-white">
        <div className="w-[50%] px-10 py-5 shadow-lg bg-white rounded-md flex flex-col">
          <h6 className="text-2xl font-bold text-primary-500">
            Sign in to your account
          </h6>
          <p className="text-gray-500 capitalize">
            Problem while loging?{" "}
            <span className="text-primary-500 underline">
              click here for how to?
            </span>
          </p>
          <Formik
            initialValues={MentorSignInProps}
            validationSchema={MentorSignInValidationSchema}
            onSubmit={handleSubmit}
          >
            {({
              handleBlur,
              handleChange,
              handleSubmit,
              touched,
              values,
              errors,
            }) => (
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-5 mt-5">
                  {/* <p className="text-center text-red-500 uppercase text-sm">
                    {error}
                  </p> */}
                  <TextField
                    onChange={handleChange("username")}
                    onBlur={handleBlur("username")}
                    value={values.username}
                    touched={touched.username}
                    error={errors.username}
                    outlined
                    label="username"
                    placeholder="Enter your username"
                  />
                  <TextField
                    type="password"
                    onChange={handleChange("password")}
                    onBlur={handleBlur("password")}
                    value={values.password}
                    touched={touched.password}
                    error={errors.password}
                    outlined
                    placeholder="Enter your password"
                    label="password"
                  />
                  <Link
                    to="/mentor/reset-password"
                    className="text-primary-500 underline"
                  >
                    Forgot password?
                  </Link>
                  <AppButton type="submit" loading={isMentorLoading} outlined>
                    Continue
                  </AppButton>
                  <AppButton type="button" onClick={() => navigate("/")} filled>
                    Go back
                  </AppButton>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </MainLayout>
  );
};
