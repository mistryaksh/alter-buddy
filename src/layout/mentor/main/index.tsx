import React, { FC, ReactNode } from "react";
import { MdLogout, MdOutlineDashboard } from "react-icons/md";
import { IoMdCalendar } from "react-icons/io";
import { BsChatDots } from "react-icons/bs";
import { AiOutlineLoading, AiOutlineSetting } from "react-icons/ai";

import { IconLinkButton } from "../../../component";

interface MentorLayoutProps {
     children: ReactNode;
     loading?: boolean;
}

export const MentorLayout: FC<MentorLayoutProps> = ({ children, loading }) => {
     return (
          <div className="flex h-screen bg-primary-500 py-3">
               <div className="w-[8%] px-5 flex flex-col items-center justify-center">
                    <div className="flex flex-col gap-5">
                         <IconLinkButton Icon={MdOutlineDashboard} path="/mentor/dashboard" />
                         <IconLinkButton Icon={IoMdCalendar} path="/mentor/schedules" />
                         <IconLinkButton Icon={BsChatDots} path="/mentor/chat" />
                         <IconLinkButton Icon={AiOutlineSetting} path="/mentor/settings" />
                         <IconLinkButton Icon={MdLogout} path="/mentor/logout" />
                    </div>
               </div>
               <main className="bg-white overflow-y-scroll p-10 rounded-tl-3xl rounded-bl-3xl mx-3 flex-1">
                    {loading ? (
                         <div className="flex justify-center items-center h-full w-full flex-col gap-10">
                              <AiOutlineLoading size={150} className="fill-primary-500 animate-spin" />
                              <p className="text-gray-500 text-2xl">Loading...</p>
                         </div>
                    ) : (
                         children
                    )}
               </main>
          </div>
     );
};
