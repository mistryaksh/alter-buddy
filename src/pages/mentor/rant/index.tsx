import React, { FC, useEffect, useState } from "react";

import { socket } from "../../../service";
import { MentorLayout } from "../../../layout";
import { AlterBuddyLogo } from "../../../assets/logo";

export const MentorRantPage: FC = () => {
  const [notification, setNotification] = useState<boolean>(false);
  const [chatRequest, setChatRequest] = useState<any>(null);
  const rantDecline = () => {
    setNotification(false);
    setChatRequest(null);
  };

  const rantAccepted = () => {
    if (chatRequest) {
      socket.emit(
        "acceptChat",
        { roomId: chatRequest.roomId, accepted: true },
        () => {
          setNotification(false);

          if (chatRequest.endAt) {
            // Set timing for rant chat or audio
            localStorage.setItem(
              "endRantChatOrAudioAt",
              JSON.stringify(chatRequest.endAt)
            );

            let redirectionUrl = `https://rant.alterbuddy.com/rant`;
            const redirectionUrlSearchParams = new URLSearchParams({
              roomId: chatRequest.roomId,
              mentorToken: localStorage.getItem("MENTOR_TOKEN"),
              endAt: chatRequest.endAt,
            });

            if (chatRequest.requestType === "audio") {
              redirectionUrl += "/audio";
            } else {
              redirectionUrl += "/chat";
            }

            redirectionUrl += `?${redirectionUrlSearchParams.toString()}`;

            window.location.replace(redirectionUrl);
          }
        }
      );
    }
  };

  useEffect(() => {
    const chatRequestData = localStorage.getItem("chatRequestData");

    if (chatRequestData) {
      setChatRequest(JSON.parse(chatRequestData));
      setNotification(true);
    }
  }, []);

  return (
    <MentorLayout>
      <AlterBuddyLogo />
      <div>Rant page</div>
      <div className="h-[80vh] relative">
        <div className="absolute bottom-5 right-5 z-50  w-[30%]">
          {notification && chatRequest?.roomId && (
            <div className="animate__animated animate__bounceInRigh animate animate-pulse">
              <div className="flex flex-col items-center justify-center  rounded-lg shadow-2xl border-2 border-gray-500 bg-gray-100">
                <div className="bg-white p-6 rounded-lg shadow-lg text-center w-full">
                  <p className="text-lg text-gray-500 mb-4 text-right">
                    Stay anonymous during this call
                  </p>
                  <h2 className="text-xl font-semibold text-gray-800 mb-4 text-right">
                    Incoming Call
                  </h2>
                  <p className="text-lg text-right text-gray-600">
                    Anonymous Caller
                  </p>
                  <div className="flex justify-between items-center space-x-4 w-full">
                    <button
                      onClick={rantAccepted}
                      className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 focus:outline-none"
                    >
                      Answer
                    </button>

                    <button
                      onClick={rantDecline}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 focus:outline-none"
                    >
                      Decline
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </MentorLayout>
  );
};

export default MentorRantPage;
