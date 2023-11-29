import React, { FC } from "react";
import { Link } from "react-router-dom";
import { useLayoutSlice } from "../../../redux/features";
import clsx from "clsx";

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
                         ` p-3 w-[95%] absolute -right-5 -bottom-16 flex flex-col gap-5`,
                         darkMode ? "bg-gray-900" : "bg-gray-100"
                    )}
               >
                    <div>
                         <h6 className="text-xl font-semibold">{name}</h6>
                         <p className="text-md font-extralight capitalize">{specialist}</p>
                         <p className="text-md font-extralight capitalize">{experience} years of Experience</p>
                    </div>
                    <Link to={path} className="text-sm text-gray-900 hover:text-primary-500">
                         Read More
                    </Link>
               </div>
          </div>
     );
};
