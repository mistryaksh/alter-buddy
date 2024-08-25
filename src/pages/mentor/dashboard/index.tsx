import React, { useEffect } from "react";
import { MentorLayout } from "../../../layout";
import {
  useMentorGetMyCallsQuery,
  useMentorGetMySchedulesQuery,
} from "../../../redux/rtk-api";
import moment from "moment";
import clsx from "clsx";
import { AlterBuddyLogo } from "../../../assets/logo";
import { AppButton } from "../../../component";
import { useNavigate } from "react-router-dom";

export const MentorDashboardPage = () => {
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
  const navigate = useNavigate();

  useEffect(() => {
    if (isCallError) {
      console.log(callError);
    }
    if (isSlotError) {
      console.log(slotError);
    }
  }, [isSlotError, slotError, isCallError, callError]);
  const lengthFormatter = Intl.NumberFormat("en", { notation: "compact" });

  const { data } = useMentorGetMySchedulesQuery();
  console.log(data?.data[0].slots.find((prop) => prop.userId).userId);
  return (
    <MentorLayout>
      <AlterBuddyLogo />
      <hr className="my-10" />
      <div className="grid gap-10 items-start xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 grid-cols-1">
        <div className="rounded overflow-hidden shadow-xl bg-white p-4 border-2 border-gray-200 border-opacity-50">
          <div className="font-bold text-xl mb-2">New Consultation Request</div>
          <div className="text-gray-700 text-base mb-4">
            <p className="capitalize">
              <strong>Name:</strong>{" "}
              {
                data?.data[0].slots.find((prop) => prop.userId).userId.name
                  .firstName
              }{" "}
              {
                data?.data[0].slots.find((prop) => prop.userId).userId.name
                  .lastName
              }
            </p>
            <p>
              <strong>Date:</strong> August 9, 2024
            </p>
          </div>
          <AppButton filled>Respond</AppButton>
        </div>
        <div className="rounded overflow-hidden shadow-xl bg-white p-4 border-2 border-gray-200 border-opacity-50">
          <div className="font-bold text-xl mb-2">
            Upcoming Consultation Request
          </div>
          <div className="text-gray-700 text-base mb-4">
            <p>
              <strong>Name:</strong> Jane Doe
            </p>
            <p>
              <strong>Email:</strong> jane.doe@example.com
            </p>
            <p>
              <strong>Date:</strong> August 9, 2024
            </p>
          </div>
          <AppButton filled>Add Note</AppButton>
        </div>
        <div className="shadow-xl p-5 rounded-md border">
          <h6 className="text-5xl text-primary-500">
            {slots?.data.length
              ? lengthFormatter.format(slots?.data.length)
              : 0}
          </h6>
          <p className="text-gray-500 capitalize">Slots Are Uploaded</p>
        </div>
        <div className="shadow-xl p-5 rounded-md border">
          <h6 className="text-5xl text-primary-500">
            {calls?.data.length
              ? lengthFormatter.format(calls?.data.length)
              : 0}
          </h6>
          <p className="text-gray-500 capitalize">Calls Attained By You</p>
        </div>
      </div>
      <div className="mt-10">
        <div className="grid xl:md:lg:grid-cols-3 gap-5 mt-5 space-y-3">
          <div className="">
            <div className="flex items-center justify-between  mb-5">
              <h6 className="text-2xl">Your uploaded slots</h6>
              <AppButton onClick={() => navigate("/mentor/schedules")} filled>
                View all
              </AppButton>
            </div>
            {slots?.data
              .map(({ slots, slotsDate, _id }) => {
                return (
                  <div
                    className="w-full rounded-md border shadow-xl p-5 mb-5"
                    key={_id}
                  >
                    <div className="bg-primary-200 py-3 px-1">
                      <p>{moment(slotsDate).format("Do MMMM YYYY")}</p>
                    </div>
                    <div className="flex items-start gap-3 flex-wrap my-2">
                      {slots.map(({ time, booked, userId }, i) => {
                        const main = moment(slotsDate).add(time, "minute");
                        return (
                          <div
                            key={i}
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
              })
              .slice(0, 5)}
          </div>
        </div>
      </div>
    </MentorLayout>
  );
};
