import { createApi } from "@reduxjs/toolkit/query/react";
import { ApiBaseQuery, baseQueryMentor } from "../../utils";
import { IChatProps, IMentorCallScheduleProps } from "../../interface";

const CallApi = createApi({
  baseQuery: ApiBaseQuery(baseQueryMentor),
  reducerPath: "callApi",
  tagTypes: ["callApi"],
  endpoints: ({ query, mutation }) => ({
    MentorGetMyCalls: query<{ data: IChatProps[] }, void>({
      query: () => `/mentor/calls`,
    }),
    MentorGetMySchedules: query<{ data: IMentorCallScheduleProps[] }, void>({
      query: () => `/mentor/schedule`,
      providesTags: ["callApi"],
    }),
    UseWalletCoins: mutation<
      { data: "SUCCESS" | "FAILED" },
      { coinsToUsed: number; useType: string; userId: string }
    >({
      query: ({ coinsToUsed, useType, userId }) => {
        return {
          url: "/buddy-coins/use",
          method: "PUT",
          body: {
            coinsToUsed,
            useType,
            userId,
          },
        };
      },
    }),
    MentorCreateSchedule: mutation<{ data: string }, IMentorCallScheduleProps>({
      query: ({ slotsDate, slots }) => {
        return {
          url: `/mentor/schedule`,
          method: "POST",
          body: {
            slots,
            slotsDate,
          },
        };
      },
      invalidatesTags: ["callApi"],
    }),
    DeleteSlotAsMentorById: mutation<{ data: string }, string>({
      query: (id: string) => {
        return {
          url: `/mentor/schedule/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["callApi"],
    }),
    GetSlotsByMentorId: query<{ data: IMentorCallScheduleProps[] }, string>({
      query: (mentorId: string) => `/mentor/schedule/${mentorId}`,
    }),
    GetAllSlots: query<{ data: IMentorCallScheduleProps[] }, void>({
      query: () => `/all-slots`,
    }),
  }),
});

export const {
  useMentorGetMyCallsQuery,
  useMentorGetMySchedulesQuery,
  useMentorCreateScheduleMutation,
  useDeleteSlotAsMentorByIdMutation,
  useLazyGetSlotsByMentorIdQuery,
  useGetAllSlotsQuery,
  useUseWalletCoinsMutation,
} = CallApi;
export const CallApiReducer = CallApi.reducer;
export const CallApiMiddleware = CallApi.middleware;
