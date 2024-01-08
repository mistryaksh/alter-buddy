import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "../..";
import { socketService } from "../../../service/video-call.service";

interface VideoCallProps {
     camera: boolean;
     mic: boolean;
     chatWindow: boolean;
     meetingConfig: {
          roomId: string | null;
          token: string | null;
     };
     messageObject: MessageProps[];
}
interface MessageProps {
     message: string;
     senderId: string;
     senderName: string;
     timestamp: string;
     topic: string;
     id?: string;
}

const initialState: VideoCallProps = {
     camera: true,
     mic: true,
     chatWindow: false,
     meetingConfig: {
          roomId: null,
          token: null,
     },
     messageObject: [],
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
          handleMessage: (state, action: PayloadAction<MessageProps>) => {
               delete action.payload["id"];
               socketService.emit("SEND_MESSAGE", {
                    roomId: state.meetingConfig.roomId,
                    messageObject: action.payload,
               });
               state.messageObject.push(action.payload);
          },
     },
});

export const useVideoCallSlice = () =>
     useSelector((state: RootState) => {
          return state.videoCall;
     });
export const VideoCallReducer = videoCallSlice.reducer;
export const { handleCamera, handleMic, handleChatWindow, handleMeetingConfig, handleMessage } = videoCallSlice.actions;
