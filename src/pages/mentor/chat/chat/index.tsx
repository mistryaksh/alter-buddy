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
import {
  AiOutlineArrowLeft,
  AiOutlineLogout,
  AiOutlineMore,
} from "react-icons/ai";
import { CountdownTimerL } from "../../../../component";

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

  return (
    <MentorLayout hideNavs={chat.chatRoomId?.length ? true : false}>
      <div className="bg-gray-900 py-5 px-3 w-[96%] z-50 top-5 absolute text-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <AiOutlineArrowLeft size={26} />
          <h1 className="text-xl font-sans2 capitalize">
            {userData?.data.name.firstName} {userData?.data.name.lastName}{" "}
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <CountdownTimerL mins={30} />
          <AiOutlineLogout size={26} />
          <AiOutlineMore size={26} />
        </div>
      </div>
      <div className="mt-14">
        {chat.chatRoomId && (
          <ChannelProvider channelName={chat.chatRoomId}>
            <InsiderChat
              channelName={chat.chatRoomId}
              myUsername={`${mentor?.data.name.firstName} ${mentor?.data.name.lastName}`}
            />
          </ChannelProvider>
        )}
      </div>
    </MentorLayout>
  );
};
