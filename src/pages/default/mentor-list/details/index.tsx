import React, { useEffect, useState } from "react";
import { MainLayout } from "../../../../layout";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../../../redux";
import {
  useGetMentorPackagesByIdQuery,
  useGetMentorUsingIdQuery,
  useLazyGetSlotsByMentorIdQuery,
  useProfileUserQuery,
} from "../../../../redux/rtk-api";
import { handleError } from "../../../../redux/features";
import { AppButton } from "../../../../component";
import {
  AiOutlineCalendar,
  AiOutlineLeft,
  AiOutlineLoading,
  AiOutlineMessage,
  AiOutlinePhone,
  AiOutlineVideoCamera,
} from "react-icons/ai";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import clsx from "clsx";
import { MdOutlineFormatQuote } from "react-icons/md";
import { Helmet } from "react-helmet";
import DOMPurify from "dompurify";
import { useGetMyWalletQuery } from "../../../../redux/rtk-api/buddy-coin.api";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { ICategoryProps } from "../../../../interface";

export const UserMentorDetailsPage = () => {
  const navigate = useNavigate();
  const [scheduleModel, setScheduleModel] = useState<boolean>(false);
  const [selectedPrice, setSelectedPrice] = useState<number>(0);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState({
    date: "",
    slot: "",
    _id: "",
  });
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const {
    isError: isMentorError,
    isLoading: isMentorLoading,
    data: mentor,
    error: mentorError,
  } = useGetMentorUsingIdQuery(id as string);
  const { data: packages } = useGetMentorPackagesByIdQuery(id as string);
  const [
    GetMentorSlots,
    {
      isError: isSlotError,
      error: slotError,
      isLoading: isSlotLoading,
      data: slotData,
    },
  ] = useLazyGetSlotsByMentorIdQuery();
  const {
    // data: profile,
    isError: isProfileError,
    error: profileError,
  } = useProfileUserQuery();
  // const [
  //   BookSlotWithMentor,
  //   {
  //     isError: isBookSlotError,
  //     isLoading: isBookSlotLoading,
  //     data: bookSlotData,
  //     error: bookSlotError,
  //     isSuccess: isBookSuccess,
  //   },
  // ] = useBookMentorSlotMutation();
  const { data: wallet } = useGetMyWalletQuery();

  useEffect(() => {
    if (isMentorError) {
      if ((mentorError as any)?.data) {
        dispatch(handleError((mentorError as any)?.data.message));
      } else {
        console.log(mentorError);
      }
    }
    // if (isBookSlotError) {
    //   if ((bookSlotError as any).data) {
    //     console.log((bookSlotError as any).data);
    //     dispatch(handleError((bookSlotError as any).data.message));
    //   } else {
    //     console.log(bookSlotError);
    //   }
    // }
    if (isSlotError) {
      if ((slotError as any)?.data) {
        dispatch(handleError((slotError as any)?.data.message));
      } else {
        console.log(slotError);
      }
    }
    if (isProfileError) {
      if ((profileError as any)?.data) {
        dispatch(handleError((profileError as any)?.data.message));
      } else {
        console.log(profileError);
      }
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
    // isBookSlotError,
    // bookSlotError,
    // bookSlotData,
  ]);

  // useEffect(() => {
  //   if (isBookSuccess) {
  //     toast.success(bookSlotData?.data);
  //     setSelectedTimeSlot({
  //       date: "",
  //       slot: "",
  //       _id: "",
  //     });
  //     setScheduleModel(false);
  //   }
  // }, [isBookSuccess, bookSlotData?.data]);

  // const BookSlot = async ({
  //   userId,
  //   slotId,
  //   mentorId,
  //   callType,
  // }: {
  //   userId: string;
  //   slotId: string;
  //   callType: string;
  //   mentorId: string;
  // }) => {
  //   if (!callType) {
  //     toast.warn("Please try again");
  //   } else {
  //     await BookSlotWithMentor({
  //       slotId,
  //       userId,
  //       mentorId,
  //       callType: callType,
  //     });
  //   }
  // };

  const cleanHTML = DOMPurify.sanitize(mentor?.data?.description);

  return (
    <MainLayout loading={isMentorLoading}>
      <Helmet>
        <title>
          AlterBuddy | {`${mentor?.data.name.firstName}`}{" "}
          {`${mentor?.data.name.lastName}`}
        </title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      <div className="xl:px-10 px-5 pt-10 mb-10 z-10">
        <div className="my-5">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-3"
          >
            <AiOutlineLeft size={30} />
            <p>Back</p>
          </button>
        </div>
        <hr />
        <div className="flex flex-row items-start gap-20 justify-between xl:lg:md:flex-nowrap flex-wrap mt-5">
          <div className="xl:lg:md:flex-1">
            <div className="flex gap-10 justify-between w-full items-center">
              <div className="flex gap-10 items-center">
                <img
                  src={
                    mentor?.data?.image ||
                    "https://qph.cf2.quoracdn.net/main-qimg-5b495cdeb2ebb79cff41634e5f9ea076"
                  }
                  alt="mentor "
                  className="object-cover aspect-square w-[20%] rounded-md p-2 shadow-lg"
                />
                <div className="flex items-start flex-col">
                  <h6 className="text-3xl capitalize">
                    {mentor?.data.name.firstName} {mentor?.data.name.lastName}
                  </h6>
                  <p className="capitalize text-primary-500 text-lg mt-2">
                    {mentor?.data.category
                      .map((props) => props.title)
                      .join(", ")}
                  </p>
                  <p className="capitalize text-primary-500 text-md mt-2">
                    Qualification :{" "}
                    {mentor?.data.qualification
                      ? mentor?.data?.qualification
                      : "N/A"}
                  </p>
                  <div className="flex mt-3 gap-3 items-center">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/484/484633.png"
                      alt=""
                      width={20}
                    />
                    <p className="capitalize text-gray-900 mt-2">
                      {mentor?.data.languages.join(",  ")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <hr className="my-10" />
            <div className="flex flex-col gap-5">
              <div>
                <h6 className="text-2xl flex-wrap font-libre capitalize text-primary-500">
                  About
                </h6>
                <div
                  className="no-tailwind"
                  style={{
                    all: "unset",
                    display: "block",
                    fontFamily: "inherit",
                  }}
                  dangerouslySetInnerHTML={{
                    __html: cleanHTML,
                  }}
                />
              </div>
              {packages?.data.length > 0 && (
                <div>
                  {packages?.data.map((packageList, i) => {
                    // Check if subServices are available
                    return packageList?.subServices?.length > 0 ? (
                      <div key={i} className="space-y-4">
                        <h6 className="text-2xl flex-wrap font-libre capitalize text-primary-500">
                          {(packageList.categoryId as ICategoryProps).title}{" "}
                          Service List
                        </h6>
                        <table>
                          <thead className="bg-gray-200">
                            <tr>
                              <th className="px-5 py-2 w-[40%] border-r-2">
                                Name
                              </th>
                              <th className="px-5 py-2 w-[20%] text-right">
                                BuddyCoins
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {packageList?.subServices?.map(
                              (subPackage, subIndex) => (
                                <tr
                                  className="border-b border-x"
                                  key={subIndex}
                                >
                                  <td className="px-5 py-2 w-[350px]">
                                    <p className="capitalize">
                                      {subPackage?.title}
                                    </p>
                                  </td>
                                  <td className="px-5 py-2 w-[150px]">
                                    <p className="text-right">
                                      {subPackage?.price}
                                    </p>
                                  </td>
                                </tr>
                              )
                            )}
                          </tbody>
                        </table>
                      </div>
                    ) : null;
                  })}
                </div>
              )}

              <div>
                <div className="my-10">
                  {mentor?.data.videoLink && (
                    <video
                      className="xl:lg:md:w-full aspect-video"
                      src={mentor?.data.videoLink}
                      title="YouTube video player"
                      autoPlay={false}
                      controls
                      controlsList="nodownload nofullscreen noremoteplayback"
                    />
                  )}
                </div>
              </div>
              {mentor?.data.specialists.length > 0 && (
                <div className="bg-primary-100 p-3 rounded-md">
                  <h6 className="text-xl font-sans2 mb-2 capitalize text-primary-500">
                    What can you ask me:
                  </h6>
                  {mentor?.data?.specialists?.map((props, i) => {
                    return (
                      <div key={i} className="flex items-end gap-3">
                        <MdOutlineFormatQuote
                          size={30}
                          className="fill-primary-500"
                          fill="currentColor"
                        />
                        <p className="text-md text-gray-500 capitalize">
                          {props}
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
          <div className="xl:lg:md:w-[40%] sticky top-20 shadow-xl border border-gray-300 p-5 rounded-lg mt-10">
            {slotData?.data.length !== 0 && (
              <div>
                <p className="text-gray-500 my-2">
                  Schedule a personal audio/video session and feel better.
                </p>
                <div className="flex items-center gap-3">
                  <AiOutlineCalendar size={30} className="fill-primary-500" />
                  <div>
                    <p className="text-lg text-gray-900 font-bold">
                      Book Session
                    </p>
                  </div>
                </div>
              </div>
            )}

            {isSlotLoading && (
              <div>
                <AiOutlineLoading size={30} className="fill-primary-500" />
                <p>Slots are loading</p>
              </div>
            )}
            {slotData?.data?.length !== 0 &&
              slotData?.data?.map(({ slots, slotsDate, _id }) => (
                <div className="my-5" key={_id}>
                  <label
                    className="text-gray-900 capitalize text-sm"
                    htmlFor="date"
                  >
                    Slots for -{" "}
                    <span className="text-primary-500 uppercase font-extrabold">
                      {moment(slotsDate).format("MMM Do YYYY")}
                    </span>
                  </label>
                  <div className="flex gap-5 flex-wrap mt-3">
                    {slots?.map(({ time, booked, _id: slotId, status }) => (
                      <button
                        disabled={booked}
                        onClick={() => {
                          // BookSlot({
                          //   slotId: slotId as string,
                          //   userId: profile?.data._id as string,
                          //   mainId: _id as string,
                          //   mentorId: mentor?.data._id as string,
                          // })

                          setScheduleModel(true);
                          setSelectedTimeSlot({
                            date: slotsDate,
                            slot: time,
                            _id: slotId,
                          });
                        }}
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
                          {moment(time, "HH:mm").format("hh:mm A")}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            {slotData?.data.length === 0 && (
              <div className="text-center w-full">
                <p className="text-gray-500">
                  No Slots found for {mentor?.data?.name?.firstName}{" "}
                  {mentor?.data?.name?.lastName}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Dialog
        open={scheduleModel}
        onClose={() => setScheduleModel(false)}
        className="fixed inset-0 z-50 overflow-y-scroll flex w-screen items-center justify-center bg-black/30 p-4 transition duration-300 ease-out data-[closed]:opacity-0"
      >
        <DialogPanel className="w-[40%] space-y-4 bg-white p-5 mt-20">
          <DialogTitle>
            Selected Time Slot -
            {moment(selectedTimeSlot.date).format("DD-MM-YYYY")}{" "}
            {moment(selectedTimeSlot.slot, "HH:mm").format("hh:mm A")}
          </DialogTitle>
          <div className="my-5">
            <div className="flex gap-3 items-center">
              <AiOutlineMessage size={30} className="fill-primary-500" />
              <p className="text-gray-900 capitalize font-bold">
                Chat with {mentor?.data?.name?.firstName}{" "}
                {mentor?.data?.name?.lastName.charAt(0)}.
              </p>
            </div>
            <p className="text-gray-500 my-2">
              Chat with the expert and get instant guidance
            </p>
            <h6 className="text-right">
              My Wallet {wallet?.data?.balance - selectedPrice}
            </h6>
            <h6 className="my-3 font-semibold">Select Service Category</h6>
            <div className="flex items-center gap-3">
              {packages?.data
                .filter(
                  (value, index, self) =>
                    index ===
                    self.findIndex(
                      (t) =>
                        (t?.categoryId as ICategoryProps)?._id ===
                        (value?.categoryId as ICategoryProps)?._id
                    )
                )
                .map((packageList) => (
                  <div className="flex items-center gap-3">
                    {packageList?.subServices?.length === 0 && (
                      <AppButton
                        outlined={
                          selectedCategory ===
                          (packageList?.categoryId as ICategoryProps)?._id
                        }
                        key={packageList?._id}
                        onClick={() =>
                          setSelectedCategory(
                            (packageList?.categoryId as ICategoryProps)?._id
                          )
                        }
                      >
                        {(packageList?.categoryId as ICategoryProps)?.title}
                      </AppButton>
                    )}
                  </div>
                ))}
            </div>
            <div className={clsx("flex items-center gap-3")}>
              {packages?.data
                ?.filter(
                  (value, index, self) =>
                    index ===
                    self.findIndex(
                      (t) =>
                        (t.categoryId as ICategoryProps)._id ===
                        (value.categoryId as ICategoryProps)._id
                    )
                )
                ?.map((packageList) => (
                  <>
                    <div className="w-full">
                      {packageList?.subServices?.length !== 0 &&
                        packageList?.subServices?.map((subService) => (
                          <div
                            key={subService?._id}
                            className="flex items-center justify-between"
                          >
                            <h6 className="capitalize text-lg">
                              {subService?.title}
                            </h6>
                            <AppButton
                              onClick={() =>
                                setSelectedPrice(subService?.price)
                              }
                              outlined={selectedPrice === subService?.price}
                            >
                              <p>{subService?.price}</p>
                            </AppButton>
                          </div>
                        ))}
                    </div>
                  </>
                ))}
            </div>
            <h6 className="text-right my-4 text-green-500">
              Your Wallet Amount Will be charged as {selectedPrice}
            </h6>
            <div className="flex items-center gap-3 mt-3">
              <AppButton outlined flexed>
                <AiOutlineMessage size={20} />
                {packages?.data
                  .filter(
                    (prop) =>
                      (prop.categoryId as ICategoryProps)._id ===
                      selectedCategory
                  )
                  .find((prop) => prop?.packageType === "chat")?.price ||
                  selectedPrice}
              </AppButton>
              <AppButton outlined flexed>
                <AiOutlinePhone size={20} />
                {packages?.data
                  ?.filter(
                    (prop) =>
                      (prop?.categoryId as ICategoryProps)._id ===
                      selectedCategory
                  )
                  ?.find((prop) => prop?.packageType === "audio")?.price ||
                  selectedPrice}
              </AppButton>
              <AppButton outlined flexed>
                <AiOutlineVideoCamera size={20} />
                {packages?.data
                  .filter(
                    (prop) =>
                      (prop?.categoryId as ICategoryProps)._id ===
                      selectedCategory
                  )
                  ?.find((prop) => prop?.packageType === "video")?.price ||
                  selectedPrice}
              </AppButton>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </MainLayout>
  );
};
