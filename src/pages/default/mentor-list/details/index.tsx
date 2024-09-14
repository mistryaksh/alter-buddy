import React, { useEffect } from "react";
import { MainLayout } from "../../../../layout";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../../../redux";
import {
  useBookMentorSlotMutation,
  useGetMentorPackagesByIdQuery,
  useGetMentorUsingIdQuery,
  useLazyGetSlotsByMentorIdQuery,
  useProfileUserQuery,
} from "../../../../redux/rtk-api";
import { handleError } from "../../../../redux/features";
import { AppButton } from "../../../../component";
import {
  AiOutlineCalendar,
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
import { v4 } from "uuid";
import DOMPurify from "dompurify";

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
    data: profile,
    isError: isProfileError,
    error: profileError,
  } = useProfileUserQuery();
  const [
    BookSlotWithMentor,
    {
      isError: isBookSlotError,
      isLoading: isBookSlotLoading,
      data: bookSlotData,
      error: bookSlotError,
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
      <div className="xl:px-10 px-5 pt-10 mb-10">
        <div className="flex flex-row items-start gap-20 justify-between xl:lg:md:flex-nowrap flex-wrap">
          <div className="xl:lg:md:flex-1">
            <div className="flex gap-10 justify-between w-full items-center">
              <div className="flex gap-10 items-center">
                <img
                  src={mentor?.data?.image}
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

            {isBookSlotLoading && isSlotLoading && (
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
                    {slots?.map(({ time, booked, _id: slotId }) => (
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
            {slotData?.data.length === 0 && (
              <div className="text-center w-full mb-5">
                <p className="text-gray-500">
                  No Slots found for {mentor?.data.name.firstName}{" "}
                  {mentor?.data.name.lastName}
                </p>
              </div>
            )}
            <hr />
            <div className="my-5">
              <div className="flex gap-3 items-center">
                <AiOutlineMessage size={30} className="fill-primary-500" />
                <p className="text-gray-900 capitalize font-bold">
                  Chat with {mentor?.data.name.firstName}{" "}
                  {mentor?.data.name.lastName.charAt(0)}.
                </p>
              </div>
              <p className="text-gray-500 my-2">
                Chat with the expert and get instant guidance
              </p>
              <div className="w-full mt-5 flex gap-3 flex-wrap">
                <AppButton
                  outlined
                  flexed
                  disabled={
                    !packages?.data.find(
                      (props) => props.packageType === "chat" && props.price > 0
                    )
                  }
                  onClick={() =>
                    navigate(`/user/chat/${mentor?.data._id}/${v4()}`)
                  }
                >
                  <div className="flex items-center gap-2">
                    <AiOutlineMessage size={25} />{" "}
                    <span className="text-sm">
                      {
                        packages?.data.find((props) => {
                          if (props.packageType === "chat") {
                            return `${props.price} coins`;
                          } else {
                            return 0;
                          }
                        })?.price
                      }
                    </span>
                  </div>
                </AppButton>

                <AppButton
                  outlined
                  flexed
                  disabled={
                    !packages?.data.find(
                      (props) =>
                        props.packageType === "audio" && props.price > 0
                    )
                  }
                  onClick={() =>
                    navigate(
                      `/user/video-call/${mentor?.data._id}?audio_call=true`
                    )
                  }
                >
                  <div className="flex items-center gap-2 flex-nowrap">
                    <AiOutlinePhone size={25} />
                    <span className="text-sm">
                      {
                        packages?.data.find((props) => {
                          if (props.packageType === "audio") {
                            return `${props.price} coins`;
                          } else {
                            return 0;
                          }
                        })?.price
                      }{" "}
                    </span>
                  </div>
                </AppButton>
                <AppButton
                  outlined
                  flexed
                  disabled={
                    !packages?.data.find(
                      (props) =>
                        props.packageType === "video" && props.price > 0
                    )
                  }
                  onClick={() =>
                    navigate(
                      `/user/video-call/${mentor?.data._id}?audio_call=false`
                    )
                  }
                >
                  <div className="flex items-center gap-2 flex-nowrap">
                    <AiOutlineVideoCamera size={25} />
                    <span className="text-sm">
                      {
                        packages?.data.find((props) => {
                          if (props.packageType === "video") {
                            return `${props.price} coins`;
                          } else {
                            return "no packages";
                          }
                        })?.price
                      }
                    </span>
                  </div>
                </AppButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
