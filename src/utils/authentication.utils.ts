import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { getUserToken } from "./local-store";

export const ApiBaseQuery = (baseQuery: (headers: Headers) => void) =>
     fetchBaseQuery({
          baseUrl: process.env.REACT_APP_AWS_DEV_BACKEND,
          prepareHeaders: baseQuery,
     });

export const baseQueryUser = (headers: Headers) => {
     headers.set("Authorization", getUserToken() || `{}`);
};
