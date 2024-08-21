import React, { FC, ReactNode, useEffect, useState } from "react";
import { MdLogout, MdMessage, MdOutlineHome } from "react-icons/md";
import { IoMdCalendar } from "react-icons/io";
import { AiOutlineLoading, AiOutlineSetting } from "react-icons/ai";
import { AppButton, IconLinkButton } from "../../../component";
import {
  useLazyGetUserByIdQuery,
  useMentorProfileQuery,
  useMentorSignOutMutation,
} from "../../../redux/rtk-api";
import { useAppDispatch } from "../../../redux";
import { FiPhoneIncoming } from "react-icons/fi";
import { useVideoCallSlice } from "../../../redux/features";
import { useNavigate } from "react-router-dom";
import { removeMentorToken } from "../../../utils";
import { toast } from "react-toastify";
import { socket } from "../../../service";

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
  const [notification, setNotification] = useState<boolean>(false);
  const [chatRequest, setChatRequest] = useState<any>(null);
  const { data: mentor } = useMentorProfileQuery();
  const [GetUser, { isError: isUserError, error: userError }] =
    useLazyGetUserByIdQuery();
  const [SignOut, { isError, error, data, isLoading, isSuccess }] =
    useMentorSignOutMutation();
  const dispatch = useAppDispatch();
  const { mentorMeetingConfig } = useVideoCallSlice();
  const navigate = useNavigate();
  useEffect(() => {
    if (isUserError) {
      console.log(userError);
    }
    if (isError) {
      console.log(error);
    }

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

  const onSignOut = async () => {
    await SignOut();
  };

  useEffect(() => {
    socket.on("receiveChatRequest", (data) => {
      setChatRequest(data);
      setNotification(true);
    });

    return () => {
      socket.off("receiveChatRequest");
    };
  }, []);

  const rantAccepted = () => {
    if (chatRequest) {
      socket.emit(
        "acceptChat",
        { roomId: chatRequest.roomId, accepted: true },
        () => {
          console.log("Chat request accepted");
          if (chatRequest.endAt) {
            // Set timing for rant chat or audio
            localStorage.setItem(
              "endRantChatOrAudioAt",
              JSON.stringify(chatRequest.endAt)
            );
            setNotification(false);
            window.location.replace(
              `https://rant-alterbudd.netlify.app/rant/chat?roomId=${
                chatRequest.roomId
              }&mentorToken=${localStorage.getItem("MENTOR_TOKEN")}&endAt=${
                chatRequest.endAt
              }`
            );
          }
        }
      );
    }
  };

  return (
    <div className="flex xl:flex-row lg:flex-row flex-col h-screen bg-primary-500 py-3 relative">
      <div className="absolute bottom-20 right-20 z-50">
        {notification && (
          <div className="animate__animated animate__bounceInRight">
            <AppButton filled onClick={rantAccepted} type="button">
              Accept Rant Request
            </AppButton>
          </div>
        )}
      </div>
      {!hideNavs && (
        <div className=" px-5 flex  xl:flex-col xl:items-center xl:justify-center">
          <div className="flex xl:my-0 mb-5 lg:flex-row xl:flex-col md:flex-row w-full justify-center gap-5 items-center">
            <IconLinkButton Icon={MdOutlineHome} path="/mentor/dashboard" />
            <IconLinkButton
              Icon={FiPhoneIncoming}
              path="/mentor/call-history"
            />
            <IconLinkButton Icon={IoMdCalendar} path="/mentor/schedules" />
            <IconLinkButton Icon={MdMessage} path="/mentor/rant" />
            <IconLinkButton Icon={AiOutlineSetting} path="/mentor/settings" />
            <button type="button" onClick={onSignOut}>
              <MdLogout size={32} className="text-white" />
            </button>
          </div>
        </div>
      )}
      <main className="bg-primary-50 overflow-y-scroll p-5 rounded-tl-3xl z-10 rounded-bl-3xl flex-1 relative">
        {loading && isLoading ? (
          <div className="flex justify-center items-center h-full w-full flex-col gap-10">
            <AiOutlineLoading
              size={150}
              className="fill-primary-500 animate-spin"
            />
            <p className="text-gray-500 text-2xl">Loading...</p>
          </div>
        ) : (
          <section className="bg-primary-50 h-full p-3">{children}</section>
        )}
      </main>
    </div>
  );
};
