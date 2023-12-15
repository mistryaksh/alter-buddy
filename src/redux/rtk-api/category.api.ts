import { createApi } from "@reduxjs/toolkit/query/react";
import { ApiBaseQuery, baseQueryUser } from "../../utils";
import { ICategoryProps, ISubCategoryProps } from "../../interface";

const CategoryApi = createApi({
     baseQuery: ApiBaseQuery(baseQueryUser),
     reducerPath: "categoryApi",
     endpoints: ({ mutation, query }) => ({
          GetAllCategory: query<{ data: ICategoryProps[] }, void>({
               query: () => `/category`,
          }),
          GetCategoryById: query<{ data: ICategoryProps }, string>({
               query: (id: string) => `/mentor/category/${id}`,
          }),
          GetAllSubCategory: query<{ data: ISubCategoryProps[] }, void>({
               query: () => `/sub-category`,
          }),
          GetSubCategoryById: query<{ data: ISubCategoryProps }, string>({
               query: (id: string) => `/sub-category/${id}`,
          }),
          GetSubCategoryByCategoryId: query<{ data: ISubCategoryProps[] }, string>({
               query: (categoryId: string) => `/category/sub-category/${categoryId}`,
          }),
     }),
});

export const CategoryApiReducer = CategoryApi.reducer;
export const CategoryApiMiddleware = CategoryApi.middleware;
export const {
     useGetAllCategoryQuery,
     useGetCategoryByIdQuery,
     useGetAllSubCategoryQuery,
     useGetSubCategoryByIdQuery,
     useLazyGetAllCategoryQuery,
     useLazyGetSubCategoryByIdQuery,
     useLazyGetCategoryByIdQuery,
     useLazyGetSubCategoryByCategoryIdQuery,
} = CategoryApi;
