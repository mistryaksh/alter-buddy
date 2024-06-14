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
    <div className="items-center flex w-full mt-20 justify-center gap-5 flex-wrap">
      <div className="flex-1 flex items-center gap-5 relative">
        {peers.map((peer) => (
          <VideoCallPeer key={peer.id} {...peer} />
        ))}
      </div>
      {presenters.map((peer) => (
        <div
          key={"screen" + peer.id}
          className="flex-1 mt-20 flex flex-col gap-5"
        >
          <ScreenTile peer={peer} />
        </div>
      ))}
    </div>
  );
};
