import React from "react";
import { MainLayout } from "../../../layout";
import clsx from "clsx";
import { AppButton, MentorCard } from "../../../component";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useLayoutSlice, useMentorSlice } from "../../../redux/features";
import { MentorDataProps } from "../../../interface";

export const OurServicePage = () => {
     const { darkMode } = useLayoutSlice();
     const { data } = useMentorSlice();
     return (
          <MainLayout>
               <div className={clsx(`bg-gradient-to-t from-transparent via-transparent to-primary-400`)}>
                    <div className="container mx-auto flex flex-col gap-5 py-20 w-[60%]">
                         <h1 className="text-5xl font-semibold">Anxiety</h1>
                         <h6 className="text-2xl font-semibold">Build A Healthier Relationship With Your Anxiety</h6>
                         <p className="w-[60%] font-light">
                              Get to the bottom of your anxiety by connecting with industry experts and understanding it
                              objectively and empathetically.
                         </p>
                         <div>
                              <AppButton outlined flexed={false}>
                                   get in touch with your buddy
                                   <AiOutlineArrowRight size={25} />
                              </AppButton>
                         </div>
                    </div>
                    <div
                         className={clsx(
                              "border shadow-lg border-primary-500 rounded-lg p-10 w-[70%] container mx-auto",
                              darkMode ? "dark" : "light"
                         )}
                    >
                         <div className="grid grid-cols-12 xl:grid-cols-3 lg:col-span-3 md:col-span-12 divide-x divide-primary-500">
                              <div className="px-10">
                                   <p className="text-center text-2xl capitalize">Symptoms</p>
                                   <ul className="list list-disc flex gap-5 flex-col mt-10 font-extralight">
                                        <li>Feeling extreme nervousness</li>
                                        <li>Having a sense of impending doom</li>
                                        <li>Restlessness</li>
                                        <li>Sweating</li>
                                        <li>Trembling</li>
                                        <li>Heart palpitations</li>
                                        <li>Dry mouth</li>
                                        <li>Stomach ache</li>
                                        <li>Headache or migraine</li>
                                        <li>Sleep issues</li>
                                        <li>Breathing rapidly</li>
                                        <li>Difficulty in concentrating</li>
                                   </ul>
                              </div>
                              <div className="px-10">
                                   <p className="text-center text-2xl capitalize">Causes</p>
                                   <ul className="list list-disc flex gap-5 flex-col mt-10 font-extralight">
                                        <li>Feeling extreme nervousness</li>
                                        <li>Having a sense of impending doom</li>
                                        <li>Restlessness</li>
                                        <li>Sweating</li>
                                        <li>Trembling</li>
                                        <li>Heart palpitations</li>
                                        <li>Dry mouth</li>
                                        <li>Stomach ache</li>
                                        <li>Headache or migraine</li>
                                        <li>Sleep issues</li>
                                        <li>Breathing rapidly</li>
                                        <li>Difficulty in concentrating</li>
                                   </ul>
                              </div>
                              <div className="px-10">
                                   <p className="text-center text-2xl capitalize">Treatment Options</p>
                                   <ul className="list list-disc flex gap-5 flex-col mt-10 font-extralight">
                                        <li>Feeling extreme nervousness</li>
                                        <li>Having a sense of impending doom</li>
                                        <li>Restlessness</li>
                                        <li>Sweating</li>
                                        <li>Trembling</li>
                                        <li>Heart palpitations</li>
                                        <li>Dry mouth</li>
                                        <li>Stomach ache</li>
                                        <li>Headache or migraine</li>
                                        <li>Sleep issues</li>
                                        <li>Breathing rapidly</li>
                                        <li>Difficulty in concentrating</li>
                                   </ul>
                              </div>
                         </div>
                    </div>
                    <div className="w-[70%] container mx-auto py-20">
                         <h6 className="text-4xl font-semibold">
                              Recomended <span className="text-primary-500">Experts</span>
                         </h6>
                         <div className="grid my-10 grid-cols-12 xl:grid-cols-2 gap-5 lg:grid-cols-2 md:grid-cols-6">
                              {data.map(({ exp, id, image, languages, name, specialist }: MentorDataProps) => (
                                   <MentorCard
                                        image={image}
                                        key={id}
                                        exp={exp}
                                        fname={name.fname}
                                        languages={languages}
                                        lname={name.lname}
                                        specialist={specialist}
                                   />
                              ))}
                         </div>
                    </div>
               </div>
               <div className="flex justify-center pb-10">
                    <button className="capitalize font-light text-gray-500 text-center">load more</button>
               </div>
          </MainLayout>
     );
};
