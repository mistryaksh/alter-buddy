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

export const MentorVideoCallPage = () => {
  const dispatch = useAppDispatch();
  const isConnected = useHMSStore(selectIsConnectedToRoom);
  const { id } = useParams();
  const [
    Session,
    {
      isError: isSessionError,
      error: sessionError,
      data: sessionData,
    },
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
 const layoutWidth:string = '90%'
  return (
    <MentorLayout>
      {isConnected && (
        <div className="w-full relative">
          <CallHeader width={layoutWidth} />
          <CallConference />
          <CallFooter cancellationPath="/mentor/dashboard" width={layoutWidth} />
        </div>
      )}
      {!isConnected && (
        <JoinForm
          roomCode={id as string}
          cancellationPath="/mentor/dashboard"
          mentorName={`${sessionData?.data.users.user.name.firstName} ${sessionData?.data.users.user.name.lastName}`}
          userName={`${sessionData?.data.users.mentor.name.firstName} ${sessionData?.data.users.mentor.name.lastName}`}
        />
      )}
    </MentorLayout>
  );
};
