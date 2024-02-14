import React, { FC } from "react";
import clsx from "clsx";

import { AppButton } from "../../UI";

interface ExportMentorsProps {
     image: string;
     name: string;
     specialist: string;
     experience: string;
     path: string;
}

export const ExportMentors: FC<ExportMentorsProps> = ({ experience, name, path, specialist, image }) => {
     return (
          <div className="relative">
               <img src={image} alt={name} />
               <div
                    className={clsx(
                         ` p-3 xl:w-[95%] xl:absolute -right-5 -bottom-16 flex flex-col gap-5 xl:mb-0`,
                         "bg-gray-100"
                    )}
               >
                    <div>
                         <h6 className="text-xl font-semibold capitalize">{name}</h6>
                         <p className="text-md font-extralight capitalize">{specialist}</p>
                         <p className="text-md font-extralight capitalize">{experience} years of Experience</p>
                    </div>
                    <div className="flex justify-between gap-4 items-center">
                         <AppButton outlined>read more</AppButton>
                    </div>
               </div>
          </div>
     );
};
