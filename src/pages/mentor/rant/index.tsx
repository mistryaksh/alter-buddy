import React, { FC, useEffect, useState } from 'react';

import { AppButton } from '../../../component';
import { socket } from "../../../service";
import { MentorLayout } from '../../../layout';
import { AlterBuddyLogo } from '../../../assets/logo';

export const MentorRantPage: FC = () => {
  const [notification, setNotification] = useState<boolean>(false);
  const [chatRequest, setChatRequest] = useState<any>(null);

  const rantAccepted = () => {
    if (chatRequest) {
      socket.emit(
        'acceptChat',
        { roomId: chatRequest.roomId, accepted: true },
        () => {
          console.log('Chat request accepted');
          setNotification(false);

          if (chatRequest.endAt) {
            // Set timing for rant chat or audio
            localStorage.setItem(
              'endRantChatOrAudioAt',
              JSON.stringify(chatRequest.endAt)
            );

            let redirectionUrl = `https://rant-alterbudd.netlify.app/rant`;
            const redirectionUrlSearchParams = new URLSearchParams({
              roomId: chatRequest.roomId,
              mentorToken: localStorage.getItem("MENTOR_TOKEN"),
              endAt: chatRequest.endAt
            });

            if (chatRequest.requestType === 'audio') {
              redirectionUrl += '/audio';
            } else {
              redirectionUrl += '/chat';
            }

            redirectionUrl += `?${redirectionUrlSearchParams.toString()}`;

            window.location.replace(redirectionUrl);
          }
        }
      );
    }
  };

  useEffect(() => {
    const chatRequestData = localStorage.getItem('chatRequestData');

    if (chatRequestData) {
      setChatRequest(JSON.parse(chatRequestData));
      setNotification(true);
    }
  }, []);

  return (
    <MentorLayout>
      <AlterBuddyLogo />
      <div>Rant page</div>
      <div className="absolute bottom-20 right-20 z-50">
        {notification && chatRequest?.roomId && (
          <div className="animate__animated animate__bounceInRight">
            <AppButton filled onClick={rantAccepted} type="button">
              Accept Rant Request
            </AppButton>
          </div>
        )}
      </div>
    </MentorLayout>
  )
}

export default MentorRantPage;
