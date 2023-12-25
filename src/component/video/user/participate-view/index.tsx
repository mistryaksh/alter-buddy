import { useParticipant } from "@videosdk.live/react-sdk";
import { FC, useEffect, useMemo, useRef } from "react";
import ReactPlayer from "react-player";

interface UserParticipantViewProps {
     participantId: string;
}

export const UserParticipantView: FC<UserParticipantViewProps> = ({ participantId }) => {
     const micRef = useRef(null) as any;
     const { webcamStream, micStream, webcamOn, micOn, isLocal, displayName } = useParticipant(participantId);

     const videoStream = useMemo(() => {
          if (webcamOn && webcamStream) {
               const mediaStream = new MediaStream();
               mediaStream.addTrack(webcamStream.track);
               return mediaStream;
          }
     }, [webcamStream, webcamOn]);

     useEffect(() => {
          if (micRef.current) {
               if (micOn && micStream) {
                    const mediaStream = new MediaStream();
                    mediaStream.addTrack(micStream.track);

                    (micRef.current as any).srcObject = mediaStream;
                    micRef.current
                         .play()
                         .catch((error: any) => console.error("videoElem.current.play() failed", error));
               } else {
                    micRef.current.srcObject = null;
               }
          }
     }, [micStream, micOn]);

     return (
          <div className="w-[50%]">
               <audio ref={micRef} autoPlay playsInline muted={isLocal} />
               {webcamOn ? (
                    <div className="rounded-lg border">
                         <ReactPlayer
                              playsinline // very very imp prop
                              pip={false}
                              light={false}
                              controls={false}
                              muted={true}
                              playing={true}
                              url={videoStream}
                              onError={(err) => {
                                   console.log(err, "participant video error");
                              }}
                         />
                         <p>{displayName}</p>
                    </div>
               ) : (
                    <div className="border-4 border-red-500 h-full w-full p-3"></div>
               )}
          </div>
     );
};
