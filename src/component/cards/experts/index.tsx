import React, { FC } from "react";
import clsx from "clsx";

import { AppButton } from "../../UI";
import { AiOutlineCheckCircle } from "react-icons/ai";

interface ExportMentorsProps {
     image: string;
     name: string;
     specialist: string;
     experience: string;
     path: string;
     status: boolean;
}

export const ExportMentors: FC<ExportMentorsProps> = ({ experience, name, path, specialist, image, status }) => {
     return (
          <div className="relative">
               <img src={image} alt={name} />
               <div className={clsx(` p-3  -right-5 -bottom-16 flex flex-col gap-5 xl:mb-0`, "bg-gray-100")}>
                    <div>
                         <h6 className="text-xl font-semibold  flex justify-between items-center capitalize text-gray-900">
                              {name ? name : "Mistry Aksh"}
                              {status ? (
                                   <AiOutlineCheckCircle color="red" size={30} />
                              ) : (
                                   <AiOutlineCheckCircle color="gray" size={30} />
                              )}
                         </h6>
                         <p className="text-sm font-extralight capitalize text-gray-500">{specialist}</p>
                         <p className="text-sm font-extralight capitalize text-gray-500">
                              {experience} years of Experience
                         </p>
                    </div>
                    <div className="flex justify-between gap-4 items-center">
                         <AppButton link>view details</AppButton>
                    </div>
               </div>
          </div>
     );
};
