import React, {
  FC,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { MdLogout, MdMessage, MdOutlineHome } from "react-icons/md";
import { IoMdCalendar } from "react-icons/io";
import {
  AiOutlineClose,
  AiOutlineLoading,
  AiOutlinePhone,
  AiOutlineSetting,
} from "react-icons/ai";
import { GoPackage } from "react-icons/go";
import { IconLinkButton } from "../../../component";
import {
  useGetMyPackagesQuery,
  useLazyGetUserByIdQuery,
  useMentorProfileQuery,
  useMentorSignOutMutation,
  useUseWalletCoinsMutation,
} from "../../../redux/rtk-api";
import { useAppDispatch } from "../../../redux";
import { FiPhoneIncoming } from "react-icons/fi";
import {
  handleMentorRoomCode,
  handleReceiveCall,
  useVideoCallSlice,
} from "../../../redux/features";
import { useNavigate } from "react-router-dom";
import { socket } from "../../../service";
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
  const [notification, setNotification] = useState<boolean>(false);
  const { data: mentor } = useMentorProfileQuery();
  const { data: packages } = useGetMyPackagesQuery();
  const [hasUserInteracted, setUserInteracted] = useState(false);
  const [
    UseWalletCoins,
    {
      isError: isWalletError,
      error: walletError,
      data: walletData,
      isSuccess: isWalletSuccess,
      isLoading: isWalletLoading,
    },
  ] = useUseWalletCoinsMutation();
  const [GetUser, { isError: isUserError, error: userError, data: user }] =
    useLazyGetUserByIdQuery();
  const [SignOut, { isError, error, data: signOutData, isLoading, isSuccess }] =
    useMentorSignOutMutation();
  const dispatch = useAppDispatch();
  const { mentorMeetingConfig, receivedCall } = useVideoCallSlice();
  const navigate = useNavigate();

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (isUserError) {
      console.log(userError);
    }
  }, [isUserError, userError]);

  // Function to initialize audio
  const initializeAudio = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(require("./original_guitar_jam.mp3"));
    }
  };

  // Function to play notification sound
  const playSound = useCallback(() => {
    if (audioRef.current && hasUserInteracted) {
      audioRef.current.play().catch((error) => {
        console.error("Playback failed:", error);
      });
    }
  }, [hasUserInteracted]);

  // Function to stop notification sound
  const stopSound = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0; // Reset to the beginning
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(signOutData?.data);
    }
  }, [isSuccess, signOutData?.data]);

  useEffect(() => {
    if (isError) {
      console.log(error);
    }
  }, [isError, error]);

  useEffect(() => {
    if (mentorMeetingConfig?.requestedUser) {
      (async () => {
        await GetUser(mentorMeetingConfig?.requestedUser as string);
      })();
    }

    const handleCallRequest = (data: any) => {
      if ((data?.users.mentor as unknown as string) === mentor?.data._id) {
        initializeAudio();
        playSound();
        dispatch(handleReceiveCall(true));
        dispatch(
          handleMentorRoomCode({
            roomCode: data?.sessionDetails?.roomCode?.mentor,
            userName: data?.users.user as unknown as string,
            roomName: data?.sessionDetails.roomName,
          })
        );
      }
    };

    socket.on("THROW_CALL_REQUEST", handleCallRequest);

    return () => {
      socket.off("THROW_CALL_REQUEST", handleCallRequest); // Cleanup socket listener
    };
  }, [
    mentor,
    dispatch,
    mentorMeetingConfig?.requestedUser,
    GetUser,
    playSound,
  ]);

  const handleUserInteraction = () => {
    setUserInteracted(true);
  };
  useEffect(() => {
    // This is your user interaction trigger
    window.addEventListener("click", handleUserInteraction);
    window.addEventListener("touchstart", handleUserInteraction); // For mobile

    return () => {
      window.removeEventListener("click", handleUserInteraction);
      window.removeEventListener("touchstart", handleUserInteraction);
    };
  }, []);

  useEffect(() => {
    if (isWalletError) {
      console.log(walletError);
    }
  }, [walletError, isWalletError]);

  useEffect(() => {
    if (isWalletSuccess) {
      console.log(walletData?.data);
    }
  }, [isWalletSuccess, walletData?.data]);

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
  const AcceptCall = () => {
    stopSound();
    UseWalletCoins({
      coinsToUsed: (() => {
        const selectedPackage = packages.data.find(
          (prop) =>
            prop.packageType === "audio" ||
            prop.packageType === "video" ||
            prop.packageType === "chat"
        ).price;
        return selectedPackage ? selectedPackage : 0; // Return 0 if no package is found
      })(),
      userId: user?.data?._id as string,
      useType: `Session Of ${
        packages?.data?.find(
          (prop) =>
            prop?.packageType === "audio" ||
            prop?.packageType === "video" ||
            prop?.packageType === "chat"
        ).packageType
      } with ${mentor?.data?.name?.firstName} ${mentor?.data?.name?.lastName}`,
    });
    socket.emit("ACCEPT_CALL", mentorMeetingConfig.mentorRoomCode);

    navigate(`/mentor/chat/${mentorMeetingConfig.mentorRoomCode}`, {
      replace: true,
    });
  };

  const DeclineCall = () => {
    stopSound();
    socket.emit("DECLINE_CALL", mentorMeetingConfig.mentorRoomCode);
    dispatch(handleReceiveCall(false));
  };
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
            <p className="text-gray-500">
              Room Name{" "}
              <span className="text-primary-500">
                {mentorMeetingConfig.roomName}
              </span>
            </p>
            <p>{}</p>
            <div className="mt-3 flex justify-end gap-5 items-center">
              <button
                onClick={DeclineCall}
                type="button"
                className="bg-red-300 rounded-md flex gap-3 items-center group transition-all duration-100 hover:bg-red-500 p-2"
              >
                <AiOutlineClose size={25} className="group-hover:text-white" />
                <span className="mt-1 group-hover:text-white">Decline</span>
              </button>
              <button
                onClick={AcceptCall}
                type="button"
                className="bg-primary-300 rounded-md group transition-all duration-100 hover:bg-primary-500 p-2"
              >
                <AiOutlinePhone size={25} className="group-hover:text-white" />
              </button>
            </div>
          </div>
        </div>
      )}
      <main className="bg-primary-50 overflow-y-scroll p-5 rounded-tl-3xl z-10 rounded-bl-3xl flex-1 relative">
        {loading && isLoading && isWalletLoading ? (
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
