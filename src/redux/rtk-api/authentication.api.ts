import { createApi } from "@reduxjs/toolkit/query/react";

import { UserLoginProps, UserProps, UserRegisterProps } from "../../interface";
import { ApiBaseQuery, baseQueryUser } from "../../utils";

const AuthenticationApi = createApi({
     baseQuery: ApiBaseQuery(baseQueryUser),
     reducerPath: "authenticationApi",
     tagTypes: ["account"],
     endpoints: ({ mutation, query }) => ({
          LoginUser: mutation<{ data: { message: string; token: string; user: UserProps } }, any>({
               query: ({ mobile, password }: UserLoginProps) => {
                    return {
                         url: `/sign-in`,
                         body: {
                              mobile,
                              password,
                         },
                         method: "PUT",
                    };
               },
          }),
          RegisterUser: mutation<{ data: { message: string; token: string; user: UserProps } }, any>({
               query: ({ email, fname, lname, mobile, password }: UserRegisterProps) => {
                    return {
                         url: `/sign-up`,
                         body: {
                              name: {
                                   firstName: fname,
                                   lastName: lname,
                              },
                              email,
                              mobile,
                              password,
                         },
                         method: "POST",
                    };
               },
          }),
          LogoutUser: mutation<{}, void>({
               query: () => {
                    return {
                         url: `/sign-out`,
                         method: "PUT",
                    };
               },
               invalidatesTags: ["account"],
          }),
          ProfileUser: query<{ data: UserProps }, void>({
               query: () => "/user/profile",
          }),
          SendVerificationCode: mutation({
               query: (mobile: string) => {
                    return {
                         url: "/send/verify/mobile",
                         body: {
                              mobile,
                         },
                         method: "POST",
                    };
               },
          }),
          VerifyCode: mutation({
               query: ({ mobile, code }: { mobile: string; code: string }) => {
                    return {
                         url: "/verify/mobile-number",
                         body: {
                              mobile,
                              code,
                         },
                         method: "PUT",
                    };
               },
               invalidatesTags: ["account"],
          }),
     }),
});

export const {
     useLoginUserMutation,
     useRegisterUserMutation,
     useLazyProfileUserQuery,
     useProfileUserQuery,
     useLogoutUserMutation,
     useSendVerificationCodeMutation,
     useVerifyCodeMutation,
} = AuthenticationApi;
export const AuthenticationApiReducer = AuthenticationApi.reducer;
export const AuthenticationMiddleware = AuthenticationApi.middleware;
