import React from "react";
import {
  selectIsPeerAudioEnabled,
  selectIsPeerVideoEnabled,
  useVideo,
  useHMSStore,
  HMSPeer,
} from "@100mslive/react-sdk";
import { AiOutlineUser } from "react-icons/ai";
import { MdMic, MdMicOff } from "react-icons/md";
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
    <div className="flex-1 flex mt-20 relative">
      <div className="relative flex-1">
        {isPeerVideoEnabled && (
          <video
            ref={videoRef}
            className="w-full h-full rounded-lg"
            autoPlay
            muted
            playsInline
          />
        )}

        <div className="absolute bottom-5 right-5 bg-gray-900 bg-opacity-70 p-2 shadow-lg rounded-md">
          <IconButton>
            {isPeerAudioEnabled ? <MdMic size={25} /> : <MdMicOff size={25} />}
          </IconButton>
        </div>
        {!isPeerVideoEnabled ? (
          <div className="w-full h-[22rem] rounded-lg bg-gray-300 flex justify-center items-center">
            <AiOutlineUser
              size={100}
              fill="current"
              className="fill-primary-500"
            />
          </div>
        ) : null}
      </div>
      <div className="absolute bottom-5 left-5 bg-gray-900 rounded-lg bg-opacity-70 p-2">
        <p className="font-sans capitalize text-sm text-white">
          {name} <span className="text-gray-500">{isLocal ? "(You)" : ""}</span>
          {/* {isPeerAudioEnabled ? } */}
        </p>
      </div>
    </div>
  );
};
