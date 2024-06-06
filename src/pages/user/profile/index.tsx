import React, { useEffect } from "react";
import { MainLayout } from "../../../layout";
import {
  useGetMySessionsQuery,
  useProfileUserQuery,
} from "../../../redux/rtk-api";
import { RootState, useAppDispatch } from "../../../redux";
import {
  handleCallFilter,
  handleChatDetails,
  handleError,
} from "../../../redux/features";
import { Tab } from "@headlessui/react";
import clsx from "clsx";
import { AppButton, TextField } from "../../../component";
import { Link } from "react-router-dom";
import {
  AiOutlineMessage,
  AiOutlinePhone,
  AiOutlineVideoCamera,
} from "react-icons/ai";
import moment from "moment";
import { useSelector } from "react-redux";
import { MdOutlinePlaylistRemove } from "react-icons/md";

const tabs = ["profile", "my Sessions", "my wallet", "my orders", "settings"];

export const UserProfilePage = () => {
  const {
    data: profile,
    isError: isProfileError,
    isLoading: isProfileLoading,
    error: profileError,
  } = useProfileUserQuery();
  const {
    data: session,
    isError: isSessionError,
    error: sessionError,
    isLoading: isSessionLoading,
  } = useGetMySessionsQuery();
  const dispatch = useAppDispatch();
  const { selectedCallDetails, callFilter } = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    if (isProfileError) {
      if ((profileError as any).data) {
        dispatch(handleError((profileError as any).data.message));
      } else {
        console.log(profileError);
      }
    }
    if (isSessionError) {
      if ((sessionError as any).data) {
        dispatch(handleError((sessionError as any).data.message));
      } else {
        console.log(sessionError);
      }
    }
  }, [
    isProfileError,
    profileError,
    dispatch,
    isSessionError,
    sessionError,
    session?.data,
    selectedCallDetails,
  ]);

  return (
    <MainLayout loading={isProfileLoading || isSessionLoading}>
      <div className="p-3 my-10 mt-20 pt-20">
        <div className="xl:w-[90%] mx-auto  bg-white">
          <div className="border p-3">
            <Tab.Group>
              <Tab.List className="flex items-center gap-10">
                {({ selectedIndex }) => (
                  <>
                    {tabs.map((element, i) => (
                      <Tab
                        key={i}
                        className={clsx(
                          selectedIndex === i
                            ? " border-primary-500 text-primary-500"
                            : "border-transparent",
                          "border-t-2 uppercase pt-1 font-sans2 xl:text-md text-sm focus:outline-none"
                        )}
                      >
                        {element}
                      </Tab>
                    ))}
                  </>
                )}
              </Tab.List>
              <Tab.Panels className="h-[60vh] overflow-y-scroll">
                <Tab.Panel>
                  <div className="py-10 flex flex-col gap-10 xl:w-[80%] mx-auto">
                    <div className="">
                      <h6 className="text-2xl font-sans2 capitalize group-hover:text-primary-500">
                        Update or{" "}
                        <span className="text-primary-500">
                          share your profile
                        </span>
                      </h6>
                      <p className="text-sm text-gray-500">
                        Registered On -{" "}
                        {moment(profile?.data.createdAt).format(
                          "Do MMM YYYY hh:mm A"
                        )}
                      </p>
                    </div>
                    <div className="flex gap-3 items-center">
                      <TextField
                        label="First Name"
                        value={profile?.data.name.firstName}
                      />
                      <TextField
                        label="Last Name"
                        value={profile?.data.name.lastName}
                      />
                    </div>
                    <div>
                      <TextField label="email" value={profile?.data.email} />
                    </div>
                    <div>
                      <TextField label="mobile" value={profile?.data.mobile} />
                    </div>
                    <Link
                      to="/forgot-password"
                      className="underline  text-primary-500"
                    >
                      Forgot your password?
                    </Link>
                    <div>
                      <AppButton outlined>Save changes</AppButton>
                    </div>
                  </div>
                </Tab.Panel>
                <Tab.Panel>
                  <div className="my-5 flex items-center justify-between">
                    <div>
                      <h6 className="text-2xl capitalize text-gray-900 font-sans2">
                        Your{" "}
                        <span className="text-primary-500">
                          session history
                        </span>
                      </h6>
                      <p className="text-gray-500">
                        This is visible only to you! you can report if any issue
                        are being followed!
                      </p>
                    </div>
                    <div>
                      <ul className="flex gap-3">
                        <button
                          onClick={() => dispatch(handleCallFilter("all"))}
                          className={clsx(
                            callFilter === "all" && "text-primary-500"
                          )}
                        >
                          All
                        </button>
                        <button
                          className={clsx(
                            callFilter === "video" && "text-primary-500"
                          )}
                          onClick={() => dispatch(handleCallFilter("video"))}
                        >
                          Video
                        </button>
                        <button
                          className={clsx(
                            callFilter === "audio" && "text-primary-500"
                          )}
                          onClick={() => dispatch(handleCallFilter("audio"))}
                        >
                          Audio
                        </button>
                        <button
                          className={clsx(
                            callFilter === "chat" && "text-primary-500"
                          )}
                          onClick={() => dispatch(handleCallFilter("chat"))}
                        >
                          Chat
                        </button>
                      </ul>
                    </div>
                  </div>
                  <div className="">
                    <div className="grid grid-cols-12 gap-4">
                      <div className="col-span-12 xl:col-span-8 lg:col-span-8 md:col-span-8 sm:col-span-12">
                        <div className="space-y-4">
                          {session?.data.map(
                            (
                              {
                                users,
                                sessionDetails: { callType },
                                createdAt,
                              },
                              i
                            ) => (
                              <div
                                key={i}
                                onClick={() =>
                                  dispatch(
                                    handleChatDetails({
                                      name: `${users.mentor.name.firstName} ${users.mentor.name.lastName}`,
                                      callType: callType as any,
                                      time: createdAt?.toString() as string,
                                      _id: users.mentor._id as string,
                                    })
                                  )
                                }
                                className="border p-3 flex items-center justify-between rounded-lg group cursor-pointer hover:bg-primary-50 duration-200 hover:border-primary-500"
                              >
                                <div>
                                  <h6 className="text-md font-sans2 capitalize group-hover:text-primary-500">
                                    {users?.mentor?.name.firstName}{" "}
                                    {users?.mentor?.name.lastName}
                                  </h6>
                                  <p className="text-sm text-gray-500">
                                    {moment(createdAt).format(
                                      "Do MMM YYYY hh:mm A"
                                    )}
                                  </p>
                                </div>
                                <button>
                                  {callType === "audio" && (
                                    <AiOutlinePhone size={26} />
                                  )}
                                  {callType === "video" && (
                                    <AiOutlineVideoCamera size={26} />
                                  )}
                                  {callType === "chat" && (
                                    <AiOutlineMessage size={26} />
                                  )}
                                </button>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                      <div className="col-span-12 xl:col-span-4 lg:col-span-4 md:col-span-4 sm:col-span-12">
                        {selectedCallDetails && (
                          <div className="bg-gray-100 p-3  w-full top-0 border">
                            <h5 className="font-sans2 text-gray-500 text-xl">
                              Selected Call Details
                            </h5>
                            <div className="flex items-center gap-4">
                              <h6 className="text-xl text-gray-500 capitalize">
                                Mentor - {selectedCallDetails?.name}
                              </h6>
                            </div>
                            <p className="text-sm">
                              Last Session with this Mentor{" "}
                              {moment(selectedCallDetails?.time).format(
                                "Do MMM YYYY hh:mm A"
                              )}
                            </p>
                            <button className="my-3 bg-white p-3 rounded-lg">
                              {selectedCallDetails?.callType === "audio" && (
                                <AiOutlinePhone size={26} />
                              )}
                              {selectedCallDetails?.callType === "video" && (
                                <AiOutlineVideoCamera size={26} />
                              )}
                              {selectedCallDetails?.callType === "chat" && (
                                <AiOutlineMessage size={26} />
                              )}
                            </button>
                            <div className="space-y-4 px-2 bg-white mt-3 sticky h-[50vh] overflow-y-scroll">
                              <h5 className="font-sans2 text-gray-500 text-xl">
                                All session with this mentor
                              </h5>
                              <div className="space-y-4">
                                {session?.data
                                  .filter(
                                    (props) =>
                                      (props?.users?.mentor?._id as string) ===
                                      (selectedCallDetails?._id as string)
                                  )
                                  .map(
                                    ({
                                      sessionDetails: { callType },
                                      createdAt,
                                      status,
                                      _id,
                                    }) => (
                                      <div
                                        key={_id}
                                        className="flex items-center justify-between border px-3 py-2 rounded-md"
                                      >
                                        <p>
                                          {moment(createdAt).format(
                                            "Do MMM YYYY hh:mm A"
                                          )}
                                        </p>
                                        <div className="flex items-center gap-3">
                                          <p className="text-sm">{status}</p>
                                          {callType === "audio" && (
                                            <AiOutlinePhone size={26} />
                                          )}
                                          {callType === "video" && (
                                            <AiOutlineVideoCamera size={26} />
                                          )}
                                          {callType === "chat" && (
                                            <AiOutlineMessage size={26} />
                                          )}
                                        </div>
                                      </div>
                                    )
                                  )}
                              </div>
                            </div>
                          </div>
                        )}
                        {!selectedCallDetails && (
                          <div className="flex flex-col items-center justify-center gap-2">
                            <MdOutlinePlaylistRemove size={300} />
                            <h6>Select call details to expanded view</h6>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Tab.Panel>
                <Tab.Panel>Content 3</Tab.Panel>
                <Tab.Panel>Content 3</Tab.Panel>
                <Tab.Panel>
                  <div className="py-5">
                    <h1 className="text-2xl">Settings</h1>
                  </div>
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
