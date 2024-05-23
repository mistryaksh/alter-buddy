import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "..";
import { callType } from "../../interface";

interface MentorSliceProps {
  selectedCallType: callType;
}

const initialState: MentorSliceProps = {
  selectedCallType: "all",
};

const MentorSlice = createSlice({
  initialState,
  name: "mentors",
  reducers: {
    handleCallTypeSelection: (state, action: PayloadAction<callType>) => {
      state.selectedCallType = action.payload;
    },
  },
});

export const useMentorSlice = () =>
  useSelector((state: RootState) => {
    return state.mentors;
  });
export const MentorReducer = MentorSlice.reducer;
export const { handleCallTypeSelection } = MentorSlice.actions;
