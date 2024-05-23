import { createApi } from "@reduxjs/toolkit/query/react";
import { ApiBaseQuery, baseQueryUser } from "../../utils";
import { callType, IChatProps } from "../../interface";

const VideoCallApi = createApi({
  baseQuery: ApiBaseQuery(baseQueryUser),
  reducerPath: "videoCallApi",
  endpoints: ({ mutation, query }) => ({
    GetMeetingCodes: mutation<{ data: any }, { audioCall: callType }>({
      query: ({ audioCall }) => {
        return {
          url: "/start-meeting",
          method: "POST",
          body: {
            audioCall: audioCall,
          },
        };
      },
    }),
    GetSessionById: query<{ data: IChatProps }, string>({
      query: (roomCode) => `/get-session/${roomCode}`,
    }),
  }),
});

export const VideoCallApiReducer = VideoCallApi.reducer;
export const VideoCallApiMiddleware = VideoCallApi.middleware;
export const {
  useGetMeetingCodesMutation,
  useGetSessionByIdQuery,
  useLazyGetSessionByIdQuery,
} = VideoCallApi;
