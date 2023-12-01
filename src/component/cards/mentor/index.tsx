import React, { FC } from "react";
import { MdVerified, MdStarRate } from "react-icons/md";
import { FaMicrophone } from "react-icons/fa";
import { BiCertification } from "react-icons/bi";
import { AppButton } from "../../UI";

interface MentorCardProps {
     fname: string;
     lname: string;
     specialist: string[];
     exp: number;
     languages: string[];
     image: string;
}

export const MentorCard: FC<MentorCardProps> = ({ exp, fname, image, languages, lname, specialist }) => {
     return (
          <div className="border border-primary-500 p-3 rounded-lg">
               <div className="flex items-center gap-3 justify-between">
                    <div className="flex items-center gap-3">
                         <div className="object-cover w-[18%]">
                              <img src={image} alt={fname + lname} className="rounded-full" />
                         </div>
                         <div>
                              <p className="text-2xl font-semibold">
                                   {fname} {lname}
                              </p>
                              {specialist.map((element, i) => (
                                   <p className="font-light" key={i}>
                                        {element}
                                   </p>
                              ))}
                              <p className="capitalize font-light">{exp} years of Experience</p>
                              <div className="flex items-center">
                                   <MdStarRate size={20} className="text-yellow-500" />
                                   <MdStarRate size={20} className="text-yellow-500" />
                                   <MdStarRate size={20} className="text-yellow-500" />
                                   <MdStarRate size={20} className="text-yellow-500" />
                                   <MdStarRate size={20} className="text-yellow-500" />
                              </div>
                         </div>
                    </div>
                    <MdVerified size={28} className="text-blue-500" />
               </div>
               <div className="py-5 flex flex-col gap-3">
                    <div className="flex gap-3 items-center">
                         <FaMicrophone size={24} className="text-primary-500" />
                         <p className="capitalize font-light">{languages.join(", ")}</p>
                    </div>
                    <div className="flex gap-3 items-center">
                         <BiCertification size={24} className="text-primary-500" />
                         <p className="capitalize font-light">Expertise</p>
                    </div>
               </div>
               <hr className="border-t border-primary-500" />
               <div className="flex items-center mt-3 gap-3 w-full">
                    <AppButton outlined flexed>
                         View more
                    </AppButton>
                    <AppButton filled flexed>
                         Book now
                    </AppButton>
               </div>
          </div>
     );
};
