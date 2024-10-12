import { createApi } from "@reduxjs/toolkit/query/react";
import { ApiBaseQuery, baseQueryUser } from "../../utils";
import { ITopMentorProps, IMentorProps, IPackagesProps } from "../../interface";

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
    BookMentorSlot: mutation<
      { data: any },
      {
        userId: string;
        slotId: string;
        mainId: string;
        mentorId: string;
        callType: string;
      }
    >({
      query: ({
        slotId,
        userId,
        mainId,
        mentorId,
        callType,
      }: {
        userId: string;
        slotId: string;
        mainId: string;
        mentorId: string;
        callType: string;
      }) => {
        return {
          url: "/slot/book",
          method: "PUT",
          body: {
            userId,
            slotId,
            mainId,
            mentorId,
            callType,
          },
        };
      },
    }),
    GetMentorPackagesById: query<{ data: IPackagesProps[] }, string>({
      query: (mentorId) => `/packages/mentor/${mentorId}`,
    }),
  }),
});

export const {
  useGetMentorsListQuery,
  useGetTopMentorListQuery,
  useGetMentorByCategoryQuery,
  useGetMentorUsingIdQuery,
  useLazyGetMentorUsingIdQuery,
  useGetMentorBySubCategoryQuery,
  useLazyGetMentorByCategoryQuery,
  useLazyGetMentorBySubCategoryQuery,
  useBookMentorSlotMutation,
  useGetMentorPackagesByIdQuery,
} = MentorApi;
export const MentorApiReducer = MentorApi.reducer;
export const MentorApiMiddleware = MentorApi.middleware;
