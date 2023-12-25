import React, { useEffect } from "react";
import { useMeeting } from "@videosdk.live/react-sdk";
import { FC, useState } from "react";
import { UserParticipantView } from "../participate-view";
import { AppButton } from "../../../UI";
import { AiOutlineAudio, AiOutlineAudioMuted, AiOutlineLoading } from "react-icons/ai";
import { FiCamera, FiCameraOff } from "react-icons/fi";
import { handleCamera, handleMic, useVideoCallSlice } from "../../../../redux/features";
import { useAppDispatch } from "../../../../redux";
import { useNavigate } from "react-router-dom";
import { socketService } from "../../../../service/video-call.service";

interface UserMeetingViewProps {
     mentor: string;
     camera: boolean;
     id: string;
     mic: boolean;
}

function Controls() {
     const { leave, toggleMic, toggleWebcam } = useMeeting();
     return (
          <div className="flex gap-10">
               <button onClick={() => leave()}>Leave</button>
               <button onClick={() => toggleMic()}>toggleMic</button>
               <button onClick={() => toggleWebcam()}>toggleWebcam</button>
          </div>
     );
}
export const UserMeetingView: FC<UserMeetingViewProps> = ({ mentor, camera, mic, id }) => {
     const [joined, setJoined] = useState<string | null>(null);
     const dispatch = useAppDispatch();
     const navigate = useNavigate();
     const { meetingConfig } = useVideoCallSlice();
     //Get the method which will be used to join the meeting.
     //We will also get the participants list to display all participants
     const { join, participants } = useMeeting({
          //callback for when meeting is joined successfully
          onMeetingJoined: () => {
               setJoined("JOINED");
          },
     });

     useEffect(() => {
          socketService.on("START_CALL", (res) => {
               console.log(res);
               setJoined("JOINED");
               join();
          });
     }, [join]);

     return (
          <div className="h-screen">
               {joined && joined === "JOINED" ? (
                    <div className="">
                         {[...(participants.keys() as any)].map((participantId: string) => (
                              <UserParticipantView participantId={participantId} key={participantId} />
                         ))}
                         <Controls />
                    </div>
               ) : joined && joined === "JOINING" ? (
                    <div className="flex justify-center h-full items-center">
                         <AiOutlineLoading size={100} className="animate-spin" />
                         <p>Joining the meeting...</p>
                    </div>
               ) : (
                    <div className="flex justify-center h-full items-center">
                         <div className="w-[60%] shadow-lg border p-5 rounded-md">
                              <div>
                                   <h6 className="text-3xl text-gray-900 capitalize">
                                        Set up call preference with <span className="text-primary-500">{mentor}</span>
                                   </h6>
                                   <p className="text-gray-500">
                                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugit sit soluta
                                        mollitia a aperiam deleniti repellendus dicta iusto accusantium dolores.
                                   </p>
                              </div>
                              <div className="flex flex-col gap-3 items-start w-[50%] mt-5">
                                   <p>{meetingConfig.roomId}</p>
                                   <div className="flex gap-5 items-center">
                                        <button
                                             type="button"
                                             onClick={() => dispatch(handleCamera())}
                                             className="flex gap-5"
                                        >
                                             {camera ? <FiCamera size={30} /> : <FiCameraOff size={30} />}
                                             <p>Turn camera {camera ? "on" : "off"} & start session</p>
                                        </button>
                                   </div>
                                   <div className="flex gap-5 items-center">
                                        <button
                                             type="button"
                                             onClick={() => dispatch(handleMic())}
                                             className="flex gap-5"
                                        >
                                             {mic ? <AiOutlineAudio size={30} /> : <AiOutlineAudioMuted size={30} />}
                                             <p>Turn microphone {mic ? "on" : "off"} & start session</p>
                                        </button>
                                   </div>
                                   <div className="flex gap-5 items-center">
                                        <button
                                             type="button"
                                             onClick={() => dispatch(handleMic())}
                                             className="flex gap-8 items-center"
                                        >
                                             <p className="text-[20px]">90</p>
                                             <p>Minutes duration</p>
                                        </button>
                                   </div>
                              </div>
                              <div className="animate-pulse bg-primary-300 p-3 rounded-lg my-5">
                                   <p>Please wait until mentor accept your call</p>
                              </div>
                              <div className="flex items-end flex-col gap-5 justify-end">
                                   <AppButton onClick={() => navigate(`/user/mentor/details/${id}`)} flexed filled>
                                        Go back
                                   </AppButton>
                              </div>
                         </div>
                    </div>
               )}
          </div>
     );
};
