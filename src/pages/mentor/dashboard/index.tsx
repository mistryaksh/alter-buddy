import React, { useEffect } from "react";
import { MentorLayout } from "../../../layout";
import { useMentorGetMyCallsQuery, useMentorGetMySchedulesQuery, useMentorProfileQuery } from "../../../redux/rtk-api";
import ContentLoader from "react-content-loader";
import { Link } from "react-router-dom";
import moment from "moment";
import clsx from "clsx";

export const MentorDashboardPage = () => {
     const {
          data: profile,
          isLoading: isProfileLoading,
          isError: isProfileError,
          error: profileError,
     } = useMentorProfileQuery();
     const {
          data: calls,
          isError: isCallError,
          error: callError,
          // isLoading: isCallLoading,
     } = useMentorGetMyCallsQuery();
     const {
          data: slots,
          isError: isSlotError,
          error: slotError,
          // isLoading: isSlotLoading,
     } = useMentorGetMySchedulesQuery();

     useEffect(() => {
          if (isProfileError) {
               console.log(profileError);
          }
          if (isCallError) {
               console.log(callError);
          }
          if (isSlotError) {
               console.log(slotError);
          }
     }, [isProfileError, profileError, isSlotError, slotError, isCallError, callError]);
     const lengthFormatter = Intl.NumberFormat("en", { notation: "compact" });

     return (
          <MentorLayout>
               {!isProfileLoading ? (
                    <div className="flex justify-between items-center shadow-xl border rounded-lg p-5">
                         <div className="flex flex-col gap-2">
                              <h3 className="text-2xl font-extrabold capitalize">
                                   Good morning{" "}
                                   <span className=" font-extrabold text-primary-500">
                                        Dr.{profile?.data.name.firstName}!
                                   </span>
                              </h3>
                              <p className="text-primary-500">{moment().format("dddd, MMMM YYYY")}</p>
                         </div>
                         <div className="flex gap-3 items-center">
                              <Link to="/mentor/call-history">Appointment History</Link>
                              <button className="bg-primary-300 px-5 py-2 text-gray-900 rounded-lg">Upload slot</button>
                         </div>
                    </div>
               ) : (
                    <ContentLoader
                         speed={2}
                         width={400}
                         height={160}
                         viewBox="0 0 400 160"
                         backgroundColor="#f3f3f3"
                         foregroundColor="#ecebeb"
                         // {...props}
                    >
                         <rect x="48" y="8" width="100" height="10" />
                         <rect x="48" y="26" width="120" height="10" />
                    </ContentLoader>
               )}
               <hr className="my-10" />
               <div className="grid gap-10 items-start xl:grid-cols-3 lg:grid-cols-6 md:grid-cols-3 sm:grid-cols-1 grid-cols-1">
                    <div className="shadow-xl p-5 rounded-lg">
                         <h6 className="text-5xl text-primary-500">
                              {slots?.data.length ? lengthFormatter.format(slots?.data.length) : 0}
                         </h6>
                         <p className="text-gray-500 capitalize">Slots Are Uploaded</p>
                    </div>
                    <div className="shadow-xl p-5 rounded-lg">
                         <h6 className="text-5xl text-primary-500">
                              {calls?.data.length ? lengthFormatter.format(calls?.data.length) : 0}
                         </h6>
                         <p className="text-gray-500 capitalize">Calls Attained By You</p>
                    </div>
                    <div className="shadow-xl p-5 rounded-lg">
                         {slots?.data.map(({ slots, slotsDate, _id }) => {
                              return (
                                   <div className="w-full" key={_id}>
                                        <div className="bg-primary-200 py-3 px-1">
                                             <p>{moment(slotsDate).format("Do MMMM YYYY")}</p>
                                        </div>
                                        <div className="flex items-start gap-3 flex-wrap my-2">
                                             {slots.map(({ time, _id: slotId, booked, userId }) => {
                                                  const main = moment(slotsDate).add(time, "minute");
                                                  return (
                                                       <div
                                                            key={slotId}
                                                            className={clsx(
                                                                 "p-3 rounded-md flex flex-col items-center   ",
                                                                 !booked ? "bg-primary-300" : "bg-gray-300 "
                                                            )}
                                                       >
                                                            <p className={clsx(booked && "line-through")}>
                                                                 {moment(main).format("hh:mm A")}
                                                            </p>
                                                            {booked && (
                                                                 <span className="capitalize text-primary-500">
                                                                      {userId?.name.firstName} {userId?.name.lastName}
                                                                 </span>
                                                            )}
                                                       </div>
                                                  );
                                             })}
                                        </div>
                                   </div>
                              );
                         })}
                    </div>
               </div>
          </MentorLayout>
     );
};
