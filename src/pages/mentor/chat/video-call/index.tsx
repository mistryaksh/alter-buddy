import React, { FC, useEffect, useRef, useState } from "react";
import { MentorLayout } from "../../../../layout";
import { useVideoCallSlice } from "../../../../redux/features";
import { MeetingProvider, useMeeting, useParticipant, usePubSub } from "@videosdk.live/react-sdk";
import { useLazyGetUserByIdQuery, useMentorProfileQuery } from "../../../../redux/rtk-api";
import clsx from "clsx";
import { AiOutlineLoading, AiOutlineSend } from "react-icons/ai";
import moment from "moment";
import { IoExitOutline } from "react-icons/io5";
import { CiMicrophoneOff, CiMicrophoneOn, CiVideoOff, CiVideoOn } from "react-icons/ci";
import { AppButton } from "../../../../component";
import { useNavigate, useParams } from "react-router-dom";
import { socketService } from "../../../../service/video-call.service";

export const MentorChatPage = () => {
     const { meetingConfig } = useVideoCallSlice();
     const { data: profile } = useMentorProfileQuery();
     const { id } = useParams();

     const [GetUserById, { data: user, isError: isUserError, isLoading: isUserLoading, error: userError }] =
          useLazyGetUserByIdQuery();

     useEffect(() => {
          (async () => {
               if (id) {
                    await GetUserById(id);
               }
          })();
          if (isUserError) {
               console.log(userError);
          }
     }, [GetUserById, id, isUserError, userError]);

     return (
          <MentorLayout hideNavs loading={isUserLoading}>
               <div className="">
                    {meetingConfig.roomId && meetingConfig.token && (
                         <MeetingProvider
                              token={meetingConfig.token}
                              config={{
                                   meetingId: meetingConfig.roomId as string,
                                   micEnabled: true,
                                   webcamEnabled: true,
                                   name: `${profile?.data.name.firstName} ${profile?.data.name.lastName}`,
                                   mode: "CONFERENCE",
                              }}
                         >
                              <MentorMeetingView
                                   userName={`${profile?.data.name.firstName} ${profile?.data.name.lastName}`}
                                   callerName={`${user?.data.name.lastName} ${user?.data.name.firstName}`}
                                   mentorId={profile?.data._id as string}
                                   userId={user?.data._id as string}
                                   roomId={meetingConfig.roomId}
                              />
                         </MeetingProvider>
                    )}
               </div>
          </MentorLayout>
     );
};

interface MentorMeetingViewProps {
     userName: string;
     callerName: string;
     userId: string;
     mentorId: string;
     roomId: string;
}

const MentorMeetingView: FC<MentorMeetingViewProps> = ({ userName, callerName, mentorId, userId, roomId }) => {
     const [joined, setJoined] = useState<string | null>(null);
     const [messageInput, setMessageInput] = useState<string>("");
     //Get the method which will be used to join the meeting.
     //We will also get the participants list to display all participants
     const { join, participants, leave, toggleMic, toggleWebcam } = useMeeting({
          //callback for when meeting is joined successfully
          onMeetingJoined: () => {
               setJoined("JOINED");
          },
     });
     const { messages, publish } = usePubSub("CHAT");

     const SendMessage = (message: string) => {
          if (messageInput === "") {
               return null;
          } else {
               publish(message, { persist: true });
               setMessageInput("");
          }
     };

     const joinMeeting = () => {
          setJoined("JOINING");
          join();
     };

     return (
          <div className="">
               {joined && joined === "JOINED" ? (
                    <div className=" flex gap-3">
                         <div className="flex gap-3 flex-col justify-start flex-1">
                              {[...(participants.keys() as any)]
                                   .map((participantId) => (
                                        <MentorParticipantView
                                             leave={leave}
                                             toggleMic={() => toggleMic()}
                                             toggleWebcam={() => toggleWebcam()}
                                             userName={userName}
                                             participantId={participantId}
                                             key={participantId}
                                             mentorId={mentorId}
                                             userId={userId}
                                             messages={messages}
                                             roomId={roomId}
                                        />
                                   ))
                                   .reverse()}
                         </div>
                         <div className="w-[40%] flex flex-col gap-3">
                              {messages.map(({ id, message, senderName, timestamp }) => (
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
                                             <p className={clsx("text-sm", senderName === userName && "text-right")}>
                                                  {senderName === userName &&
                                                       `You at ${moment(timestamp).format("LT")}`}
                                             </p>
                                        </div>
                                        <p>{message}</p>
                                   </div>
                              ))}
                              <div className="h-[10%] flex items-center gap-3">
                                   <input
                                        type="text"
                                        value={messageInput}
                                        onChange={(e) => setMessageInput(e.target.value)}
                                        placeholder="Enter messages"
                                        className="rounded-md focus:outline-none border-primary-500 w-full py-2 px-5 border flex-1"
                                   />
                                   <button
                                        type="button"
                                        onClick={() => SendMessage(messageInput)}
                                        className="bg-primary-500 p-3 rounded-md"
                                   >
                                        <AiOutlineSend size={22} className="fill-white" />
                                   </button>
                              </div>
                         </div>
                    </div>
               ) : joined && joined === "JOINING" ? (
                    <div className="flex items-center flex-col justify-center h-full w-full">
                         <AiOutlineLoading className="text-primary-500" size={200} />
                         <p>Joining the meeting...</p>
                    </div>
               ) : (
                    <div className="h-screen w-full flex items-center justify-center">
                         <div className="flex flex-col gap-3">
                              <div>
                                   <h6 className="text-2xl">
                                        <span className="text-primary-500 capitalize">{callerName}</span> is waiting for
                                        you in session
                                   </h6>
                                   <p>
                                        You are notified by this user for consultations, please click further to join
                                        session
                                   </p>
                              </div>
                              <AppButton onClick={joinMeeting} filled>
                                   Click to join
                              </AppButton>
                         </div>
                    </div>
               )}
          </div>
     );
};

