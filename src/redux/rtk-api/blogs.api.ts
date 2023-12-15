import { createApi } from "@reduxjs/toolkit/query/react";
import { ApiBaseQuery, baseQueryUser } from "../../utils";
import { IBlogProps } from "../../interface";

const BlogApi = createApi({
     baseQuery: ApiBaseQuery(baseQueryUser),
     reducerPath: "blogApi",
     endpoints: ({ query }) => ({
          GetAllBlog: query<{ data: IBlogProps[] }, void>({
               query: () => `/blog`,
          }),
          GetBlogById: query<{ data: IBlogProps }, string>({
               query: (id: string) => `blog/${id}`,
          }),
     }),
});

export const BlogApiReducer = BlogApi.reducer;
export const BlogApiMiddleware = BlogApi.middleware;
export const { useGetAllBlogQuery, useGetBlogByIdQuery } = BlogApi;
