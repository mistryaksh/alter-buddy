import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "../..";

interface AuthenticationSliceProps {
     authentication: boolean;
     user: string | null;
     token: string | null;
}

const initialState: AuthenticationSliceProps = {
     authentication: false,
     token: null,
     user: null,
};

const AuthenticationSlice = createSlice({
     initialState,
     name: "authentication",
     reducers: {},
});

export const useAuthenticationSlice = () =>
     useSelector((state: RootState) => {
          return state.authentication;
     });
export const AuthenticationReducer = AuthenticationSlice.reducer;
// export const {} = AuthenticationSlice.actions
