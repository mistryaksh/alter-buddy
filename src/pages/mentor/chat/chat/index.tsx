import React, { useEffect } from "react";
import { MentorLayout } from "../../../../layout";
import { socket } from "../../../../service";
import {
  useLazyGetUserByIdQuery,
  useMentorProfileQuery,
  useMyChatMentorQuery,
} from "../../../../redux/rtk-api";
import { useAppDispatch } from "../../../../redux";
import {
  handleMentorChatConfig,
  setActiveChat,
  useMentorSlice,
  useVideoCallSlice,
} from "../../../../redux/features";
import { ChannelProvider } from "ably/react";
import { InsiderChat } from "../../../user/chat/insider-chat";
import { AiOutlineArrowLeft, AiOutlineMore } from "react-icons/ai";
import { CountdownTimerL } from "../../../../component";
import { useNavigate } from "react-router-dom";
import { IChatProps, UserProps } from "../../../../interface";
import moment from "moment";
import { AlterBuddyLogo } from "../../../../assets/logo";

export const MentorChatPage = () => {
  const { data: mentor } = useMentorProfileQuery();
  const { chat } = useVideoCallSlice();
  const { data, isError, error, isLoading, isSuccess } = useMyChatMentorQuery();
  const { activeChat } = useMentorSlice();
  const [GetUser, { data: userData }] = useLazyGetUserByIdQuery();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isError) {
      console.log(error);
    }
    if (isSuccess) {
      console.log(data?.data);
    }
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
  }, [
    dispatch,
    mentor?.data._id,
    GetUser,
    isSuccess,
    data?.data,
    isError,
    error,
  ]);
  const navigate = useNavigate();
  const myActiveChat: any =
    activeChat !== "" &&
    data?.data.find((prop) => {
      return (prop._id as string) === activeChat;
    });
  console.log(myActiveChat);
  return (
    <MentorLayout hideNavs={chat.chatRoomId?.length ? true : false}>
      {chat.chatRoomId && (
        <div className="relative h-screen border border-red-500">
          <div className="w-full  px-3 py-5 z-50 rounded-lg absolute top-0 shadow-xl bg-gray-900 text-white items-center gap-2 inline-flex justify-between">
            <div className="flex items-center gap-3">
              <button
                className="p-2"
                onClick={() => {
                  socket.emit("FINISH_CALL", {
                    roomId: chat.chatRoomId,
                    duration: 0,
                  });
                  socket.emit("CHAT_LEAVE", {
                    chatRoom: chat.chatRoomId,
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
              roomId={chat.chatRoomId}
              mentorCall
              channelName={chat.chatRoomId}
              myUsername={`${mentor?.data.name.firstName} ${mentor?.data.name.lastName}`}
            />
          </ChannelProvider>
        </div>
      )}
      {!chat.chatRoomId && (
        <div className="grid grid-cols-12 gap-3">
          <div className="xl:col-span-4 lg:col-span-4 md:col-span-6 sm:col-span-12 col-span-12 ">
            <div className="bg-gray-100 px-3 py-5">
              <AlterBuddyLogo />
            </div>
            <div className="py-5 flex flex-col gap-3 overflow-y-scroll h-full">
              {data?.data.map(({ users, createdAt, _id }, i) => (
                <div
                  onClick={() => dispatch(setActiveChat(_id as string))}
                  key={i}
                  className="flex justify-between items-center py-8 px-3 rounded-md bg-gray-100"
                >
                  <div className="flex gap-3 items-center">
                    <h6 className="text-lg">
                      {(users.user as UserProps)?.name?.firstName}{" "}
                      {(users.user as UserProps)?.name?.lastName}
                    </h6>
                  </div>
                  <div className="flex flex-col text-right">
                    <span className="text-sm text-gray-500">
                      {moment(createdAt).format("DD/MM/YYYY")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="xl:col-span-8 lg:col-span-8 md:col-span-6 sm:col-span-12 col-span-12">
            {/* {myActiveChat.} */}
          </div>
        </div>
      )}
    </MentorLayout>
  );
};
