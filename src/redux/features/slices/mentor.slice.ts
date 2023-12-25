import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "../../";

interface MentorSliceProps {
     call: boolean;
     onAccept: boolean;
}

const initialState: MentorSliceProps = {
     call: false,
     onAccept: false,
};

const MentorSlice = createSlice({
     initialState,
     name: "mentors",
     reducers: {
          getCall: (state) => {
               state.call = true;
          },
          removeCall: (state) => {
               state.call = false;
          },
          onCallAccept: (state) => {
               state.onAccept = true;
          },
     },
});

export const useMentorSlice = () =>
     useSelector((state: RootState) => {
          return state.mentors;
     });
export const MentorReducer = MentorSlice.reducer;
export const { getCall, removeCall, onCallAccept } = MentorSlice.actions;
