import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { getMentorToken, getUserToken } from "./local-store";

export const ApiBaseQuery = (baseQuery?: (headers: Headers) => void) => {
  return fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BACKEND_URL,
    prepareHeaders: baseQuery,
  });
};

export const baseQueryUser = (headers: Headers) => {
  headers.set("Authorization", getUserToken() || null);
};

export const baseQueryMentor = (headers: Headers) => {
  headers.set("Authorization", getMentorToken() || null);
};
