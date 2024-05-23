import React from "react";
import {
  selectScreenShareByPeerID,
  useHMSStore,
  useVideo,
} from "@100mslive/react-sdk";

export const ScreenTile = ({ peer }: any) => {
  const screenshareVideoTrack = useHMSStore(selectScreenShareByPeerID(peer.id));
  const { videoRef } = useVideo({
    trackId: screenshareVideoTrack.id,
    attach: true,
  });

  return (
    <div className="peer-container z-50">
      <video ref={videoRef} className="peer-video" autoPlay muted playsInline />
      <div className="peer-name capitalize animate-pulse text-primary-500 text-xl duration-75 transition-all">
        Screen shared by {peer.name} {peer.isLocal ? "(You)" : ""}
      </div>
    </div>
  );
};
