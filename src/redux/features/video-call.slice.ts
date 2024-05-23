import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "..";

interface IVideoCallProps {
  receivedCall?: boolean;
  mentorMeetingConfig: {
    mentorRoomCode: string | null;
    requestedUser: string | null;
    roomName: string | null;
  };
}

const initialState: IVideoCallProps = {
  receivedCall: false,
  mentorMeetingConfig: {
    mentorRoomCode: null,
    requestedUser: null,
    roomName: null,
  },
};

const VideoCallSlice = createSlice({
  initialState,
  name: "videoCall",
  reducers: {
    handleReceiveCall: (state, action: PayloadAction<boolean>) => {
      state.receivedCall = action.payload;
    },
    handleMentorRoomCode: (
      state,
      action: PayloadAction<{
        roomCode: string;
        userName: string;
        roomName: string;
      }>
    ) => {
      state.mentorMeetingConfig.mentorRoomCode = action.payload.roomCode;
      state.mentorMeetingConfig.requestedUser = action.payload.userName;
      state.mentorMeetingConfig.roomName = action.payload.roomName;
    },
  },
});

export const useVideoCallSlice = () =>
  useSelector((state: RootState) => {
    return state.videoCall;
  });
export const VideoCallReducer = VideoCallSlice.reducer;
export const { handleReceiveCall, handleMentorRoomCode } =
  VideoCallSlice.actions;
