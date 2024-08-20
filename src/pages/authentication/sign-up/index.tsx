import React, { useEffect } from "react";
import { SignUpBody } from "../../../component";
import { useRegisterUserMutation } from "../../../redux/rtk-api";
import { toast } from "react-toastify";
import { getUserToken, setUserToken } from "../../../utils";
import { useAppDispatch } from "../../../redux";
import { handleUserAuthentication } from "../../../redux/features";
import { UserRegisterProps } from "../../../interface";

export const SignUpPage = () => {
  const [
    RegisterApi,
    {
      isError: isRegisterError,
      error: registerError,
      isLoading: isRegisterLoading,
      isSuccess: isRegisterSuccess,
      data: registerData,
    },
  ] = useRegisterUserMutation();
  const localStore = getUserToken();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isRegisterError) {
      if ((registerError as any)?.data) {
        toast.error(((registerError as any).data as any).message as any);
      } else {
        console.log(registerError);
      }
    }
    if (isRegisterSuccess) {
      setUserToken(registerData?.data.token as string);
      if (localStore) {
        dispatch(
          handleUserAuthentication({
            token: registerData?.data.token as string,
          })
        );
      }
    }
  }, [
    isRegisterError,
    registerError,
    isRegisterSuccess,
    registerData?.data,
    dispatch,
    localStore,
  ]);

  const RegisterFunc = async ({
    email,
    fname,
    lname,
    mobile,
    password,
  }: UserRegisterProps) => {
    await RegisterApi({ email, fname, lname, mobile, password });
  };
  return (
    <div className="w-[80%] mx-auto h-screen flex justify-center items-center">
      <SignUpBody loading={isRegisterLoading} registerFunc={RegisterFunc} />
    </div>
  );
};
