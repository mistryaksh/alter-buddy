import React, { FC, useState } from "react";
import { AudioLevelIcon } from "@100mslive/react-icons";
import {
  selectIsLocalAudioPluginPresent,
  selectIsLocalScreenShared,
  selectRoom,
  useAVToggle,
  useHMSActions,
  useHMSStore,
  selectIsConnectedToRoom,
} from "@100mslive/react-sdk";
import { HMSKrispPlugin } from "@100mslive/hms-noise-cancellation";
import { LuScreenShare, LuScreenShareOff } from "react-icons/lu";
import {
  MdOutlineExitToApp,
  MdOutlineMessage,
  MdOutlineMic,
  MdOutlineMicOff,
  MdOutlineVideocam,
  MdOutlineVideocamOff,
} from "react-icons/md";
import moment from "moment";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";

const plugin = new HMSKrispPlugin();

interface CallFooterProps {
  width: string;
  cancellationPath:string
}

export const CallFooter: FC<CallFooterProps> = ({ width ,cancellationPath}) => {
  const { isLocalAudioEnabled, isLocalVideoEnabled, toggleAudio, toggleVideo } =
    useAVToggle();
  const amIScreenSharing = useHMSStore(selectIsLocalScreenShared);
  const actions = useHMSActions();
  const room = useHMSStore(selectRoom);
  const isAudioPluginAdded = useHMSStore(
    selectIsLocalAudioPluginPresent(plugin.getName())
  );
  const isConnected = useHMSStore(selectIsConnectedToRoom);
  const hmsActions = useHMSActions();
  const [isPluginActive, setIsPluginActive] = useState(false);
  const navigate = useNavigate()

  return (
    <div
      className={clsx(
        `flex gap-10 bg-gray-950 rounded-lg fixed bottom-10 text-white p-5 w-[${width}] justify-start items-center`
      )}
    >
      <button
        className={`${isLocalAudioEnabled ? "" : ""}`}
        onClick={toggleAudio}
      >
        {isLocalAudioEnabled ? (
          <MdOutlineMic size={30} />
        ) : (
          <MdOutlineMicOff size={30} />
        )}
      </button>
      <button
        title="Screenshare"
        className={`${amIScreenSharing ? "" : "highlight"}`}
        onClick={() => actions.setScreenShareEnabled(!amIScreenSharing)}
      >
        {!amIScreenSharing ? (
          <LuScreenShare size={30} />
        ) : (
          <LuScreenShareOff size={30} />
        )}
      </button>
      <button
        className={`${isLocalVideoEnabled ? "" : "highlight"}`}
        onClick={toggleVideo}
      >
        {isLocalVideoEnabled ? (
          <MdOutlineVideocam fontSize={30} />
        ) : (
          <MdOutlineVideocamOff fontSize={30} />
        )}
      </button>

      {room.isNoiseCancellationEnabled ? (
        <button
          title="Noise cancellation"
          className={`btn-control ${isPluginActive ? "" : "highlight"}`}
          onClick={async () => {
            if (isAudioPluginAdded) {
              plugin.toggle();
              setIsPluginActive((prev) => !prev);
            } else {
              await actions.addPluginToAudioTrack(plugin);
              setIsPluginActive(true);
            }
          }}
        >
          <AudioLevelIcon />
        </button>
      ) : null}
      <button>
        <MdOutlineMessage size={30} />
      </button>
      {isConnected && (
        <button
          id="leave-btn"
          className="flex items-center"
          onClick={() => {
            hmsActions.leave();
            navigate(cancellationPath,{replace:true});
          }}
        >
          <MdOutlineExitToApp size={30} />
        </button>
      )}
      <p>{moment(room.startedAt).format("MMMM Do YYYY, h:mm:ss A")}</p>
    </div>
  );
};
