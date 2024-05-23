import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "..";

interface MentorSliceProps {}

const initialState: MentorSliceProps = {};

const MentorSlice = createSlice({
  initialState,
  name: "mentors",
  reducers: {},
});

export const useMentorSlice = () =>
  useSelector((state: RootState) => {
    return state.mentors;
  });
export const MentorReducer = MentorSlice.reducer;
export const {} = MentorSlice.actions;
