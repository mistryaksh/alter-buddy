import React, { useEffect } from "react";
import { MentorLayout } from "../../../../layout";
import { useAppDispatch } from "../../../../redux";
import { handleReceiveCall } from "../../../../redux/features";
import { selectIsConnectedToRoom, useHMSStore } from "@100mslive/react-sdk";
import {
  CallConference,
  CallFooter,
  CallHeader,
  JoinForm,
} from "../../../../component";
import { useParams } from "react-router-dom";
import { useLazyGetSessionByIdQuery } from "../../../../redux/rtk-api";
import { callType } from "../../../../interface";

export const MentorVideoCallPage = () => {
  const dispatch = useAppDispatch();

  const isConnected = useHMSStore(selectIsConnectedToRoom);
  const { id } = useParams();
  const [
    Session,
    { isError: isSessionError, error: sessionError, data: sessionData },
  ] = useLazyGetSessionByIdQuery();

  useEffect(() => {
    dispatch(handleReceiveCall(false));
    if (isSessionError) {
      console.log(sessionError);
    }
    if (id) {
      (async () => {
        await Session(id);
      })();
    }
  }, [dispatch, id, Session, isSessionError, sessionError]);

  return (
    <MentorLayout>
      {isConnected && (
        <div className="w-full relative">
          <CallHeader width={90} />
          <CallConference />
          <CallFooter
            isAudioCall={
              sessionData?.data.sessionDetails.callType === "audio"
                ? "audio"
                : ("video" as callType)
            }
            cancellationPath="/mentor/dashboard"
            width={90}
          />
        </div>
      )}
      {!isConnected && (
        <JoinForm
          isAudioCall={
            sessionData?.data.sessionDetails.callType === "audio" ? true : false
          }
          roomCode={id as string}
          cancellationPath="/mentor/dashboard"
          mentorName={`${sessionData?.data.users.user.name.firstName} ${sessionData?.data.users.user.name.lastName}`}
          userName={`${sessionData?.data.users.mentor.name.firstName} ${sessionData?.data.users.mentor.name.lastName}`}
        />
      )}
    </MentorLayout>
  );
};
