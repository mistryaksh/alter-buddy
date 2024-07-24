import React, { FC, useEffect, useRef, useState } from "react";
import { Message } from "ably";
import { useChannel } from "ably/react";
import moment from "moment";
import clsx from "clsx";
import { IoMdAttach } from "react-icons/io";
import { AiOutlineMessage, AiOutlineSend } from "react-icons/ai";
import { useSaveChatMutation } from "../../../../redux/rtk-api";
import { useVideoCallSlice } from "../../../../redux/features";
import { v4 } from "uuid";

interface InsiderChatProps {
  channelName: string;
  myUsername: string;
  mentorCall?: boolean;
  roomId: string;
}

export const InsiderChat: FC<InsiderChatProps> = ({
  channelName,
  myUsername,
  mentorCall,
  roomId,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const { chat } = useVideoCallSlice();
  const messageEndRef = useRef<HTMLDivElement>(null);
  const { channel } = useChannel(channelName);
  const [SaveChat, { isError, error, isLoading, isSuccess, data }] =
    useSaveChatMutation();
  useEffect(() => {
    if (isError) {
      console.log(error);
    }
    channel.subscribe((msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      channel.unsubscribe();
    };
  }, [
    channel,
    channelName,
    myUsername,
    isError,
    error,
    SaveChat,
    chat.chatRoomId,
  ]);

  const sendMessage = async () => {
    if (input.trim() !== "") {
      console.log(chat?.chatRoomId);
      await SaveChat({
        chatId: roomId as string,
        message: {
          message: input.trim(),
          messageId: v4(),
          senderId: "a",
          senderName: myUsername as string,
          timestamp: new Date().toString() as string,
          topic: "chat",
        },
      });
      await channel.publish({
        name: channelName,
        data: {
          username: myUsername,
          msg: input,
        },
      });
      setInput("");
    }
  };

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);
  return (
    <div className=" relative h-full">
      <div className={clsx("flex flex-col w-full gap-3")}>
        <div
          className={clsx(
            "w-full flex flex-col gap-3 bg-gray-50 rounded-lg p-2 overflow-y-scroll no-scrollbar",
            !mentorCall ? " h-[80vh] " : "h-[77vh]",
            mentorCall && "mt-24"
          )}
        >
          {messages.length !== 0 &&
            messages.map(({ data, timestamp }, i) => (
              <div
                key={i}
                className={clsx(
                  "w-full flex flex-col gap-3",
                  data.username === myUsername ? "items-end" : "items-start"
                )}
              >
                <div
                  className={clsx(
                    data.username === myUsername
                      ? "bg-primary-500 text-right text-white justify-end"
                      : "bg-gray-100",
                    "px-2 py-3 rounded-lg w-[45%]"
                  )}
                >
                  <p className="capitalize text-sm">{data.username}</p>
                  <p className="text-lg">{data.msg}</p>
                  <p
                    className={clsx(
                      data.username === myUsername
                        ? "text-gray-300 text-sm text-left"
                        : "text-gray-500 text-right",
                      ""
                    )}
                  >
                    {moment(timestamp).fromNow()}
                  </p>
                </div>
              </div>
            ))}
          {messages.length === 0 && (
            <div
              className={clsx(
                "flex flex-col items-center justify-center",
                !mentorCall ? "h-[50vh]" : "h-[60vh]"
              )}
            >
              <AiOutlineMessage size={300} />
              <p className="text-xl text-gray-500 capitalize">
                start sending messages
              </p>
            </div>
          )}
          <div className="w-[97%] pl-3 pr-1 py-1 z-50 rounded-lg absolute bottom-0 shadow-xl bg-white border border-gray-200 items-center gap-2 inline-flex justify-between">
            <div className="flex items-center gap-2 flex-1">
              <input
                onKeyPress={(prop) => {
                  if (prop.key === "Enter") {
                    sendMessage();
                  }
                }}
                className="grow shrink basis-0 w-full h-full py-2  text-black font-medium leading-4 focus:outline-none"
                placeholder="Start sending messages..."
                value={input}
                onChange={(event) => setInput(event.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 mr-2">
              <IoMdAttach size={25} />
              <button
                onClick={sendMessage}
                className="items-center flex gap-5 p-2 text-white bg-primary-600 rounded-lg"
              >
                <AiOutlineSend size={26} />
              </button>
            </div>
          </div>
          <div ref={messageEndRef} />
        </div>
      </div>
    </div>
  );
};
