import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "../..";

interface VideoCallProps {
     camera: boolean;
     mic: boolean;
     chatWindow: boolean;
     meetingConfig: {
          roomId: string | null;
          token: string | null;
     };
}

const initialState: VideoCallProps = {
     camera: true,
     mic: true,
     chatWindow: false,
     meetingConfig: {
          roomId: null,
          token: null,
     },
};

const videoCallSlice = createSlice({
     initialState,
     name: "videoCall",
     reducers: {
          handleCamera: (state) => {
               state.camera = !state.camera;
          },
          handleMic: (state) => {
               state.mic = !state.mic;
          },
          handleChatWindow: (state) => {
               state.chatWindow = !state.chatWindow;
          },
          handleMeetingConfig: (state, action) => {
               state.meetingConfig.roomId = action.payload.roomId;
               state.meetingConfig.token = action.payload.token;
          },
     },
});

export const useVideoCallSlice = () =>
     useSelector((state: RootState) => {
          return state.videoCall;
     });
export const VideoCallReducer = videoCallSlice.reducer;
export const { handleCamera, handleMic, handleChatWindow, handleMeetingConfig } = videoCallSlice.actions;
