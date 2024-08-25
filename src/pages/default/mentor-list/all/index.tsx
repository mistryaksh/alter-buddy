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
import { ICategoryProps } from "../../../../interface";

export const AllMentorsPage = () => {
  const { id } = useParams();
  const [filter, setFilter] = useState<string>("all");
  const {
    data: category,
    isError: isCategoryError,
    error: categorError,
    isLoading: isCategoryLoading,
  } = useGetAllCategoryQuery();

  const {
    data: mentor,
    isError: isMentorError,
    isLoading: isMentorLoading,
    error: mentorError,
  } = useGetMentorsListQuery();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isCategoryError) {
      if ((categorError as any).data) {
        dispatch(handleError((categorError as any).data.message));
      } else {
        console.log(categorError);
      }
    }
    if (isMentorError) {
      if ((mentorError as any).data) {
        dispatch(handleError((mentorError as any).data.message));
      } else {
        console.log(mentorError);
      }
    }
  }, [isCategoryError, categorError, isMentorError, mentorError, dispatch, id]);

  const categoryIds = category?.data.map((cat) => cat._id);

  return (
    <MainLayout loading={isMentorLoading || isCategoryLoading}>
      <div className="bg-gradient-to-t from-white via-white  to-primary-200">
        <div className="py-20">
          <div className="container mx-auto xl:lg:md:w-[65%] w-[95%] shadow-xl px-10 bg-white rounded-md py-10">
            <div className="flex flex-wrap-reverse items-center gap-10">
              <div className="flex-1 flex flex-col gap-3">
                <h1 className="text-5xl capitalize font-bold">
                  Talk to your{" "}
                  <span className="text-primary-500">
                    {filter === "all" ? "Mentor" : filter}
                  </span>
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
                className="object-cover xl:lg:md:w-[300px] aspect-square rounded-full border-2 border-gray-500"
              />
            </div>
          </div>
          <div className="py-20 container mx-auto px-5">
            <div className="flex xl:lg:md:gap-10 gap-3 xl:lg:md:justify-start justify-center flex-wrap">
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
              {category?.data
                .slice()
                .sort((a, b) => a.title.localeCompare(b.title))
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
                ))}
            </div>
          </div>
          <div className="container mx-auto xl:px-0 lg:px-0 px-5">
            <div className="grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 gap-10">
              {(mentor?.data.length as number) > 0 &&
                mentor?.data
                  .filter((item) => {
                    if (filter === "all") {
                      return true; // No filtering
                    }
                    // Filter by category if filter is set
                    return item.category.some(
                      (cat) =>
                        categoryIds.includes(cat._id) && cat.title === filter
                    );
                  })
                  .map(
                    ({
                      name,
                      accountStatus,
                      category,
                      specialists,
                      _id,
                      image,
                      description,
                      languages,
                    }) => (
                      <MentorCard
                        key={_id}
                        expertise={
                          (category as ICategoryProps[])
                            .map((prop) => {
                              return prop.title.toLowerCase();
                            })
                            .join(", ") as unknown as string
                        }
                        languages={languages.join(", ")}
                        fname={name.firstName}
                        lname={name.lastName}
                        description={description}
                        image={
                          image?.length
                            ? image
                            : "https://qph.cf2.quoracdn.net/main-qimg-5b495cdeb2ebb79cff41634e5f9ea076"
                        }
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
