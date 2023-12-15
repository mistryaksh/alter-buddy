import React, { FC } from "react";
import { MdVerified, MdStarRate } from "react-icons/md";
import { BiCertification } from "react-icons/bi";
import { AppButton } from "../../UI";

interface MentorCardProps {
     fname: string;
     lname: string;
     specialist: string[];
     image: string;
     verified: boolean;
     expertise: string;
}

export const MentorCard: FC<MentorCardProps> = ({ fname, image, lname, specialist, verified, expertise }) => {
     return (
          <div className="border border-primary-500 p-3 rounded-lg">
               <div className="flex items-center gap-3 justify-between">
                    <div className="flex items-center gap-3">
                         <div className="object-cover w-[18%]">
                              <img src={image} alt={fname + lname} className="rounded-full" />
                         </div>
                         <div>
                              <p className="text-2xl font-semibold capitalize">
                                   {lname} {fname}
                              </p>
                              {specialist.join(", ")}
                              <div className="flex items-center">
                                   <MdStarRate size={20} className="text-yellow-500" />
                                   <MdStarRate size={20} className="text-yellow-500" />
                                   <MdStarRate size={20} className="text-yellow-500" />
                                   <MdStarRate size={20} className="text-yellow-500" />
                                   <MdStarRate size={20} className="text-yellow-500" />
                              </div>
                         </div>
                    </div>
                    {verified && <MdVerified size={28} className="text-blue-500" />}{" "}
               </div>
               <div className="py-5 flex flex-col gap-3">
                    <div className="flex gap-3 items-center">
                         <BiCertification size={24} className="text-primary-500" />
                         <p className="capitalize font-light">
                              Expert for <span className="text-primary-500">{expertise}</span>
                         </p>
                    </div>
               </div>
               <hr className="border-t border-primary-500" />
               <div className="flex items-center mt-3 gap-3 w-full">
                    <AppButton outlined flexed>
                         View more
                    </AppButton>
                    <AppButton filled flexed>
                         Schedule now
                    </AppButton>
               </div>
          </div>
     );
};
