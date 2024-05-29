import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { getMentorToken, getUserToken } from "./local-store";

export const ApiBaseQuery = (baseQuery?: (headers: Headers) => void) => {
  return fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BACKEND_URL,
    prepareHeaders: baseQuery,
  });
};

export const baseQueryUser = (headers: Headers) => {
  headers.set("Authorization", getUserToken() || `{}`);
};

export const baseQueryMentor = (headers: Headers) => {
  headers.set("Authorization", getMentorToken() || `{}`);
};

export const AgoraChatQuery = () => {
  return fetchBaseQuery({
    baseUrl: `https://${process.env.REACT_APP_REST_API}/${process.env.REACT_APP_AGORA_ORG_NAME}/${process.env.REACT_APP_AGORA_APP_NAME}`,
    prepareHeaders: (header) => {
      return header.set(
        "Authorization",
        "Bearer 007eJxTYLhdyhhbGj972Ym4r70SuhEWU2p+3tc6q71itdj9LYdYZosqMJibGVtaGJoZmZklGZkYGadYGpkbpVpYGKcaGliaJ1ukFJ8LS2sIZGR4uymHiZGBlYGRgYkBxGdgAAB1Rh1s"
      );
    },
  });
};
