import React, { useEffect, useState } from "react";
import { MentorLayout } from "../../../layout";
import {
  useMentorGetMyCallsQuery,
  useMentorGetMySchedulesQuery,
  useMentorProfileQuery,
  useUpdateSlotMutation,
} from "../../../redux/rtk-api";
import moment from "moment";
import { AlterBuddyLogo } from "../../../assets/logo";
import { AiOutlineClose, AiOutlineLoading } from "react-icons/ai";
import { ISlotProps, UserProps } from "../../../interface";
import { AppButton, TextField } from "../../../component";
import { toast } from "react-toastify";

export const MentorDashboardPage = () => {
  const [noteModel, setNoteModel] = useState<ISlotProps | null>(null);
  const [noteField, setNoteField] = useState<string>("");

  const {
    data: calls,
    isError: isCallError,
    error: callError,
    isLoading: isCallLoading,
  } = useMentorGetMyCallsQuery();
  const { data: profile, isLoading: isProfileLoading } =
    useMentorProfileQuery();
  const {
    data: slots,
    isError: isSlotError,
    error: slotError,
    isLoading: isSlotLoading,
  } = useMentorGetMySchedulesQuery();

  useEffect(() => {
    if (isCallError) {
      console.log(callError);
    }
    if (isSlotError) {
      console.log(slotError);
    }
  }, [isSlotError, slotError, isCallError, callError]);
  const lengthFormatter = Intl.NumberFormat("en", { notation: "compact" });

  const [
    updateSlot,
    {
      isLoading: isUpdateLoading,
      isSuccess: isUpdateSuccess,
      error: updateError,
      data: updateData,
      isError: isUpdateError,
    },
  ] = useUpdateSlotMutation();

  useEffect(() => {
    if (isUpdateSuccess) {
      toast.success(updateData?.data);
      setNoteModel(null);
      setNoteField("");
    }
  }, [isUpdateSuccess, updateData?.data]);

  useEffect(() => {
    if (noteModel?.note.length !== 0) {
      setNoteField(noteModel?.note);
    }
    if (isUpdateError) {
      console.log(updateError);
    }
  }, [isUpdateError, updateError, noteModel?.note]);

  const onUpdate = async () => {
    if (!noteField) {
      return null;
    } else {
      updateSlot({
        slotId: noteModel._id,
        payload: {
          note: noteField as string,
        } as Partial<ISlotProps>,
      });
      if (noteField || noteModel) {
        setNoteField("");
        setNoteModel(null);
      }
    }
  };
  return (
    <MentorLayout>
      <AlterBuddyLogo />
      {isProfileLoading &&
        isSlotLoading &&
        isCallLoading &&
        isUpdateLoading && (
          <div className="flex justify-center">
            <AiOutlineLoading
              size={100}
              className="text-primary-500 animate-spin"
            />
          </div>
        )}
      {!isProfileLoading &&
        !isCallLoading &&
        !isSlotLoading &&
        !isUpdateLoading && (
          <>
            <hr className="my-3" />
            <h5 className="capitalize text-3xl font-semibold">
              Welcome{" "}
              <span className="text-primary-500 capitalize">
                {profile?.data?.name.firstName} {profile?.data?.name.lastName}
              </span>
            </h5>
            <hr className="my-3" />
            <div className="grid xl:lg:md:grid-cols-3 sm:xs:grid-cols-12 gap-10">
              <div className="bg-white shadow rounded-lg p-4">
                <h3 className="text-xl font-semibold">Uploaded Slots</h3>
                <p className="text-3xl my-3">
                  {lengthFormatter.format(slots?.data?.length)}
                </p>
                <p className="text-gray-500">
                  Schedule{" "}
                  <p>
                    From {moment(slots?.data[0]?.slotsDate).format("ll")} - To{" "}
                    {moment(
                      slots?.data[slots?.data?.length - 1]?.slotsDate
                    ).format("ll")}
                  </p>
                </p>
              </div>
              <div className="bg-white shadow rounded-lg p-4">
                <h3 className="text-xl font-semibold">
                  Confirmed Slots Out of {slots?.data?.length}
                </h3>
                <p className="text-3xl my-3">
                  {lengthFormatter.format(
                    slots?.data?.filter(
                      (props) =>
                        props?.slots.filter((slot) => slot?.booked).length
                    )?.length
                  )}
                </p>
                <p className="text-gray-500">
                  Schedule{" "}
                  <p>
                    From {moment(slots?.data[0]?.slotsDate).format("ll")} - To{" "}
                    {moment(
                      slots?.data[slots?.data?.length - 1]?.slotsDate
                    ).format("ll")}
                  </p>
                </p>
              </div>
              <div className="bg-white shadow rounded-lg p-4">
                <h3 className="text-xl font-semibold">Call History</h3>
                <p className="text-3xl my-3">
                  {lengthFormatter.format(calls?.data?.length)}
                </p>
                <p className="text-gray-500">
                  History From{" "}
                  <p>
                    First {moment(calls?.data[0]?.createdAt).format("ll")} -
                    Last{" "}
                    {moment(calls?.data[calls?.data?.length]?.createdAt).format(
                      "ll"
                    )}
                  </p>
                </p>
              </div>
            </div>
            <div className="grid grid-cols-12 gap-10 mt-10">
              <div className="border rounded-lg bg-white p-3 col-span-4">
                <h6 className="text-xl">Upcoming Slot</h6>
                <p className="my-2 text-sm text-gray-500">
                  {slots?.data[0]?.slotsDate}{" "}
                  {
                    slots?.data[0]?.slots?.filter((props) => props?.booked)[0]
                      ?.time
                  }
                </p>
                <h5 className="capitalize text-2xl">
                  {
                    (
                      slots?.data[0].slots?.filter((props) => props?.booked)[0]
                        ?.userId as UserProps
                    )?.name?.firstName
                  }{" "}
                  {
                    (
                      slots?.data[0]?.slots?.filter((props) => props?.booked)[0]
                        ?.userId as UserProps
                    )?.name?.lastName
                  }
                </h5>
                <p className="my-2  uppercase">
                  {
                    slots?.data[0]?.slots?.filter((props) => props?.booked)[0]
                      ?.status
                  }
                </p>
                <div className="flex items-center justify-end">
                  <AppButton
                    onClick={() => {
                      if (noteModel) {
                        setNoteModel(null);
                      } else {
                        setNoteModel(
                          slots?.data[0]?.slots?.filter(
                            (props) => props?.booked
                          )[0]
                        );
                      }
                    }}
                    filled
                  >
                    Add Note
                  </AppButton>
                </div>
              </div>
              <div className="border rounded-lg bg-white p-3 col-span-8"></div>
            </div>
            {noteModel && (
              <>
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                  <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                      {/*header*/}
                      <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                        <h3 className="text-3xl font-semibold">
                          Add Note for This Slot?
                        </h3>
                        <button
                          onClick={() => setNoteModel(null)}
                          className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                        >
                          <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                            ×
                          </span>
                        </button>
                      </div>
                      {/*body*/}
                      <div className="relative p-6 flex-auto">
                        {noteModel?.note?.length === 0 && (
                          <>
                            <h6 className="capitalize">
                              This Slot is booked by{" "}
                              {noteModel?.userId?.name?.firstName}{" "}
                              {noteModel?.userId?.name?.lastName}
                            </h6>
                            <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                              <TextField
                                outlined
                                onChange={(e) => setNoteField(e.target.value)}
                                value={noteField || ""}
                              />
                            </p>
                          </>
                        )}

                        {noteModel?.note?.length !== 0 && (
                          <div className="flex items-center justify-between">
                            <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                              SAVED NOTE: {noteField}
                            </p>
                            <AppButton
                              filled
                              onClick={() => {
                                setNoteField("");
                                setNoteModel({ ...noteModel, note: "" });
                              }}
                            >
                              <AiOutlineClose />
                            </AppButton>
                          </div>
                        )}
                      </div>
                      {/*footer*/}
                      <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                        <button
                          className="text-gray-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={() => setNoteModel(null)}
                        >
                          Close
                        </button>
                        <AppButton
                          loading={isUpdateLoading}
                          filled
                          type="button"
                          onClick={onUpdate}
                        >
                          Save Changes
                        </AppButton>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
              </>
            )}
          </>
        )}
    </MentorLayout>
  );
};
