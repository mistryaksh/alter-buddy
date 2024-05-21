import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import { MainLayout } from "../../../../layout";
import { useNavigate, useParams } from "react-router-dom";
import {
  useCreateMeetingWithTokenQuery,
  useGetMentorUsingIdQuery,
  useProfileUserQuery,
} from "../../../../redux/rtk-api";
import {
  MeetingProvider,
  useMeeting,
  useParticipant,
  usePubSub,
} from "@videosdk.live/react-sdk";
import {
  handleMeetingConfig,
  useVideoCallSlice,
} from "../../../../redux/features";
import { useAppDispatch } from "../../../../redux";
import { socketService } from "../../../../service/video-call.service";
import clsx from "clsx";
import { AiOutlineLoading, AiOutlineSend } from "react-icons/ai";
import {
  CiMicrophoneOff,
  CiMicrophoneOn,
  CiVideoOff,
  CiVideoOn,
} from "react-icons/ci";
import moment from "moment";
import { AppButton } from "../../../../component";

export const VideoCallOnboard = () => {
  const { id } = useParams();
  const {
    isError: isMeetingError,
    error: meetingError,
    isLoading: isMeetingLoading,
    isSuccess: isMeetingSuccess,
    data: meeting,
  } = useCreateMeetingWithTokenQuery();
  const { data: profile, isSuccess: isProfileSuccess } = useProfileUserQuery();
  const { data: mentor, isSuccess: isMentorSuccess } = useGetMentorUsingIdQuery(
    id as string
  );
  const dispatch = useAppDispatch();
  const { camera, mic, meetingConfig } = useVideoCallSlice();
  const navigate = useNavigate();

  useEffect(() => {
    if (isMeetingError) {
      if ((meetingError as any).data) {
        console.log((meetingError as any).data.message);
      } else {
        console.log(meetingError);
      }
    }
    if (isMeetingSuccess && isProfileSuccess) {
      dispatch(
        handleMeetingConfig({
          token: meeting?.data.token,
          roomId: meeting?.data.meetingId,
        })
      );
      socketService.emit("GET_CALL_REQUEST", {
        mentorId: id,
        roomId: meetingConfig.roomId,
        userId: profile?.data._id,
        token: meetingConfig.token,
      });
    }
    socketService.on("ON_REJECTED", (res: any) => {
      console.log("MENTOR REJECTED CALL", res);
      if (res === "REJECTED") {
        navigate(`/user/mentor/details/${mentor?.data._id}`);
      }
    });
  }, [
    isMeetingError,
    meetingError,
    dispatch,
    isMeetingSuccess,
    meeting,
    meetingConfig,
    mentor,
    profile,
    isProfileSuccess,
    isMentorSuccess,
    id,
    navigate,
  ]);
  return (
    <MainLayout hideNav loading={isMeetingLoading}>
      <div className="w-full h-full mx-auto">
        {meetingConfig.roomId && meetingConfig.token && (
          <MeetingProvider
            config={{
              meetingId: meeting?.data.meetingId as string,
              name: `${profile?.data.name.firstName} ${profile?.data.name.lastName}`,
              micEnabled: mic,
              webcamEnabled: camera,
              participantId: profile?.data._id as string,
              mode: "CONFERENCE",
            }}
            token={meeting?.data.token as string}
          >
            <UserMeetingView
              mentorId={mentor?.data._id as string}
              userName={`${profile?.data.name.firstName} ${profile?.data.name.lastName}`}
              mentorName={`${mentor?.data.name.lastName} ${mentor?.data.name.firstName}`}
            />
          </MeetingProvider>
        )}
      </div>
    </MainLayout>
  );
};

interface UserMeetingViewProps {
  mentorName: string;
  userName: string;
  mentorId: string;
}

