import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "..";

interface IVideoCallProps {
  receivedCall?: boolean;
  mentorMeetingConfig: {
    mentorRoomCode: string | null;
    requestedUser: string | null;
    roomName: string | null;
    callType: string;
  };
  chat: {
    chatRoomId: string | null;
    userId: string | null;
  };
}

const initialState: IVideoCallProps = {
  receivedCall: false,
  mentorMeetingConfig: {
    mentorRoomCode: null,
    requestedUser: null,
    roomName: null,
    callType: "",
  },
  chat: {
    chatRoomId: null,
    userId: null,
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
        callType: string;
      }>
    ) => {
      state.mentorMeetingConfig.mentorRoomCode = action.payload.roomCode;
      state.mentorMeetingConfig.requestedUser = action.payload.userName;
      state.mentorMeetingConfig.roomName = action.payload.roomName;
      state.mentorMeetingConfig.callType = action.payload.callType;
    },
    handleMentorChatConfig(
      state,
      action: PayloadAction<{ roomCode: string | null; userId: string | null }>
    ) {
      state.chat.chatRoomId = action.payload.roomCode;
      state.chat.userId = action.payload.userId;
    },
  },
});

export const useVideoCallSlice = () =>
  useSelector((state: RootState) => {
    return state.videoCall;
  });
export const VideoCallReducer = VideoCallSlice.reducer;
export const {
  handleReceiveCall,
  handleMentorRoomCode,
  handleMentorChatConfig,
} = VideoCallSlice.actions;
