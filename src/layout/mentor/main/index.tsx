import React, { FC, ReactNode, useEffect, useState } from "react";
import { MdLogout, MdMessage, MdOutlineHome } from "react-icons/md";
import { IoMdCalendar } from "react-icons/io";
import { AiOutlineLoading, AiOutlineSetting } from "react-icons/ai";
import { GoPackage } from "react-icons/go";
import { IconLinkButton } from "../../../component";
import { useMentorSignOutMutation } from "../../../redux/rtk-api";
import { useAppDispatch } from "../../../redux";
import { FiPhoneIncoming } from "react-icons/fi";
import { handleMentorLogout } from "../../../redux/features";
import { useNavigate } from "react-router-dom";
import { socket } from "../../../service";
import { toast } from "react-toastify";
import { removeMentorToken } from "../../../utils";

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

  const [SignOut, { isError, error, data: signOutData, isLoading, isSuccess }] =
    useMentorSignOutMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      toast.success(signOutData?.data);
      removeMentorToken();
      dispatch(handleMentorLogout());
      navigate("/", { replace: true });
    }
  }, [isSuccess, signOutData?.data, navigate, dispatch]);

  useEffect(() => {
    if (isError) {
      console.log(error);
    }
  }, [isError, error]);

  const onSignOut = async () => {
    await SignOut();
  };

  useEffect(() => {
    socket.on("receiveChatRequest", (data) => {
      if (data) {
        localStorage.setItem("chatRequestData", JSON.stringify(data));
        setNotification(true);
      }
    });

    return () => {
      socket.off("receiveChatRequest");
      setNotification(false);
    };
  }, []);

  return (
    <div className="flex xl:flex-row lg:flex-row flex-col h-screen bg-primary-500 py-3 relative">
      {!hideNavs && (
        <div className="px-5 flex  xl:flex-col xl:items-center xl:justify-center">
          <div className="flex xl:my-0 mb-5 lg:flex-row xl:flex-col md:flex-row w-full justify-center gap-5 items-center">
            <IconLinkButton Icon={MdOutlineHome} path="/mentor/dashboard" />
            <IconLinkButton
              Icon={FiPhoneIncoming}
              path="/mentor/call-history"
            />
            <IconLinkButton Icon={IoMdCalendar} path="/mentor/schedules" />
            <IconLinkButton Icon={GoPackage} path="/mentor/packages" />
            <IconLinkButton
              Icon={MdMessage}
              path="/mentor/rant"
              isHighlighted={notification}
            />
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