const UserMeetingView: FC<UserMeetingViewProps> = ({
  mentorName,
  userName,
  mentorId,
}) => {
  const [joined, setJoined] = useState<string | null>(null);
  const [messageInput, setMessageInput] = useState<string>("");
  const navigate = useNavigate();
  //Get the method which will be used to join the meeting.
  //We will also get the participants list to display all participants
  const { join, participants, toggleMic, toggleWebcam, leave } = useMeeting({
    //callback for when meeting is joined successfully
    onMeetingJoined: () => {
      setJoined("JOINED");
    },
    //callback for when meeting is left
    onMeetingLeft: () => {
      setJoined(null);
      navigate(`/user/mentor/details/${mentorId}`, { replace: true });
    },
  });
  const joinMeeting = useCallback(() => {
    join();
  }, [join]);

  const { messages, publish } = usePubSub("CHAT");

  const SendMessage = (message: string) => {
    if (messageInput === "") {
    } else {
      publish(message, { persist: true });
      setMessageInput("");
    }
  };

  useEffect(() => {
    socketService.on("START_CALL", (res) => {
      console.log(res);
      setJoined("STARTED");
    });
  }, [join]);

  return (
    <div className="h-screen overflow-y-scroll p-3">
      {joined === "JOINED" ? (
        <div className="flex h-full gap-3 items-center">
          <div className="flex-1 flex items-center gap-3 relative">
            {[...(participants.keys() as any)].map((participantId) => (
              <UserParticipateView
                toggleMic={async (e) => {
                  toggleMic();
                }}
                toggleWebcam={(e) => {
                  toggleWebcam();
                }}
                userName={userName}
                key={participantId}
                participantId={participantId}
              />
            ))}
          </div>

          <div className="w-[30%] h-full flex flex-col gap-5 border rounded-lg p-3">
            <div className="h-[90%] overflow-y-scroll flex flex-col gap-3">
              <div className="flex justify-end text-white bg-primary-500 px-3 py-3 rounded-md">
                <button onClick={leave}>Leave Call</button>
              </div>
              {messages.length !== 0 &&
                messages.map(({ id, message, senderName, timestamp }) => (
                  <div
                    key={id}
                    className={clsx(
                      senderName !== userName
                        ? "bg-primary-500 text-white"
                        : "text-right bg-primary-300",
                      "p-3 rounded-md"
                    )}
                  >
                    <div>
                      {senderName !== userName && (
                        <p>
                          <span className="capitalize">{senderName} </span> at{" "}
                          {moment(timestamp).format("LT")}
                        </p>
                      )}
                    </div>
                    <div className=" w-full text-right">
                      <p
                        className={clsx(
                          "text-sm",
                          senderName === userName && "text-right"
                        )}
                      >
                        {senderName === userName &&
                          `You at ${moment(timestamp).format("LT")}`}
                      </p>
                    </div>
                    <p>{message}</p>
                  </div>
                ))}
              {messages.length === 0 && (
                <div className="flex justify-center items-center h-full">
                  Type message to send
                </div>
              )}
            </div>
            <div className="flex h-[5%] border gap-5 items-center">
              <div className="flex-1">
                <input
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  type="text"
                  className="w-full h-full py-2 rounded-lg border border-primary-500 px-5"
                  placeholder="Enter message"
                />
              </div>
              <button
                onClick={() => SendMessage(messageInput)}
                className="bg-primary-500 p-2 rounded-lg"
              >
                <AiOutlineSend size={22} color="#fff" />
              </button>
            </div>
          </div>
        </div>
      ) : joined === "JOINING" ? (
        <div className="flex items-center flex-col justify-center h-full w-full">
          <AiOutlineLoading className="text-primary-500" size={200} />
          <p>Joining the meeting...</p>
        </div>
      ) : (
        <div className="h-full w-full flex flex-col justify-center items-center">
          <div className="w-[50%] flex flex-col justify-center gap-10 items-center h-[30%] border border-gray-400 px-10 rounded-lg shadow-lg">
            <div>
              <h6 className="text-2xl">
                Ready to start session with{" "}
                <span className="text-primary-500 capitalize">
                  {mentorName}
                </span>
              </h6>
              <p className="text-gray-500">
                We are notify mentor if they were available, once they accept
                your request then you will be ready to join the session like
                normal calls
              </p>
            </div>
            {joined === "STARTED" ? (
              <div>
                <AppButton filled onClick={joinMeeting}>
                  Mentor accepted your call, click to join
                </AppButton>
              </div>
            ) : (
              <div className="flex items-center gap-5">
                <AiOutlineLoading
                  size={30}
                  className="fill-primary-500 animate-spin"
                />
                <p>Waiting for mentor</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

interface UserParticipateViewProps {
  participantId: string;
  userName: string;
  toggleWebcam: (webCam: boolean) => void;
  toggleMic: (mic: boolean) => void;
}

const UserParticipateView: FC<UserParticipateViewProps> = ({
  participantId,
  userName,
  toggleMic,
  toggleWebcam,
}) => {
  const micRef = useRef(null) as any;
  const webcamRef = useRef(null) as any;
  const { webcamStream, micStream, webcamOn, micOn, isLocal, displayName } =
    useParticipant(participantId);

  useEffect(() => {
    (async () => {
      if (webcamRef.current) {
        if (webcamOn && webcamStream) {
          const mediaStream = new MediaStream();
          mediaStream.addTrack(webcamStream.track);
          webcamRef.current.srcObject = mediaStream;
          await webcamRef.current
            .play()
            .catch((error: any) =>
              console.error("videoElem.current.play() failed", error)
            );
        } else {
          webcamRef.current.srcObject = null;
        }
      }
    })();
    (async () => {
      if (micRef.current) {
        if (micOn && micStream) {
          const mediaStream = new MediaStream();
          mediaStream.addTrack(micStream.track);
          micRef.current.srcObject = mediaStream;
          await micRef.current
            .play()
            .then((res: any) => {
              return res;
            })
            .catch((error: any) =>
              console.error("videoElem.current.play() failed", error)
            );
        } else {
          micRef.current.srcObject = null;
        }
      }
    })();
  }, [webcamStream, webcamOn, micStream, micOn]);

  return (
    <div className="w-full h-full relative">
      <audio ref={micRef} autoPlay muted={isLocal} />
      {webcamOn && (
        <video className="rounded-lg w-full" ref={webcamRef} autoPlay />
      )}
      <h6 className="capitalize text-2xl font-semibold">{displayName}</h6>
      <div className="absolute top-5 left-5">
        <button>
          {micOn ? <CiMicrophoneOn size={35} /> : <CiMicrophoneOff size={35} />}
        </button>
      </div>
      {displayName === userName && (
        <div className="p-3 absolute rounded-lg -bottom-14 w-full flex gap-4 text-white bg-primary-500">
          <button onClick={() => toggleMic(!micOn)}>
            {micOn ? (
              <CiMicrophoneOn size={25} />
            ) : (
              <CiMicrophoneOff size={25} />
            )}
          </button>
          <button onClick={() => toggleWebcam(!webcamOn)}>
            {webcamOn ? <CiVideoOn size={25} /> : <CiVideoOff size={25} />}
          </button>
        </div>
      )}
    </div>
  );
};
