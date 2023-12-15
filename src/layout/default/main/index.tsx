import React, { FC, ReactNode, useCallback, useEffect } from "react";

import { MainNavBar, MainFooter } from "../";
import clsx from "clsx";
import {
     handleAuthModal,
     handleAuthModalView,
     handleDarkMode,
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
     useLoginUserMutation,
     useLogoutUserMutation,
     useRegisterUserMutation,
} from "../../../redux/rtk-api";
import { ICategoryProps, ISubCategoryProps, UserLoginProps, UserRegisterProps } from "../../../interface";
import { getUserToken, removeUserToken, setUserToken } from "../../../utils";
import { AiOutlineLoading } from "react-icons/ai";

interface MainLayoutProps {
     children: ReactNode;
     hideNav?: boolean;
     loading?: boolean;
}

export const MainLayout: FC<MainLayoutProps> = ({ children, hideNav, loading }) => {
     const { darkMode, mobileMenu, authModal, modalView, error } = useLayoutSlice();
     const dispatch = useAppDispatch();
     const { authentication } = useAuthenticationSlice();
     const browserMode = localStorage.getItem("darkMode");
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
          { isError: isLogoutError, isLoading: isLogoutLoading, isSuccess: isLogoutSuccess, error: logoutError },
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

     useEffect(() => {
          if (!browserMode) {
               dispatch(handleDarkMode());
          }
          if (isLoginError) {
               if ((loginError as any).data) {
                    dispatch(handleError((loginError as any).data.message));
               }
          }
          if (isRegisterError) {
               if ((registerError as any).data) {
                    dispatch(handleError((registerError as any).data.message));
               }
          }
          if (isSubCategoryError) {
               if ((subCategoryError as any).data) {
                    dispatch(handleError((subCategoryError as any).data.message));
               }
          }
          if (isCategoryError) {
               if ((categoryError as any).data) {
                    dispatch(handleError((categoryError as any).data.message));
               }
          }
          if (isLogoutError) {
               if ((logoutError as any).data) {
                    dispatch(handleError((logoutError as any).data.message));
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
          if (localStore?.length) {
               dispatch(
                    handleUserAuthentication({
                         token: localStore as string,
                    })
               );
          }
     }, [
          browserMode,
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
     ]);

     const LoginFunc = useCallback(
          async ({ mobile, password }: UserLoginProps) => {
               await LoginApi({ mobile, password });
          },
          [LoginApi]
     );

     const RegisterFunc = async ({ email, fname, lname, mobile, password }: UserRegisterProps) => {
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
                         darkMode={darkMode}
                         toggle={() => dispatch(handleDarkMode())}
                    />
               )}
               <main className={clsx(darkMode ? "dark" : "light", !hideNav && "mt-20", "relative")}>
                    {loading && isSubCategoryLoading && isCategoryLoading ? (
                         <div className="flex h-[300px] justify-center items-center">
                              <AiOutlineLoading size={150} className="animate-spin text-primary-500" />
                         </div>
                    ) : (
                         children
                    )}
               </main>
               {!hideNav && <MainFooter darkMode={darkMode} toggle={() => dispatch(handleDarkMode())} />}
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
