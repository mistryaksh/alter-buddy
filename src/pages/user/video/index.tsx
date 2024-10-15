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

export const UserVideoCallPage = () => {
  const isConnected = useHMSStore(selectIsConnectedToRoom);
  const { mentorId: id } = useParams();
  let [searchParams] = useSearchParams();
  const isAudioCall = searchParams.get("audio_call") === typeof "true";
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
    await StartMeeting({ audioCall: isAudioCall ? "audio" : "video" });
  }, [StartMeeting, isAudioCall]);

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

  return (
    <MainLayout hideNav={isConnected} loading={false}>
      {isConnected && !isLoading ? (
        <div className="h-screen relative p-5 w-full">
          <CallHeader width={98} />
          <CallConference />
          <CallFooter
            isAudioCall={isAudioCall ? "audio" : "video"}
            cancellationPath="/"
            width={98}
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
              <div className="my-20 pt-20 flex flex-col xl:lg:md:w-[40%] p-3 shadow-lg">
                <AlterBuddyLogo />
                <h6 className="text-3xl text-primary-500 capitalize mt-5">
                  {mentor?.data.name.firstName} {mentor?.data.name.lastName}
                </h6>
                <p className="text-2xl capitalize">
                  Mentor's Specialization{" "}
                  {mentor?.data.category.map((props) => props.title).join(", ")}
                </p>
                <div className="mb-10">
                  <h6 className="text-gray-950">You can ask about:</h6>
                  <div className="space-y-3 mt-5">
                    {mentor?.data.specialists.map((props, i) => (
                      <div key={i}>
                        <p className="text-sm text-gray-500">
                          <span className="capitalize">{props} </span>
                        </p>
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
