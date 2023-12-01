import React from "react";
import { MainLayout } from "../../../layout";
import clsx from "clsx";
import { useLayoutSlice, useMentorSlice } from "../../../redux/features";
import { MentorCard } from "../../../component";
import { MentorDataProps } from "../../../interface";

const filters = [
     "all",
     "therapist",
     "anxiety",
     "stress",
     "psychologist",
     "life coach",
     "all",
     "therapist",
     "anxiety",
     "stress",
     "psychologist",
     "life coach",
];

export const TalkToPage = () => {
     const { darkMode } = useLayoutSlice();
     const { data } = useMentorSlice();
     return (
          <MainLayout>
               <div className={clsx(`bg-gradient-to-t py-20 from-transparent via-transparent to-primary-400`)}>
                    <div
                         className={clsx(
                              `container mx-auto flex rounded-md flex-col gap-5 py-10 w-[70%] p-3 border border-primary-500`,
                              darkMode ? "dark" : "light"
                         )}
                    >
                         <div className="flex gap-5 items-center">
                              <div className="flex-1 flex flex-col gap-3">
                                   <h3 className="text-6xl font-bold">Talk to your Buddy</h3>
                                   <p className="font-light text-gray-500">
                                        Feeling lonely, anxious? Relationship problems? Let us help you in your healing
                                        process. Find Top Mental Health experts here. Start your first free chat.
                                   </p>
                              </div>
                              <div className="flex-1 flex justify-center items-center">
                                   <img
                                        src="
                         https://static.wixstatic.com/media/11062b_918f77d49c6e47d395addb2e5dcef03c~mv2.jpg/v1/crop/x_539,y_0,w_2021,h_2048/fill/w_734,h_744,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/11062b_918f77d49c6e47d395addb2e5dcef03c~mv2.jpg"
                                        alt=""
                                        className="rounded-full w-[70%] border-4 border-gray-300"
                                   />
                              </div>
                         </div>
                    </div>
               </div>
               <div>
                    <div className="py-10 flex gap-5 flex-wrap justify-center w-[70%] mx-auto">
                         {filters.map((element, i) => (
                              <div
                                   key={i}
                                   className={clsx(
                                        `  px-10 py-3 rounded-lg`,
                                        i === 1 ? "bg-primary-500 text-white" : "border text-gray-500 border-gray-500"
                                   )}
                              >
                                   <p className="capitalize ">{element}</p>
                              </div>
                         ))}
                    </div>
                    <div className="w-[70%] mx-auto container">
                         <div className="grid my-10 grid-cols-12 xl:grid-cols-2 gap-10 lg:grid-cols-2 md:grid-cols-6">
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
          </MainLayout>
     );
};
