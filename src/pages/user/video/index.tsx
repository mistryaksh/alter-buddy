import React, { useCallback, useEffect } from "react";
import { MainLayout } from "../../../layout";
import { selectIsConnectedToRoom, useHMSStore } from "@100mslive/react-sdk";
import {
  AppButton,
  CallConference,
  CallFooter,
  CallHeader,
  JoinForm,
} from "../../../component";
import {
  useGetMeetingCodesMutation,
  useLazyGetMentorUsingIdQuery,
  useProfileUserQuery,
} from "../../../redux/rtk-api";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { AlterBuddyLogo } from "../../../assets/logo";
import { socket } from "../../../service";
import { AiOutlinePhone, AiOutlineVideoCamera } from "react-icons/ai";
import { HMSPrebuilt } from "@100mslive/roomkit-react";

export const UserVideoCallPage = () => {
  const isConnected = useHMSStore(selectIsConnectedToRoom);
  const { mentorId: id } = useParams();
  let [searchParams] = useSearchParams();
  const isAudioCall = searchParams.get("audio_call") === "true";
  const { data: profile } = useProfileUserQuery();

  const [
    GetMentor,
    {
      isError: isMentorError,
      isLoading: isMentorLoading,
      data: mentor,
      error: mentorError,
    },
  ] = useLazyGetMentorUsingIdQuery();
  const [StartMeeting, { isError, error, data, isLoading, isSuccess }] =
    useGetMeetingCodesMutation();

  const navigate = useNavigate();

  const Continue = useCallback(async () => {
    await StartMeeting({
      audioCall: isAudioCall ? "audio" : "video",
      userIds: `${profile?.data._id}-${mentor?.data._id}`,
    });
  }, [StartMeeting, isAudioCall, mentor?.data._id, profile?.data._id]);

  useEffect(() => {
    if (id) {
      (async () => {
        GetMentor(id);
      })();
    }
  }, [id, GetMentor]);

  useEffect(() => {
    if (isError) {
      console.log(error);
    }
    if (isMentorError) {
      console.log(mentorError);
    }
  }, [isError, error, isMentorError, mentorError, data?.data, isSuccess]);

  useEffect(() => {
    if (isSuccess) {
      socket.emit("GET_CALL_REQUEST", {
        mentorRoomCode: data?.data.mentorCode,
        userRoomCode: data?.data.userCode,
        room: data?.data.room,
        userId: profile?.data._id,
        mentorId: mentor?.data._id,
        callType: isAudioCall ? "audio" : "video",
      });
    }
  }, [
    isSuccess,
    data?.data.mentorCode,
    data?.data.userCode,
    mentor?.data._id,
    profile?.data._id,
    data?.data.room,
    isAudioCall,
  ]);
  console.log(data?.data);

  return (
    <MainLayout hideNav={isConnected} loading={false}>
      {isConnected && !isLoading ? (
        <div className="h-screen relative p-5 w-full">
          {/* <CallHeader width={98} />
          <CallConference />
          <CallFooter
            duration={0}
            isAudioCall={isAudioCall ? "audio" : "video"}
            cancellationPath="/"
            width={98}
          /> */}
          <HMSPrebuilt
            roomCode={data?.data.userCode.code}
            logo={require("../../../assets/AlterBuddy-Icon.png")}
          />
        </div>
      ) : (
        <div>
          {isSuccess ? (
            <JoinForm
              isAudioCall={isAudioCall}
              cancellationPath={`/user/mentor/details/${mentor?.data._id}`}
              mentorName={`${mentor?.data.name.firstName} ${mentor?.data.name.lastName}`}
              roomCode={data?.data.userCode.code}
              userName={`${profile?.data.name.firstName} ${profile?.data.name.lastName}`}
            />
          ) : (
            <div className="flex items-center justify-center">
              <div className="my-20 pt-20 flex flex-col w-[40%] p-3 shadow-lg rounded-md border">
                <AlterBuddyLogo />
                <h6 className="text-xl text-primary-500 capitalize text-left">
                  {mentor?.data.name.firstName} {mentor?.data.name.lastName} is{" "}
                  <span className="capitalize">
                    {mentor?.data.category.title}
                  </span>
                </h6>
                <div className="flex gap-5 items-center my-3">
                  Session Type -{" "}
                  {isAudioCall ? (
                    <div className="flex items-center gap-3">
                      <AiOutlinePhone size={20} /> <p>Audio</p>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <AiOutlineVideoCamera size={20} /> <p>Video</p>
                    </div>
                  )}
                </div>
                <div className="mb-4">
                  <h6 className="text-primary-500">You can ask about:</h6>
                  <div className="grid gap-5 xl:grid-cols-3 lg:grid-cols-3 grid-cols-12 items-center">
                    {mentor?.data.subCategory.map(({ label, subTitle }, i) => (
                      <div key={i} className="border p-2">
                        <p className="text-xl">
                          <span className="capitalize">{label} </span>
                        </p>
                        <p className="text-gray-500 text-sm">{subTitle}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex gap-5 justify-between">
                  <AppButton
                    outlined
                    type="button"
                    onClick={() =>
                      navigate(`/user/mentor/details/${mentor?.data._id}`)
                    }
                  >
                    Back
                  </AppButton>{" "}
                  <AppButton type="button" filled onClick={Continue}>
                    Start Initializing
                  </AppButton>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      {isLoading && isMentorLoading && <div>Initializing meeting</div>}
    </MainLayout>
  );
};
