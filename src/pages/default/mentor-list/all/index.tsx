import React, { useEffect, useState } from "react";
import { MainLayout } from "../../../../layout";
import {
  useGetAllCategoryQuery,
  useGetMentorsListQuery,
} from "../../../../redux/rtk-api";
import { useAppDispatch } from "../../../../redux";
import { handleError } from "../../../../redux/features";
import { MentorCard } from "../../../../component";
import { useParams } from "react-router-dom";
import clsx from "clsx";

export const AllMentorsPage = () => {
  const { id } = useParams();
  const [filter, setFilter] = useState<string>("all");
  const {
    data: subCategory,
    isError: isSubCategoryError,
    error: subCategoryError,
    isLoading: isSubCategoryLoading,
  } = useGetAllCategoryQuery();

  const {
    data: mentor,
    isError: isMentorError,
    isLoading: isMentorLoading,
    error: mentorError,
  } = useGetMentorsListQuery();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isSubCategoryError) {
      if ((subCategoryError as any).data) {
        dispatch(handleError((subCategoryError as any).data.message));
      } else {
        console.log(subCategoryError);
      }
    }
    if (isMentorError) {
      if ((mentorError as any).data) {
        dispatch(handleError((mentorError as any).data.message));
      } else {
        console.log(mentorError);
      }
    }
  }, [
    isSubCategoryError,
    subCategoryError,
    isMentorError,
    mentorError,
    dispatch,
    id,
  ]);

  return (
    <MainLayout loading={isMentorLoading || isSubCategoryLoading}>
      <div className="bg-gradient-to-t from-white via-white  to-primary-200">
        <div className=" py-20">
          <div className="container mx-auto xl:w-[65%] w-[95%] lg:w-[60%] shadow-xl px-10 bg-white rounded-md py-10">
            <div className="flex flex-wrap-reverse items-center gap-10">
              <div className="flex-1 flex flex-col gap-3">
                <h1 className="text-5xl capitalize font-bold">
                  Talk to your <span className="text-primary-500">buddy</span>
                </h1>
                <p className="text-gray-500">
                  Feeling lonely, anxious? Relationship problems? Let us help
                  you in your healing process. Find Top Mental Health experts
                  here. Start your first free chat
                </p>
              </div>
              <img
                src="https://static.wixstatic.com/media/11062b_918f77d49c6e47d395addb2e5dcef03c~mv2.jpg/v1/crop/x_539,y_0,w_2021,h_2048/fill/w_734,h_744,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/11062b_918f77d49c6e47d395addb2e5dcef03c~mv2.jpg"
                alt=""
                className="w-[300px] rounded-full border-2 border-gray-500"
              />
            </div>
          </div>
          <div className="py-20 container mx-auto">
            <div className="flex gap-10 flex-wrap">
              <div
                onClick={() => setFilter("all")}
                className={clsx(
                  filter === "all"
                    ? "bg-primary-500 text-white"
                    : "bg-white text-gray-950",
                  "px-10 py-2 rounded-md focus:border-primary-500 hover:border-primary-500 hover:cursor-pointer group flex justify-center items-center"
                )}
              >
                <p className="capitalize">All</p>
              </div>
              {subCategory?.data
                .map(({ _id, title }) => (
                  <div
                    key={_id}
                    onClick={() => setFilter(title)}
                    className={clsx(
                      filter === title
                        ? "bg-primary-500 text-white"
                        : "bg-white text-gray-950",
                      "px-10 py-2 rounded-md hover:border-primary-500 hover:cursor-pointer group flex justify-center items-center"
                    )}
                  >
                    <p className="capitalize">{title}</p>
                  </div>
                ))
                .sort((a: any, b: any) => {
                  if (a.title < b.title) {
                    return -1;
                  }
                  if (a.title > b.title) {
                    return 1;
                  }
                  return 0;
                })}
            </div>
          </div>
          <div className="container mx-auto xl:px-0 lg:px-0 px-5">
            <div className="grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 gap-10">
              {(mentor?.data.length as number) > 0 &&
                mentor?.data
                  .filter((props) => {
                    if (filter === "all") {
                      return props;
                    } else {
                      return filter === props?.category?.title;
                    }
                  })
                  .map(
                    ({ name, accountStatus, category, specialists, _id }) => (
                      <MentorCard
                        key={_id}
                        expertise={category?.title}
                        fname={name.firstName}
                        lname={name.lastName}
                        image="https://static.wixstatic.com/media/413494fe1952433685bef1305e765971.jpg/v1/fill/w_574,h_646,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Personal%20Trainer.jpg"
                        specialist={specialists}
                        verified={accountStatus.verification}
                        id={_id as string}
                      />
                    )
                  )}
            </div>
            {mentor?.data.length === 0 && (
              <div className="">
                <h5 className="text-3xl text-gray-500">
                  No mentor's found for this category
                </h5>
                <p>
                  Stay tuned for more updated by subscribing our service! Lorem
                  ipsum dolor sit amet, consectetur adipisicing elit. Ut
                  incidunt enim esse suscipit amet sint facere ipsam voluptatem
                  perspiciatis tenetur!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
