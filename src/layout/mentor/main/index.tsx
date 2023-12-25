import React, { FC, ReactNode, useCallback, useEffect } from "react";
import { MdLogout, MdOutlineHome } from "react-icons/md";
import { IoMdCalendar } from "react-icons/io";
import { AiOutlineLoading, AiOutlineSetting } from "react-icons/ai";

import { IconLinkButton } from "../../../component";
import { socketService } from "../../../service/video-call.service";
import { useGenerateVideoCallTokenQuery, useLazyGetUserByIdQuery, useMentorProfileQuery } from "../../../redux/rtk-api";
import { getCall, handleMeetingConfig, removeCall, useMentorSlice, useVideoCallSlice } from "../../../redux/features";
import { useAppDispatch } from "../../../redux";
import { FiPhoneCall, FiPhoneOff, FiPhoneIncoming } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

interface MentorLayoutProps {
     children: ReactNode;
     loading?: boolean;
     hideNavs?: boolean;
}

export const MentorLayout: FC<MentorLayoutProps> = ({ children, loading, hideNavs }) => {
     const { data: mentor } = useMentorProfileQuery();
     const [
          GetUserById,
          { data: user, isError: isUserError, isLoading: isUserLoading, error: userError, isSuccess: isUserSuccess },
     ] = useLazyGetUserByIdQuery();
     const { data: token } = useGenerateVideoCallTokenQuery();
     const { call } = useMentorSlice();
     const dispatch = useAppDispatch();
     const { meetingConfig } = useVideoCallSlice();
     const navigate = useNavigate();

     useEffect(() => {
          if (isUserError) {
               if ((userError as any).data) {
                    console.log((userError as any).data.message);
               } else {
                    console.log(userError);
               }
          }
          socketService.on("THROW_CALL_REQUEST", (res: any) => {
               if (mentor?.data._id === res.mentor._id) {
                    (async () => {
                         await GetUserById(res.user._id as string);
                         dispatch(getCall());
                         dispatch(
                              handleMeetingConfig({
                                   token: token?.data,
                                   roomId: res.data.roomId,
                              })
                         );
                    })();
               }
          });
     }, [mentor, dispatch, isUserError, userError, GetUserById, user, token]);

     const AcceptCall = useCallback(() => {
          socketService.emit("CALL_ACTION", { action: "ACCEPT", meetingConfig });
          dispatch(removeCall());
          navigate(`/mentor/chat/${user?.data._id}`);
     }, [meetingConfig, navigate, dispatch, user]);

     const RejectCall = useCallback(() => {
          socketService.emit("CALL_ACTION", { action: "REJECT", meetingConfig });
          dispatch(removeCall());
     }, [meetingConfig, dispatch]);

     return (
          <div className="flex xl:flex-row lg:flex-row flex-col h-screen bg-primary-500 py-3">
               {!hideNavs && (
                    <div className="w-[8%] px-5 flex  xl:flex-col xl:items-center xl:justify-center">
                         <div className="flex xl:my-0 mb-5 xl:flex-col gap-5">
                              <IconLinkButton Icon={MdOutlineHome} path="/mentor/dashboard" />
                              <IconLinkButton Icon={FiPhoneIncoming} path="/mentor/call-history" />
                              <IconLinkButton Icon={IoMdCalendar} path="/mentor/schedules" />
                              <IconLinkButton Icon={AiOutlineSetting} path="/mentor/settings" />
                              <IconLinkButton Icon={MdLogout} path="/mentor/logout" />
                         </div>
                    </div>
               )}
               <main className="bg-white overflow-y-scroll p-10 rounded-tl-3xl rounded-bl-3xl mx-3 flex-1">
                    {call && isUserSuccess && (
                         <div className="bg-primary-300 p-5 rounded-lg mb-5 animate-pulse">
                              <div className="mt-2 flex items-center justify-between">
                                   <div className="flex items-center gap-10">
                                        <img
                                             src="https://preview.keenthemes.com/metronic-v4/theme/assets/pages/media/profile/profile_user.jpg"
                                             alt=""
                                             className="w-[100px] rounded-full"
                                        />
                                        <div>
                                             <h6 className="text-2xl capitalize">
                                                  {user?.data.name.firstName} {user?.data.name.lastName}
                                             </h6>
                                             <p>{meetingConfig.roomId}</p>
                                        </div>
                                   </div>
                                   <div className="flex gap-3 items-center">
                                        <button onClick={AcceptCall} className="bg-primary-500 p-3 rounded-lg">
                                             <FiPhoneCall size={22} color="#fff" />
                                        </button>
                                        <button onClick={RejectCall} className="bg-red-500 p-3 rounded-lg">
                                             <FiPhoneOff color="#fff" size={22} />
                                        </button>
                                   </div>
                              </div>
                         </div>
                    )}
                    {loading || isUserLoading ? (
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
