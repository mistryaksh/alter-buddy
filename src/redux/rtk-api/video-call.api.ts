import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const VideoCallApi = createApi({
     baseQuery: fetchBaseQuery({
          baseUrl: process.env.REACT_APP_BACKEND_URL,
     }),
     reducerPath: "videoCallApi",
     endpoints: ({ mutation, query }) => ({
          GenerateVideoCallToken: query<any, void>({
               query: () => "/video-call-token",
          }),
          CreateMeetingWithToken: query<any, void>({
               query: () => `/create-meeting`,
          }),
          ValidateRoomId: mutation({
               query: ({ roomId, token }: { token: string; roomId: string }) => {
                    return {
                         url: `/validate-room`,
                         method: "POST",
                         body: {
                              token,
                              roomId,
                         },
                    };
               },
          }),
     }),
});

export const VideoCallApiReducer = VideoCallApi.reducer;
export const VideoCallApiMiddleware = VideoCallApi.middleware;
export const {
     useCreateMeetingWithTokenQuery,
     useGenerateVideoCallTokenQuery,
     useValidateRoomIdMutation,
     useLazyGenerateVideoCallTokenQuery,
} = VideoCallApi;
