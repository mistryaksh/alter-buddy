import React, { useEffect } from "react";
import { MentorLayout } from "../../../layout";
import {
  useMentorGetMyCallsQuery,
  useMentorGetMySchedulesQuery,
  useMentorProfileQuery,
} from "../../../redux/rtk-api";
import moment from "moment";
import { AlterBuddyLogo } from "../../../assets/logo";
import { AiOutlineLoading } from "react-icons/ai";

export const MentorDashboardPage = () => {
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

  return (
    <MentorLayout>
      <AlterBuddyLogo />
      {isProfileLoading && isSlotLoading && isCallLoading && (
        <div className="flex justify-center">
          <AiOutlineLoading
            size={100}
            className="text-primary-500 animate-spin"
          />
        </div>
      )}
      {!isProfileLoading && !isCallLoading && !isSlotLoading && (
        <>
          <hr className="my-3" />
          <h5 className="capitalize text-3xl font-semibold">
            Welcome{" "}
            <span className="text-primary-500 capitalize">
              {profile?.data?.name.firstName} {profile?.data?.name.lastName}
            </span>
          </h5>
          <hr className="my-3" />
          <div className="grid xl:lg:md:grid-cols-3 sm:xs:grid-cols-12 gap-3">
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
                  First {moment(calls?.data[0]?.createdAt).format("ll")} - Last{" "}
                  {moment(calls?.data[calls?.data?.length]?.createdAt).format(
                    "ll"
                  )}
                </p>
              </p>
            </div>
          </div>
        </>
      )}
    </MentorLayout>
  );
};
