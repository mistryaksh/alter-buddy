import React, { FC } from "react";
import { useLayoutSlice } from "../../../redux/features";
import clsx from "clsx";
import { FaRegMessage } from "react-icons/fa6";
import { BiVideo } from "react-icons/bi";

import { AppButton } from "../../UI";

interface ExportMentorsProps {
     image: string;
     name: string;
     specialist: string;
     experience: string;
     path: string;
}

export const ExportMentors: FC<ExportMentorsProps> = ({ experience, name, path, specialist, image }) => {
     const { darkMode } = useLayoutSlice();
     return (
          <div className="relative">
               <img src={image} alt={name} />
               <div
                    className={clsx(
                         ` p-3 xl:w-[95%] xl:absolute -right-5 -bottom-16 flex flex-col gap-5 xl:mb-0`,
                         darkMode ? "bg-gray-900" : "bg-gray-100"
                    )}
               >
                    <div>
                         <h6 className="text-xl font-semibold">{name}</h6>
                         <p className="text-md font-extralight capitalize">{specialist}</p>
                         <p className="text-md font-extralight capitalize">{experience} years of Experience</p>
                    </div>
                    <div className="flex justify-between gap-4 items-center">
                         <AppButton outlined>read more</AppButton>
                         <button>
                              <FaRegMessage size={24} />
                         </button>
                         <button>
                              <BiVideo size={30} />
                         </button>
                    </div>
               </div>
          </div>
     );
};