interface MentorParticipateViewProps {
     participantId: string;
     userName: string;
     leave: () => void;
     toggleWebcam: (camera: boolean) => void;
     toggleMic: (mic: boolean) => void;
     messages: any;
     mentorId: string;
     userId: string;
     roomId: string;
}
const MentorParticipantView: FC<MentorParticipateViewProps> = ({
     leave,
     participantId,
     toggleMic,
     toggleWebcam,
     userName,
     mentorId,
     messages,
     userId,
     roomId,
}) => {
     const micRef = useRef(null) as any;
     const { webcamStream, micStream, webcamOn, micOn, isLocal, displayName } = useParticipant(participantId);
     const webcamRef = useRef(null) as any;
     useEffect(() => {
          if (webcamRef.current) {
               if (webcamOn && webcamStream) {
                    const mediaStream = new MediaStream();
                    mediaStream.addTrack(webcamStream.track);

                    webcamRef.current.srcObject = mediaStream;
                    webcamRef.current
                         .play()
                         .catch((error: any) => console.error("videoElem.current.play() failed", error));
               } else {
                    webcamRef.current.srcObject = null;
               }
          }
     }, [webcamStream, webcamOn]);
     useEffect(() => {
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
                              .catch((error: any) => console.error("videoElem.current.play() failed", error));
                    } else {
                         micRef.current.srcObject = null;
                    }
               }
          })();
     }, [micStream, micOn]);
     const itsMe = userName === displayName;
     const navigate = useNavigate();

     const onLeave = () => {
          socketService.emit("CALL_END", {
               userId: userId,
               mentorId: mentorId,
               messages: messages,
               roomId: roomId,
          });
          navigate("/mentor/dashboard", { replace: true });
     };

     return (
          <div className="w-full h-full flex flex-col">
               <audio ref={micRef} autoPlay playsInline muted={isLocal} />
               {webcamOn && itsMe && (
                    <div className="w-[30%] h-[30%] relative">
                         <div className="absolute bottom-8 rounded-lg left-5 p-2 bg-primary-500 w-full">
                              <video className="rounded-lg" ref={webcamRef} autoPlay />
                         </div>
                    </div>
               )}
               {webcamOn && !itsMe && (
                    <div className="w-full h-full">
                         <video className="w-full h-full" ref={webcamRef} autoPlay />
                    </div>
               )}
               {itsMe && (
                    <div className="flex items-center gap-5 bg-primary-500 rounded-lg text-white p-3">
                         <p className="capitalize">{!itsMe ? displayName : `Your Preferences`} </p>
                         <button onClick={onLeave}>
                              <IoExitOutline size={32} />
                         </button>
                         <button onClick={() => toggleWebcam(webcamOn)}>
                              {webcamOn ? <CiVideoOn size={32} /> : <CiVideoOff size={32} />}
                         </button>
                         <button onClick={() => toggleMic(micOn)}>
                              {micOn ? <CiMicrophoneOn size={32} /> : <CiMicrophoneOff size={32} />}
                         </button>
                    </div>
               )}
          </div>
     );
};
