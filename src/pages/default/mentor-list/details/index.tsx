import React, { useEffect } from "react";
import { MainLayout } from "../../../../layout";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../../../redux";
import {
     useBookMentorSlotMutation,
     useGetMentorUsingIdQuery,
     useLazyGetSlotsByMentorIdQuery,
     useProfileUserQuery,
} from "../../../../redux/rtk-api";
import { handleError } from "../../../../redux/features";
import { AppButton } from "../../../../component";
import { AiFillStar, AiOutlineCalendar, AiOutlineLoading, AiOutlineMessage, AiOutlineStar } from "react-icons/ai";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import { MdVerified } from "react-icons/md";
import { BsGraphUpArrow } from "react-icons/bs";
import { FaRegCommentDots } from "react-icons/fa6";
import moment from "moment";
import clsx from "clsx";

export const UserMentorDetailsPage = () => {
     const navigate = useNavigate();

     const { id } = useParams();
     const dispatch = useAppDispatch();
     const {
          isError: isMentorError,
          isLoading: isMentorLoading,
          data: mentor,
          error: mentorError,
     } = useGetMentorUsingIdQuery(id as string);
     const [GetMentorSlots, { isError: isSlotError, error: slotError, isLoading: isSlotLoading, data: slotData }] =
          useLazyGetSlotsByMentorIdQuery();
     const { data: profile, isError: isProfileError, error: profileError } = useProfileUserQuery();
     const [
          BookSlotWithMentor,
          {
               isError: isBookSlotError,
               isLoading: isBookSlotLoading,
               data: bookSlotData,
               error: bookSlotError,
               isSuccess: isBookSlotSuccess,
          },
     ] = useBookMentorSlotMutation();

     useEffect(() => {
          if (isMentorError) {
               if ((mentorError as any).data) {
                    dispatch(handleError((mentorError as any).data.message));
               } else {
                    console.log(mentorError);
               }
          }
          if (isBookSlotError) {
               if ((bookSlotError as any).data) {
                    console.log((bookSlotError as any).data);
                    dispatch(handleError((bookSlotError as any).data.message));
               } else {
                    console.log(bookSlotError as any);
                    console.log(bookSlotError);
               }
          }
          if (isSlotError) {
               if ((slotError as any).data) {
                    dispatch(handleError((slotError as any).data.message));
               } else {
                    console.log(slotError);
               }
          }
          if (isProfileError) {
               if ((profileError as any).data) {
                    dispatch(handleError((profileError as any).data.message));
               } else {
                    console.log(profileError);
               }
          }
          if (isBookSlotSuccess) {
               console.log(bookSlotData?.data);
          }
          if (id) {
               (async () => {
                    await GetMentorSlots(id);
               })();
          }
     }, [
          isMentorError,
          mentorError,
          dispatch,
          id,
          GetMentorSlots,
          isSlotError,
          slotError,
          isProfileError,
          profileError,
          isBookSlotError,
          bookSlotError,
          isBookSlotSuccess,
          bookSlotData,
     ]);

     const BookSlot = async ({
          userId,
          slotId,
          mainId,
          mentorId,
     }: {
          userId: string;
          slotId: string;
          mainId: string;
          mentorId: string;
     }) => {
          await BookSlotWithMentor({ slotId, userId, mainId, mentorId });
     };

     return (
          <MainLayout loading={isMentorLoading}>
               <div className="px-10 py-10 border">
                    <div className="flex items-start gap-10 justify-between">
                         <div className=" flex-1">
                              <div className="flex gap-10 justify-between w-full items-center">
                                   <div className="flex gap-10 items-center">
                                        <img
                                             src="https://www.freepnglogos.com/uploads/doctor-png/doctor-bulk-billing-doctors-chapel-hill-health-care-medical-3.png"
                                             alt="mentor "
                                             className="w-[25%] rounded-lg border-2 p-2 border-dashed border-primary-500"
                                        />
                                        <div className="flex items-start flex-col">
                                             <h6 className="text-3xl capitalize">
                                                  {mentor?.data.name.firstName} {mentor?.data.name.lastName.charAt(0)}.
                                             </h6>

                                             <p className="capitalize">{mentor?.data.specialists.join(", ")}</p>
                                             <div className="flex items-center gap-3 my-2">
                                                  <p className="text-gray-500">Ratings</p>
                                                  <div className="flex items-center">
                                                       <AiFillStar className="fill-primary-500" size={22} />
                                                       <AiFillStar className="fill-primary-500" size={22} />
                                                       <AiFillStar className="fill-primary-500" size={22} />
                                                       <AiFillStar className="fill-primary-500" size={22} />
                                                       <AiOutlineStar size={20} />
                                                  </div>
                                             </div>
                                        </div>
                                   </div>
                                   <div>
                                        {!mentor?.data.accountStatus.verification && (
                                             <div className="flex items-center gap-3">
                                                  <MdVerified size={28} className="text-primary-500" />
                                                  <p className="uppercase text-primary-500 font-bold">verified</p>
                                             </div>
                                        )}
                                   </div>
                              </div>
                              <hr className="my-10" />
                              <div className="flex flex-col gap-5">
                                   <div className="flex items-center gap-5">
                                        <div className="bg-primary-200 p-3 rounded-lg">
                                             <BsGraphUpArrow size={20} className="fill-primary-500" />
                                        </div>
                                        <p className="text-md capitalize text-gray-500">20 Sessions</p>
                                   </div>
                                   <div className="flex items-center gap-5">
                                        <div className="bg-primary-200 p-3 rounded-lg">
                                             <FaRegCommentDots size={20} className="fill-primary-500" />
                                        </div>
                                        <p className="text-md capitalize text-gray-500">20 comments</p>
                                   </div>
                              </div>
                         </div>
                         <div className="w-[40%] shadow-xl border border-gray-300 p-5 rounded-lg">
                              {slotData?.data.length !== 0 && (
                                   <div>
                                        <p className="text-gray-500 my-2">
                                             Schedule a personal audio/video session and feel better.
                                        </p>
                                        <div className="flex items-center gap-3">
                                             <AiOutlineCalendar size={30} className="fill-primary-500" />
                                             <div>
                                                  <p className="text-lg text-gray-900 font-bold">Book Session</p>
                                             </div>
                                        </div>
                                   </div>
                              )}

                              {isBookSlotLoading && isSlotLoading && (
                                   <div>
                                        <AiOutlineLoading size={30} className="fill-primary-500" />
                                        <p>Slots are loading</p>
                                   </div>
                              )}
                              {slotData?.data.length !== 0 &&
                                   slotData?.data.map(({ slots, slotsDate, _id }) => (
                                        <div className="my-5" key={_id}>
                                             <label className="text-gray-900 capitalize text-sm" htmlFor="date">
                                                  Slots for -{" "}
                                                  <span className="text-primary-500 uppercase font-extrabold">
                                                       {moment(slotsDate).format("MMM Do YYYY")}
                                                  </span>
                                             </label>
                                             <div className="flex gap-5 flex-wrap mt-3">
                                                  {slots.map(({ time, booked, _id: slotId }) => (
                                                       <button
                                                            disabled={booked}
                                                            onClick={() =>
                                                                 BookSlot({
                                                                      slotId: slotId as string,
                                                                      userId: profile?.data._id as string,
                                                                      mainId: _id as string,
                                                                      mentorId: mentor?.data._id as string,
                                                                 })
                                                            }
                                                            key={slotId}
                                                            className={clsx(
                                                                 "border px-5 py-3 border-primary-500 rounded-lg cursor-pointer group disabled:opacity-50"
                                                            )}
                                                       >
                                                            <p
                                                                 className={clsx(
                                                                      booked && "line-through w-full",
                                                                      "group-hover:text-primary-500 text-primary-500"
                                                                 )}
                                                            >
                                                                 {time}
                                                            </p>
                                                       </button>
                                                  ))}
                                             </div>
                                        </div>
                                   ))}
                              <hr />
                              <div className="my-5">
                                   <div className="flex gap-3 items-center">
                                        <AiOutlineMessage size={30} className="fill-primary-500" />
                                        <p className="text-gray-900 capitalize font-bold">
                                             Chat with {mentor?.data.name.firstName}{" "}
                                             {mentor?.data.name.lastName.charAt(0)}.
                                        </p>
                                   </div>
                                   <p className="text-gray-500 my-2">Chat with the expert and get instant guidance</p>
                                   <div className="w-full mt-5">
                                        <AppButton
                                             outlined
                                             flexed
                                             onClick={() => navigate(`/user/video/onboard/${mentor?.data._id}`)}
                                        >
                                             <div className="flex gap-3">Chat now</div>
                                        </AppButton>
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>
          </MainLayout>
     );
};
