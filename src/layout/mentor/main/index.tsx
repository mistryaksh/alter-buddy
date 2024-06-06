import React, { FC, ReactNode, useEffect } from "react";
import { MdLogout, MdOutlineHome } from "react-icons/md";
import { IoMdCalendar } from "react-icons/io";
import {
  AiOutlineClose,
  AiOutlineLoading,
  AiOutlineMessage,
  AiOutlineSetting,
  AiOutlineVideoCamera,
} from "react-icons/ai";
import { AiOutlinePhone } from "react-icons/ai";
import { IconLinkButton } from "../../../component";
import {
  useLazyGetUserByIdQuery,
  useMentorProfileQuery,
  useMentorSignOutMutation,
} from "../../../redux/rtk-api";
import { useAppDispatch } from "../../../redux";
import { FiPhoneIncoming } from "react-icons/fi";
import { socket } from "../../../service";
import {
  handleMentorRoomCode,
  handleReceiveCall,
  useVideoCallSlice,
} from "../../../redux/features";
import { useNavigate } from "react-router-dom";
import { removeMentorToken } from "../../../utils";
import { toast } from "react-toastify";

interface MentorLayoutProps {
  children: ReactNode;
  loading?: boolean;
  hideNavs?: boolean;
}

export const MentorLayout: FC<MentorLayoutProps> = ({
  children,
  loading,
  hideNavs,
}) => {
  const { data: mentor } = useMentorProfileQuery();
  const [GetUser, { isError: isUserError, error: userError, data: user }] =
    useLazyGetUserByIdQuery();
  const [SignOut, { isError, error, data, isLoading, isSuccess }] =
    useMentorSignOutMutation();
  const dispatch = useAppDispatch();
  const { receivedCall, mentorMeetingConfig } = useVideoCallSlice();
  const navigate = useNavigate();
  useEffect(() => {
    if (isUserError) {
      console.log(userError);
    }
    if (isError) {
      console.log(error);
    }
    socket.on("THROW_CALL_REQUEST", (data) => {
      if (data.users.mentor === mentor?.data._id) {
        console.log(data);
        dispatch(handleReceiveCall(true));
        dispatch(
          handleMentorRoomCode({
            roomCode: data?.sessionDetails?.roomCode?.mentor,
            userName: data.users.user,
            roomName: data.sessionDetails.roomName,
            callType: data.sessionDetails.callType,
          })
        );
      }
    });
    if (mentorMeetingConfig?.requestedUser) {
      (async () => {
        await GetUser(mentorMeetingConfig?.requestedUser as string);
      })();
    }
    if (isSuccess) {
      toast(data?.data, { type: "success" });
      removeMentorToken();
      navigate("/", { replace: true });
    }
  }, [
    mentor,
    dispatch,
    GetUser,
    mentorMeetingConfig.requestedUser,
    isUserError,
    userError,
    isError,
    error,
    isSuccess,
    navigate,
    data?.data,
  ]);

  const AcceptCall = () => {
    socket.emit("ACCEPT_CALL", mentorMeetingConfig.mentorRoomCode);
    navigate(`/mentor/chat/${mentorMeetingConfig.mentorRoomCode}`, {
      replace: true,
    });
  };

  const DeclineCall = () => {
    socket.emit("DECLINE_CALL", mentorMeetingConfig.mentorRoomCode);
    dispatch(handleReceiveCall(false));
  };

  const onSignOut = async () => {
    await SignOut();
  };
  return (
    <div className="flex xl:flex-row lg:flex-row flex-col h-screen bg-primary-500 py-3">
      {!hideNavs && (
        <div className=" px-5 flex  xl:flex-col xl:items-center xl:justify-center">
          <div className="flex xl:my-0 mb-5 xl:flex-col gap-5 items-center">
            <IconLinkButton Icon={MdOutlineHome} path="/mentor/dashboard" />
            <IconLinkButton
              Icon={FiPhoneIncoming}
              path="/mentor/call-history"
            />
            <IconLinkButton
              Icon={AiOutlineMessage}
              path="/mentor/chat/messages"
            />
            <IconLinkButton Icon={IoMdCalendar} path="/mentor/schedules" />
            <IconLinkButton Icon={AiOutlineSetting} path="/mentor/settings" />
            <button type="button" onClick={onSignOut}>
              <MdLogout size={32} className="text-white" />
            </button>
          </div>
        </div>
      )}
      <main className="bg-white overflow-y-scroll p-5 rounded-tl-3xl z-10 rounded-bl-3xl mx-3 flex-1 relative">
        {receivedCall && (
          <div className="absolute border rounded-lg p-3 bg-white right-10 w-[40%] z-[100] shadow-lg bottom-20">
            <div>
              <div className="flex items-center justify-between">
                <p className="text-2xl font-sans2">Call Notification</p>
                <button onClick={() => dispatch(handleReceiveCall(false))}>
                  <AiOutlineClose color="gray" />
                </button>
              </div>
              <div className="flex my-3 items-center gap-3">
                <img
                  src="https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png"
                  alt={user?.data.name.firstName}
                  className="w-[10%]"
                />
                <p className="text-primary-500 text-xl">
                  {user?.data.name.firstName} {user?.data.name.lastName}
                </p>
              </div>
              <p className="text-gray-500 flex items-center gap-3">
                Session Type{" "}
                <span className="text-primary-500">
                  {mentorMeetingConfig.callType === "video" && (
                    <AiOutlineVideoCamera size={22} />
                  )}
                  {mentorMeetingConfig.callType === "audio" && (
                    <AiOutlinePhone size={22} />
                  )}
                </span>
              </p>
              <div className="mt-3 flex justify-end gap-5 items-center">
                <button
                  onClick={DeclineCall}
                  type="button"
                  className="bg-red-300 rounded-md flex gap-3 items-center group transition-all duration-100 hover:bg-red-500 p-2"
                >
                  <AiOutlineClose
                    size={25}
                    className="group-hover:text-white"
                  />
                  <span className="mt-1 group-hover:text-white">Decline</span>
                </button>
                <button
                  onClick={AcceptCall}
                  type="button"
                  className="bg-primary-300 rounded-md group transition-all duration-100 hover:bg-primary-500 p-2"
                >
                  <AiOutlinePhone
                    size={25}
                    className="group-hover:text-white"
                  />
                </button>
              </div>
            </div>
          </div>
        )}
        {loading && isLoading ? (
          <div className="flex justify-center items-center h-full w-full flex-col gap-10">
            <AiOutlineLoading
              size={150}
              className="fill-primary-500 animate-spin"
            />
            <p className="text-gray-500 text-2xl">Loading...</p>
          </div>
        ) : (
          <section>{children}</section>
        )}
      </main>
    </div>
  );
};
