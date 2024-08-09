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
  }),
});

export const {
  useMentorGetMyCallsQuery,
  useMentorGetMySchedulesQuery,
  useMentorCreateScheduleMutation,
  useDeleteSlotAsMentorByIdMutation,
  useLazyGetSlotsByMentorIdQuery,
} = CallApi;
export const CallApiReducer = CallApi.reducer;
export const CallApiMiddleware = CallApi.middleware;
