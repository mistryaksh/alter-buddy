import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  useLazyGetMentorUsingIdQuery,
  useProfileUserQuery,
} from "../../../redux/rtk-api";
import {
  AiOutlineArrowLeft,
  AiOutlineLoading,
  AiOutlineMore,
} from "react-icons/ai";
import { ChannelProvider } from "ably/react";
import { InsiderChat } from "./insider-chat";
import { socket } from "../../../service";
import { CountdownTimerL } from "../../../component";

export const UserChatPage = () => {
  const { id, roomId } = useParams();

  const [GetMentor, { isError, error, isLoading, data: mentorData }] =
    useLazyGetMentorUsingIdQuery();
  const { data: userData } = useProfileUserQuery();

  useEffect(() => {
    if (id) {
      (async () => {
        await GetMentor(id);
      })();
    }
    if (isError) {
      console.log(error);
    }
    if (roomId || mentorData?.data._id || userData?.data._id) {
      socket.emit("CHAT_DATA_TO_MENTOR", {
        mentorId: mentorData?.data._id,
        roomId,
        userId: userData?.data._id,
      });
    }
    return () => {
      socket.removeListener("CHAT_DATA_TO_MENTOR");
    };
  }, [
    GetMentor,
    id,
    isError,
    error,
    roomId,
    mentorData?.data._id,
    userData?.data._id,
  ]);
  let channelName: string | null = roomId as string;

  if (isLoading) {
    return (
      <div>
        <AiOutlineLoading
          size={150}
          className="animate-spin text-primary-500"
        />
        <p>Please wait....</p>
      </div>
    );
  }

  return channelName ? (
    <ChannelProvider channelName={channelName}>
      <div className="relative h-screen">
        <div className="bg-gray-900 py-5 px-3 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AiOutlineArrowLeft size={26} />
            <h1 className="text-xl font-sans2 capitalize">
              {mentorData?.data.name.firstName} {mentorData?.data.name.lastName}{" "}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <CountdownTimerL mins={30} />
            <AiOutlineMore size={26} />
          </div>
        </div>
        <div className="grid grid-cols-12 mt-5 h-[90vh]">
          <div className="xl:col-span-8">
            <InsiderChat
              myUsername={`${userData?.data.name.firstName} ${userData?.data.name.lastName}`}
              channelName={channelName}
            />
          </div>
          <div className="xl:col-span-4 bg-gray-100 p-3 h-full rounded-lg">
            <h5>Mentor details</h5>
            <h6 className="text-xl capitalize">
              {mentorData?.data.name.firstName} {mentorData?.data.name.lastName}
            </h6>
            <p className="text-lg capitalize">
              {mentorData?.data.category.title}
            </p>
          </div>
        </div>
      </div>
    </ChannelProvider>
  ) : (
    <div>channel initialization</div>
  );
};
