import React, { useEffect, useState } from "react";

import { MainLayout } from "../../../../layout";
import {
  useGetAllCategoryQuery,
  useGetAllSlotsQuery,
  useGetMentorsListQuery,
} from "../../../../redux/rtk-api";
import { useAppDispatch } from "../../../../redux";
import { handleError } from "../../../../redux/features";
import { MentorCard } from "../../../../component";
import { useParams, useSearchParams } from "react-router-dom";
import { ICategoryProps } from "../../../../interface";
import { Field, Label, Select } from "@headlessui/react";
import { AiOutlineSearch } from "react-icons/ai";

const indianLanguages = [
  "Hindi",
  "Tamil",
  "Telugu",
  "Kannada",
  "Gujarati",
  "Bengali",
  "Punjabi",
  "Marathi",
  "Malayalam",
  "Odia",
  "Assamese",
  "Rajasthani",
  "Sanskrit",
  "Konkani",
  "Tulu",
  "Dogri",
  "Maithili",
  "Bhojpuri",
  "Sambalpuri",
  "Kodava",
  "Meitei",
  "Kashmiri",
  "Chhattisgarhi",
  "Badaga",
  "Braj Bhasha",
  "Kutchi",
  "Sindhi",
  "Toda",
  "Mizo",
  "Marwari",
  "Magahi",
  "Bodo",
  "Beary",
  "Pahari",
  "Bhili",
];

export const AllMentorsPage = () => {
  const { id } = useParams();
  const [params] = useSearchParams();
  const target = params.get("target");
  const { data: slots } = useGetAllSlotsQuery();
  const [catFilter, setCatFilter] = useState<string>("all");
  const [langFilter, setLangFilter] = useState<string>("all");
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

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  useEffect(() => {
    if (target?.length) {
      setCatFilter(target);
    }
  }, [target]);

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
                    {catFilter === "all" ? "Mentor" : catFilter}
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
            <div className="flex w-full xl:lg:md:gap-10 gap-3 justify-between flex-wrap">
              <div className="flex justify-start gap-5 items-center">
                <Field className="flex gap-3 items-start">
                  <Label>
                    <span className="text-gray-500 mr-3">Category</span>
                    <Select
                      onChange={(prop) => {
                        setCatFilter(prop.target.value);
                      }}
                      className="border px-5 py-2 focus:outline-none appearance-none rounded-md"
                      value={catFilter}
                    >
                      <option value={"all"}>All</option>
                      {category?.data
                        .slice()
                        .sort((a, b) => a.title.localeCompare(b.title))
                        .map(({ title, _id }) => (
                          <option key={_id} value={title}>
                            {title.toUpperCase()}
                          </option>
                        ))}
                    </Select>
                  </Label>
                </Field>
                <Field className="flex gap-3 items-start">
                  <Label>
                    <span className="text-gray-500 mr-3">Languages</span>
                    <Select
                      onChange={(prop) => {
                        setLangFilter(prop.target.value);
                      }}
                      className="border px-5 py-2 focus:outline-none appearance-none rounded-md"
                      value={langFilter}
                    >
                      <option value={"all"}>All</option>
                      {indianLanguages.map((lang, i) => {
                        return (
                          <option key={i} value={lang}>
                            {lang}
                          </option>
                        );
                      })}
                    </Select>
                  </Label>
                </Field>
              </div>
              <div className="w-[350px] bg-white flex items-center gap-3 border rounded-md  px-5 py-2">
                <AiOutlineSearch size={22} />
                <input
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="bg-transparent focus:outline-none w-full"
                  placeholder="Search Mentors"
                  type="search"
                />
              </div>
            </div>
          </div>
          <div className="container mx-auto xl:px-0 lg:px-0 px-5">
            <div className="grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 gap-10">
              {(mentor?.data.length as number) > 0 &&
                mentor?.data
                  .filter((item) => {
                    // Check if the mentor's name matches the search query
                    const matchesSearch =
                      item.name.firstName.toLowerCase().includes(searchQuery) ||
                      item.name.lastName.toLowerCase().includes(searchQuery);

                    // Check if the mentor matches the category catfilter
                    const matchesCategory =
                      catFilter === "all" ||
                      item.category.some(
                        (cat) =>
                          categoryIds.includes(cat._id) &&
                          cat.title === catFilter
                      );

                    // Return true if both search and category catfilters are matched
                    return matchesSearch && matchesCategory;
                  })
                  .filter((item) => {
                    if (catFilter === "all") {
                      return true;
                    }
                    return item.category.some(
                      (cat) =>
                        categoryIds.includes(cat._id) && cat.title === catFilter
                    );
                  })
                  .filter((item) => {
                    if (langFilter === "all") {
                      return true;
                    }
                    return item.languages.some(
                      (cat) => langFilter.includes(cat) && cat === langFilter
                    );
                  })
                  .map(
                    ({
                      name,
                      category,
                      specialists,
                      _id,
                      image,
                      description,
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
                        fname={name.firstName}
                        lname={name.lastName}
                        description={description}
                        image={
                          image?.length
                            ? image
                            : "https://qph.cf2.quoracdn.net/main-qimg-5b495cdeb2ebb79cff41634e5f9ea076"
                        }
                        specialist={specialists}
                        latestSlot={
                          slots?.data.filter((prop) => prop._id === _id)[0]
                            ?.slots[0]?.time
                        }
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
