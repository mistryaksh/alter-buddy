import React, { useEffect } from "react";
import { MentorLayout } from "../../../../layout";
import { socket } from "../../../../service";
import {
  useLazyGetUserByIdQuery,
  useMentorProfileQuery,
} from "../../../../redux/rtk-api";
import { useAppDispatch } from "../../../../redux";
import {
  handleMentorChatConfig,
  useVideoCallSlice,
} from "../../../../redux/features";
import { ChannelProvider } from "ably/react";
import { InsiderChat } from "../../../user/chat/insider-chat";
import { AiOutlineArrowLeft, AiOutlineMore } from "react-icons/ai";
import { CountdownTimerL } from "../../../../component";
import { useNavigate } from "react-router-dom";

export const MentorChatPage = () => {
  const { data: mentor } = useMentorProfileQuery();
  const { chat } = useVideoCallSlice();

  const [GetUser, { data: userData }] = useLazyGetUserByIdQuery();
  const dispatch = useAppDispatch();

  useEffect(() => {
    socket.on(
      "GET_MENTORS_CHAT_DATA",
      ({
        mentorId,
        roomId,
        userId,
      }: {
        mentorId: string;
        roomId: string;
        userId: string;
      }) => {
        if (mentorId === mentor?.data._id) {
          dispatch(
            handleMentorChatConfig({ roomCode: roomId, userId: userId })
          );
        }
        if (userId) {
          (async () => {
            await GetUser(userId);
          })();
        }
      }
    );
    return () => {
      socket.removeListener("GET_MENTORS_CHAT_DATA");
    };
  }, [dispatch, mentor?.data._id, GetUser]);
  const navigate = useNavigate();

  return (
    <MentorLayout hideNavs={chat.chatRoomId?.length ? true : false}>
      {chat.chatRoomId && (
        <div className="h-full relative">
          <div className="w-full  px-3 py-5 z-50 rounded-lg absolute top-0 shadow-xl bg-gray-900 text-white items-center gap-2 inline-flex justify-between">
            <div className="flex items-center gap-3">
              <button
                className="p-2"
                onClick={() => {
                  socket.emit("FINISH_CALL", {
                    roomId: chat.chatRoomId,
                    duration: 0,
                  });
                  navigate("/mentor/dashboard", { replace: true });
                  dispatch(
                    handleMentorChatConfig({ roomCode: null, userId: null })
                  );
                }}
              >
                <AiOutlineArrowLeft size={24} />
              </button>
              <h6 className="">
                {userData?.data.name.firstName} {userData?.data.name.lastName}
              </h6>
            </div>
            <div className="flex gap-3 items-center">
              <CountdownTimerL mins={30} />
              <AiOutlineMore size={24} />
            </div>
          </div>
          <ChannelProvider channelName={chat.chatRoomId}>
            <InsiderChat
              mentorCall
              channelName={chat.chatRoomId}
              myUsername={`${mentor?.data.name.firstName} ${mentor?.data.name.lastName}`}
            />
          </ChannelProvider>
        </div>
      )}
      {!chat.chatRoomId && (
        <div>
          No chat request until now! once you will notified once user wants to
          connect you!
        </div>
      )}
    </MentorLayout>
  );
};
