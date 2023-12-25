import React, { useEffect, useState } from "react";
import { MentorLayout } from "../../../../layout";
import {
     useDeleteSlotAsMentorByIdMutation,
     useMentorCreateScheduleMutation,
     useMentorGetMySchedulesQuery,
} from "../../../../redux/rtk-api";
import moment from "moment";
import { AiOutlineClose, AiOutlineDelete, AiOutlineLoading } from "react-icons/ai";
import { AppButton } from "../../../../component";
import { useAppDispatch } from "../../../../redux";
import {
     createTimeSlot,
     handleSelectTime,
     handleSelectedDate,
     resetSelectedDate,
     resetSlotSlice,
     useSliceSlice,
} from "../../../../redux/features";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import { toast } from "react-toastify";
import clsx from "clsx";

export const MentorSchedulesPage = () => {
     const [slotModal, setSlotModal] = useState<boolean>(false);
     const {
          data: slots,
          isError: isSlotError,
          error: slotError,
          isLoading: isSlotLoading,
     } = useMentorGetMySchedulesQuery();
     const dispatch = useAppDispatch();
     const { selectDate, selectTime, slots: newSlot, warning } = useSliceSlice();
     const [
          UploadSlot,
          {
               isError: isNewSlotError,
               error: newSlotError,
               data: newSlotData,
               isLoading: isNewSlowLoading,
               isSuccess: isNewSlotSuccess,
          },
     ] = useMentorCreateScheduleMutation();
     const [
          DeleteSlotById,
          {
               isError: isDeleteSlotError,
               error: deleteSlotError,
               data: deleteSlotData,
               isLoading: isDeleteSlowLoading,
               isSuccess: isDeleteSlotSuccess,
          },
     ] = useDeleteSlotAsMentorByIdMutation();
     useEffect(() => {
          if (isSlotError) {
               console.log(slotError);
          }
          if (isNewSlotError) {
               if ((newSlotError as any).data) {
                    toast.warning((newSlotError as any).data.message);
               } else {
                    console.log(newSlotError);
               }
          }
          if (isNewSlotSuccess) {
               console.log(newSlotData);
          }
          if (isDeleteSlotError) {
               console.log(deleteSlotError);
          }
          if (isDeleteSlotSuccess) {
               toast.success(deleteSlotData?.data);
          }
     }, [
          isSlotError,
          slotError,
          isNewSlotError,
          newSlotError,
          isNewSlotSuccess,
          newSlotData,
          isDeleteSlotError,
          deleteSlotError,
          isDeleteSlotSuccess,
          deleteSlotData,
     ]);

     const handleSlotModel = () => {
          setSlotModal(!slotModal);
     };

     const UploadNewSlot = async () => {
          await UploadSlot({ slotsDate: selectDate, time: newSlot });
          dispatch(resetSlotSlice());
          handleSlotModel();
     };

     const DeleteSlot = async (id: string) => {
          await DeleteSlotById(id);
     };

     return (
          <MentorLayout>
               <div className="flex items-center justify-between">
                    <div>
                         <h6 className="text-2xl">Your available session slots</h6>
                         <p className="text-gray-500">
                              Creating session slots are valued to your time, you just cannot update slots details once
                              they are uploaded!
                         </p>
                    </div>
                    <div>
                         {slots?.data.length !== 0 && (
                              <AppButton filled onClick={handleSlotModel}>
                                   Upload Slot
                              </AppButton>
                         )}
                    </div>
               </div>
               <div className="mt-10">
                    {slots?.data.length !== 0 && (
                         <div className="grid grid-cols-2 gap-5">
                              {slots?.data.map(({ slots, slotsDate, _id }) => (
                                   <div className="border border-primary-500 p-3" key={_id}>
                                        <div className="flex items-center justify-between">
                                             <h6 className="text-xl">{moment(slotsDate).format("MMMM Do YYYY")}</h6>
                                             <button onClick={() => DeleteSlot(_id as string)}>
                                                  <AiOutlineDelete className="fill-red-500" size={22} />
                                             </button>
                                        </div>
                                        <hr className="my-3" />
                                        <div>
                                             {slots.length === 0 && (
                                                  <div>
                                                       <p className="text-center text-gray-500">
                                                            You haven't uploaded any slots!
                                                       </p>
                                                  </div>
                                             )}
                                             <div className="flex gap-3 items-center">
                                                  {slots.length !== 0 &&
                                                       slots.flatMap(({ booked, time, userId }, i) => (
                                                            <div
                                                                 key={i}
                                                                 className={clsx(
                                                                      "flex gap-3 flex-col border-2 p-3 justify-between items-center",
                                                                      booked && "border-primary-500"
                                                                 )}
                                                            >
                                                                 <h6>{time}</h6>
                                                                 <div className="text-gray-500">
                                                                      {booked ? (
                                                                           <p className="capitalize">
                                                                                <span className="capitalize text-primary-500">
                                                                                     {userId?.name?.firstName.toLocaleLowerCase()}{" "}
                                                                                     {userId?.name?.lastName.toLocaleLowerCase()}
                                                                                </span>
                                                                           </p>
                                                                      ) : (
                                                                           " Not booked"
                                                                      )}
                                                                 </div>
                                                            </div>
                                                       ))}
                                             </div>
                                        </div>
                                   </div>
                              ))}
                         </div>
                    )}
               </div>
               {isNewSlowLoading ||
                    isDeleteSlowLoading ||
                    (isSlotLoading && (
                         <div className="h-[50vh] flex flex-col gap-5 justify-center items-center">
                              <AiOutlineLoading size={100} className="fill-primary-500 animate-spin" />
                              <h6 className="text-2xl text-gray-500">Slots is Loading....</h6>
                         </div>
                    ))}
               {slots?.data.length === 0 && (
                    <div className="h-[40vh] flex justify-center flex-col items-center">
                         <h6>No slots are displayed please create new slots for your users</h6>
                         <AppButton filled onClick={handleSlotModel}>
                              Upload Slot
                         </AppButton>
                    </div>
               )}

               {slotModal ? (
                    <>
                         <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                              <div className="relative w-[60%] my-6 mx-auto max-w-3xl">
                                   {/*content*/}
                                   <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                        {/*header*/}
                                        <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                             <h3 className="text-3xl font-semibold">
                                                  Create time slots for your schedules
                                             </h3>
                                             <button
                                                  className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                                  onClick={handleSlotModel}
                                             >
                                                  <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                                       <AiOutlineClose size={30} className="fill-gray-900" />
                                                  </span>
                                             </button>
                                        </div>
                                        {/*body*/}
                                        <div className="relative p-6 flex-auto flex flex-col gap-5">
                                             {warning && <p className="text-yellow-500">{warning}</p>}
                                             {!selectDate ? (
                                                  <div>
                                                       <label htmlFor="date" className="text-gray-500">
                                                            Select date for create slot
                                                       </label>
                                                       <DatePicker
                                                            className="w-full border p-3 appearance-none rounded-md border-gray-300 outline-none"
                                                            id="date"
                                                            onChange={(e: any) =>
                                                                 dispatch(handleSelectedDate(e.toISOString()))
                                                            }
                                                            value={selectDate}
                                                            minDate={new Date()}
                                                       />
                                                  </div>
                                             ) : (
                                                  <div>
                                                       <h6 className="text-xl">
                                                            Slots will be created for{" "}
                                                            <span
                                                                 className="cursor-pointer underline text-primary-500"
                                                                 onClick={() => dispatch(resetSelectedDate())}
                                                            >
                                                                 {moment(selectDate).format("MMMM Do YYYY")}
                                                            </span>
                                                       </h6>
                                                  </div>
                                             )}
                                             {newSlot.length !== 0 && (
                                                  <div className="my-5">
                                                       <h6 className="text-gray-500">Your time slots will be</h6>
                                                       <div className="flex gap-5 flex-wrap mt-3">
                                                            {newSlot.map((element, i) => (
                                                                 <div key={i} className="border p-3 rounded">
                                                                      {element}
                                                                 </div>
                                                            ))}
                                                       </div>
                                                  </div>
                                             )}
                                             <div>
                                                  <label htmlFor="time">Connect date & time together</label>
                                                  <div className="flex gap-3 items-center">
                                                       <input
                                                            disabled={!selectDate}
                                                            type="time"
                                                            value={selectTime}
                                                            className="w-full border p-3 focus:outline-none"
                                                            onChange={(e) =>
                                                                 dispatch(handleSelectTime(e.target.value.toString()))
                                                            }
                                                       />
                                                       <button
                                                            onClick={() => {
                                                                 if (!selectTime) {
                                                                      return null;
                                                                 } else dispatch(createTimeSlot(selectTime));
                                                            }}
                                                            className="p-3 border"
                                                       >
                                                            Upload
                                                       </button>
                                                  </div>
                                             </div>
                                        </div>
                                        {/*footer*/}
                                        <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                             <button
                                                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                  type="button"
                                                  onClick={handleSlotModel}
                                             >
                                                  Close
                                             </button>
                                             <button
                                                  className="bg-primary-500 text-white active:bg-primary-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                  type="button"
                                                  onClick={UploadNewSlot}
                                             >
                                                  Save Slots
                                             </button>
                                        </div>
                                   </div>
                              </div>
                         </div>
                         <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                    </>
               ) : null}
          </MentorLayout>
     );
};
