import { createApi } from "@reduxjs/toolkit/query/react";
import { ApiBaseQuery, baseQueryUser } from "../../utils";
import { ITopMentorProps, IMentorProps } from "../../interface";

const MentorApi = createApi({
     baseQuery: ApiBaseQuery(baseQueryUser),
     reducerPath: "mentorApi",
     tagTypes: ["mentor"],
     endpoints: ({ mutation, query }) => ({
          GetMentorsList: query<{ data: IMentorProps[] }, void>({
               query: () => `/mentor`,
          }),
          GetTopMentorList: query<{ data: ITopMentorProps[] }, void>({
               query: () => `/top-mentor`,
          }),
          GetMentorByCategory: query<{ data: IMentorProps[] }, string>({
               query: (id: string) => `/get-mentor/category/${id}`,
          }),

          GetMentorBySubCategory: query<{ data: IMentorProps[] }, string>({
               query: (id: string) => `/get-mentor/sub-category/${id}`,
          }),
          GetMentorUsingId: query<{ data: IMentorProps }, string>({
               query: (id: string) => `/mentor/profile/${id}`,
          }),
     }),
});

export const {
     useGetMentorsListQuery,
     useGetTopMentorListQuery,
     useGetMentorByCategoryQuery,
     useGetMentorUsingIdQuery,
     useGetMentorBySubCategoryQuery,
     useLazyGetMentorByCategoryQuery,
     useLazyGetMentorBySubCategoryQuery,
} = MentorApi;
export const MentorApiReducer = MentorApi.reducer;
export const MentorApiMiddleware = MentorApi.middleware;
