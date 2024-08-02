import React, { FC, ReactNode, useCallback, useEffect, useState } from "react";

import { MainNavBar, MainFooter } from "../";
import clsx from "clsx";
import {
  handleAuthModal,
  handleAuthModalView,
  handleError,
  handleMobileMenu,
  handleUserAuthentication,
  handleUserLogout,
  useAuthenticationSlice,
  useLayoutSlice,
} from "../../../redux/features";
import { useAppDispatch } from "../../../redux";
import { AuthModel } from "../../../component";
import {
  useGetAllCategoryQuery,
  useGetAllSubCategoryQuery,
  useLazyGetNotificationsQuery,
  useLoginUserMutation,
  useLogoutUserMutation,
  useRegisterUserMutation,
} from "../../../redux/rtk-api";
import {
  ICategoryProps,
  ISubCategoryProps,
  UserLoginProps,
  UserRegisterProps,
} from "../../../interface";
import { getUserToken, removeUserToken, setUserToken } from "../../../utils";
import { AiOutlineLoading } from "react-icons/ai";
import Aos from "aos";

interface MainLayoutProps {
  children: ReactNode;
  hideNav?: boolean;
  loading?: boolean;
}

export const MainLayout: FC<MainLayoutProps> = ({
  children,
  hideNav,
  loading,
}) => {
  const { mobileMenu, authModal, modalView, error } = useLayoutSlice();
  const [offerModel, setOfferModel] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { authentication } = useAuthenticationSlice();
  const localStore = getUserToken();
  const {
    data: subCategory,
    isError: isSubCategoryError,
    isLoading: isSubCategoryLoading,
    error: subCategoryError,
  } = useGetAllSubCategoryQuery();
  const {
    data: category,
    isError: isCategoryError,
    isLoading: isCategoryLoading,
    error: categoryError,
  } = useGetAllCategoryQuery();
  const [
    LogoutApi,
    {
      isError: isLogoutError,
      isLoading: isLogoutLoading,
      isSuccess: isLogoutSuccess,
      error: logoutError,
    },
  ] = useLogoutUserMutation();
  const [
    LoginApi,
    {
      isError: isLoginError,
      error: loginError,
      isLoading: isLoginLoading,
      isSuccess: isLoginSuccess,
      data: loginData,
    },
  ] = useLoginUserMutation();
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
  const [
    GetNotification,
    {
      isError: isNotificationError,
      error: notificationError,
      data: notificationData,
      isLoading: isNotificationLoading,
      // isSuccess: isNotificationSuccess,
    },
  ] = useLazyGetNotificationsQuery();

  useEffect(() => {
    // setTimeout(() => {
    //   setOfferModel(true);
    // }, 3000);
    if (authentication) {
      (async () => {
        await GetNotification();
      })();
    }
    if (isLoginError) {
      if ((loginError as any)?.data) {
        dispatch(handleError((loginError as any).data.message));
      } else {
        console.log(loginError);
      }
    }
    if (isRegisterError) {
      if ((registerError as any)?.data) {
        dispatch(handleError((registerError as any).data.message));
      } else {
        console.log(registerError);
      }
    }
    if (isSubCategoryError) {
      if ((subCategoryError as any)?.data) {
        dispatch(handleError((subCategoryError as any).data.message));
      }
    }
    if (isCategoryError) {
      if ((categoryError as any)?.data) {
        dispatch(handleError((categoryError as any).data.message));
      }
    }
    if (isLogoutError) {
      if ((logoutError as any)?.data) {
        dispatch(handleError((logoutError as any).data.message));
      } else {
        console.log(logoutError);
      }
    }
    if (isNotificationError) {
      if ((notificationError as any)?.data) {
        dispatch(handleError((notificationError as any).data.message));
      }
    }
    if (isLoginSuccess) {
      dispatch(handleError(null));
      setUserToken(loginData?.data.token as string);
      if (localStore) {
        dispatch(
          handleUserAuthentication({
            token: loginData?.data.token as string,
          })
        );
      }
    }
    // if (isNotificationSuccess) {
    //   console.log("NOTIFICATION", notificationData?.data);
    // }
    if (isRegisterSuccess) {
      dispatch(handleError(null));
      setUserToken(registerData?.data.token as string);
      if (localStore) {
        dispatch(
          handleUserAuthentication({
            token: loginData?.data.token as string,
          })
        );
      }
    }
    if (isLogoutSuccess) {
      dispatch(handleUserLogout());
      dispatch(handleError(null));
      removeUserToken();
    }
    if (localStorage.getItem("USER_TOKEN")) {
      dispatch(
        handleUserAuthentication({
          token: localStore as string,
        })
      );
    }
    window.scrollTo(0, 0);
  }, [
    dispatch,
    isLoginError,
    loginError,
    isRegisterError,
    registerError,
    isLoginSuccess,
    isRegisterSuccess,
    loginData,
    registerData,
    localStore,
    isLogoutError,
    logoutError,
    isLogoutSuccess,
    isSubCategoryError,
    subCategoryError,
    isCategoryError,
    categoryError,
    isNotificationError,
    notificationError,
    // isNotificationSuccess,
    notificationData?.data,
    GetNotification,
    authentication,
  ]);

  const LoginFunc = useCallback(
    async ({ mobile, password }: UserLoginProps) => {
      await LoginApi({ mobile, password });
    },
    [LoginApi]
  );

  const RegisterFunc = async ({
    email,
    fname,
    lname,
    mobile,
    password,
  }: UserRegisterProps) => {
    await RegisterApi({ email, fname, lname, mobile, password });
  };
  const LogoutFunc = async () => {
    return LogoutApi();
  };

  const viewSwitcher = (btnType: string | null) => {
    if (btnType === "onboard") {
      dispatch(handleAuthModalView("signin"));
    }
    if (btnType === "signin") {
      dispatch(handleAuthModalView("signup"));
    }
    if (btnType === "signup") {
      dispatch(handleAuthModalView("signin"));
    }
  };
  useEffect(() => {
    Aos.init({});
  }, []);

  return (
    <div className="relative z-10">
      {!hideNav && (
        <MainNavBar
          category={category?.data as ICategoryProps[]}
          subCategory={subCategory?.data as ISubCategoryProps[]}
          navLoading={isLogoutLoading}
          logout={LogoutFunc}
          authenticated={authentication}
          authModal={() => dispatch(handleAuthModal())}
          mobile={mobileMenu}
          handleMenu={() => dispatch(handleMobileMenu())}
        />
      )}
      {/* <div className="">
        <div className="z-50 bg-primary-500 shadow-primary-300 scrollTop p-3 mb-20 rounded-xl fixed text-white shadow-xl">
          <a href="#sectionOne" className="w-full h-full">
            <FiChevronUp size={30} />
          </a>
        </div>
      </div> */}
      <main
        data-aos="fade-in"
        className={clsx(!hideNav && "mt-20", "relative", "z-10")}
      >
        {loading &&
        isSubCategoryLoading &&
        isCategoryLoading &&
        isNotificationLoading ? (
          <div className="flex h-[300px] justify-center items-center w-full">
            <AiOutlineLoading
              size={150}
              className="animate-spin text-primary-500"
            />
          </div>
        ) : (
          children
        )}
      </main>
      {offerModel && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    This is demo model if you want to show
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setOfferModel(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                    I always felt like I could do anything. That’s the main
                    thing people are controlled by! Thoughts- their perception
                    of themselves! They're slowed down by their perception of
                    themselves. If you're taught you can’t do anything, you
                    won’t do anything. I was taught I could do everything.
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-gray-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setOfferModel(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-primary-500 text-white active:bg-primary-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setOfferModel(false)}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}

      {!hideNav && <MainFooter />}
      {!authentication && authModal && (
        <AuthModel
          loading={isLoginLoading || isRegisterLoading}
          error={error}
          loginFunc={LoginFunc}
          registerFunc={RegisterFunc}
          viewSwitcher={() => viewSwitcher(modalView)}
          viewType={modalView}
          modalHandler={() => dispatch(handleAuthModal())}
        />
      )}
    </div>
  );
};
