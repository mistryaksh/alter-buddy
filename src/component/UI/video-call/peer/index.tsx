import React from "react";
import {
  selectIsPeerAudioEnabled,
  selectIsPeerVideoEnabled,
  useVideo,
  useHMSStore,
  HMSPeer,
} from "@100mslive/react-sdk";
import clsx from "clsx";
import { FiMic, FiMicOff } from "react-icons/fi";
import { IconButton } from "@100mslive/roomkit-react";

export const VideoCallPeer = ({
  id,
  videoTrack,
  isLocal,
  name,
  roleName,
}: HMSPeer) => {
  const { videoRef } = useVideo({
    trackId: videoTrack,
  });

  const isPeerAudioEnabled = useHMSStore(selectIsPeerAudioEnabled(id));
  const isPeerVideoEnabled = useHMSStore(selectIsPeerVideoEnabled(id));

  return (
    <div
      className={
        isLocal
          ? "absolute bottom-0 z-30 right-0 w-[300px]"
          : "w-[60hv] h-[60vh] relative"
      }
    >
      {!isLocal && (
        <div className="absolute px-5 py-3 text-white bg-gray-900 left-0 -bottom-14 rounded-lg flex w-full justify-between items-center">
          <div className="capitalize ">
            {name} - {roleName === "host" && "Mentor"}
          </div>
          <IconButton>
            {isPeerAudioEnabled ? <FiMic size={20} /> : <FiMicOff size={20} />}
          </IconButton>
        </div>
      )}
      {isPeerVideoEnabled && (
        <video
          ref={videoRef}
          className={clsx(
            isLocal ? "border-4 border-primary-500 z-30" : "z-20 w-full h-full"
          )}
          autoPlay
          muted
          playsInline
        />
      )}
    </div>
  );
};
