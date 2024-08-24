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
import {
  AiOutlineCalendar,
  AiOutlineLoading,
  AiOutlineMessage,
  AiOutlinePhone,
  AiOutlineVideoCamera,
} from "react-icons/ai";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import { BsGraphUpArrow } from "react-icons/bs";
import { FaRegCommentDots } from "react-icons/fa6";
import moment from "moment";
import clsx from "clsx";
import { MdOutlineFormatQuote } from "react-icons/md";
import { Helmet } from "react-helmet";
import { v4 } from "uuid";

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

  return (
    <MainLayout loading={isMentorLoading}>
      <Helmet>
        <title>
          AlterBuddy | {`${mentor?.data.name.firstName}`}{" "}
          {`${mentor?.data.name.lastName}`}
        </title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      <div className="xl:px-10 px-5 pt-20 border">
        <div className="grid xl:grid-cols-12 grid-cols-12 items-start gap-20 justify-between flex-wrap">
          <div className="xl:col-span-8 col-span-12">
            <div className="flex gap-10 justify-between w-full items-center">
              <div className="flex gap-10 items-center">
                <img
                  src={mentor?.data?.image}
                  alt="mentor "
                  className="w-[25%] h-full rounded-lg border-2 p-2 border-dashed border-primary-500"
                />
                <div className="flex items-start flex-col">
                  <h6 className="text-3xl capitalize">
                    {mentor?.data.name.firstName}{" "}
                    {mentor?.data.name.lastName.charAt(0)}.
                  </h6>
                  <p className="capitalize text-gray-500">
                    {mentor?.data.category
                      .map((props) => props.title)
                      .join(", ")}
                  </p>
                </div>
              </div>
            </div>
            <hr className="my-10" />
            <div className="flex flex-col gap-5">
              <div>
                <h6 className="text-2xl font-sans2 capitalize text-primary-500">
                  About
                </h6>
                <div
                  dangerouslySetInnerHTML={{
                    __html: mentor?.data.description as string,
                  }}
                />
              </div>
              <div>
                <div className="mt-3">
                  <video
                    className="w-full"
                    src={
                      mentor?.data.videoLink
                        ? mentor.data.videoLink
                        : "https://www.youtube.com/embed/6stlCkUDG_s?si=pxr8czVHVOTT3JN0"
                    }
                    title="YouTube video player"
                    autoPlay={false}
                    controls
                    controlsList="nodownload nofullscreen noremoteplayback"
                  />
                </div>
              </div>
              <div className="bg-primary-100 p-3">
                <h6 className="text-2xl font-sans2 mb-2 capitalize text-primary-500">
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
          <div className="xl:col-span-4 sticky top-40 col-span-12 shadow-xl border border-gray-300 p-5 rounded-lg mt-10">
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
            {slotData?.data.length !== 0 &&
              slotData?.data.map(({ slots, slotsDate, _id }) => (
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
              <p className="text-gray-500 my-2">
                Chat with the expert and get instant guidance
              </p>
              <div className="w-full mt-5 flex gap-3">
                <AppButton
                  outlined
                  flexed
                  onClick={() =>
                    navigate(
                      `/user/video-call/${mentor?.data._id}?audio_call=false`
                    )
                  }
                >
                  <AiOutlineVideoCamera size={25} />
                  Video Call
                </AppButton>
                <AppButton
                  outlined
                  flexed
                  onClick={() =>
                    navigate(
                      `/user/video-call/${mentor?.data._id}?audio_call=true`
                    )
                  }
                >
                  <AiOutlinePhone size={25} />
                  Voice Call
                </AppButton>
                <AppButton
                  outlined
                  flexed
                  onClick={() =>
                    navigate(`/user/chat/${mentor?.data._id}/${v4()}`)
                  }
                >
                  <AiOutlineMessage size={25} />
                  Chat
                </AppButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
