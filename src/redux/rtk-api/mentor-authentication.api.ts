import { createApi } from "@reduxjs/toolkit/query/react";
import { ApiBaseQuery, baseQueryMentor } from "../../utils";
import {
  IConfirmSlotProps,
  IMentorAuthProps,
  IMentorProps,
} from "../../interface";

const MentorAuthenticationApi = createApi({
  baseQuery: ApiBaseQuery(baseQueryMentor),
  reducerPath: "mentorAuthenticationApi",
  endpoints: ({ mutation, query }) => ({
    MentorSignIn: mutation<
      { data: { message: string; token: string; user: IMentorAuthProps } },
      any
    >({
      query: ({ password, username }: IMentorAuthProps) => {
        return {
          url: `/mentor/sign-in`,
          method: "PUT",
          body: {
            username,
            password,
          },
        };
      },
    }),
    MentorProfile: query<{ data: IMentorProps }, void>({
      query: () => `/mentor/profile`,
    }),
    MentorSignOut: mutation<{ data: string }, void>({
      query: () => {
        return {
          url: "/mentor/sign-out",
          method: "POST",
        };
      },
    }),
    ConfirmSlot: mutation<{ data: string }, IConfirmSlotProps>({
      query: ({ slotId, mentorId, userId }: IConfirmSlotProps) => {
        return {
          url: `/confirm-slot`,
          method: "PUT",
          body: {
            slotId,
            mentorId,
            userId,
          },
        };
      },
    }),
    CancelSlot: mutation<{ data: string }, string>({
      query: (slotId: string) => {
        return {
          url: `/cancel-slot/`,
          method: "PUT",
          body: slotId,
        };
      },
    }),
  }),
});

export const MentorAuthenticationApiMiddleware =
  MentorAuthenticationApi.middleware;
export const MentorAuthenticationApiReducer = MentorAuthenticationApi.reducer;
export const {
  useMentorProfileQuery,
  useMentorSignInMutation,
  useMentorSignOutMutation,
  useConfirmSlotMutation,
  useCancelSlotMutation,
} = MentorAuthenticationApi;
