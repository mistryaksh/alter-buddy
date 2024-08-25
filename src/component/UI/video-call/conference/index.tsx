import React from "react";
import {
  selectPeers,
  selectPeersScreenSharing,
  useHMSStore,
} from "@100mslive/react-sdk";
import { VideoCallPeer } from "../peer";
import { ScreenTile } from "../screen-tile";

export const CallConference = () => {
  const peers = useHMSStore(selectPeers);
  const presenters = useHMSStore(selectPeersScreenSharing);

  return (
    <div className="items-center flex w-full mt-20 justify-center gap-5">
      <div className="flex-1 flex items-center gap-5">
        {peers.map((peer) => (
          <VideoCallPeer key={peer.id} {...peer} />
        ))}
      </div>
      <div className="flex-1 mt-20">
        {presenters.map((peer) => (
          <ScreenTile key={"screen" + peer.id} peer={peer} />
        ))}
      </div>
    </div>
  );
};
