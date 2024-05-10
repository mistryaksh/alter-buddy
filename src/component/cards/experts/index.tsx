import React, { FC } from "react";
import clsx from "clsx";
import { MdOutlineVerified } from "react-icons/md";
import { Link } from "react-router-dom";

interface ExportMentorsProps {
  image: string;
  name: string;
  specialist: string;
  experience: string;
  path: string;
  status: boolean;
}

export const ExportMentors: FC<ExportMentorsProps> = ({
  experience,
  name,
  path,
  specialist,
  image,
  status,
}) => {
  return (
    <div className="relative">
      <img src={image} alt={name} className="rounded-t-lg shadow-lg" />
      <div
        className={clsx(
          `p-3 flex flex-col gap-5 xl:mb-0`,
          "bg-gray-100  rounded-b-lg"
        )}
      >
        <div>
          <h6 className="text-xl font-semibold flex justify-between items-center capitalize text-gray-900">
            {name ? name : "Mistry Aksh"}
            {status ? (
              <MdOutlineVerified color="green" size={26} />
            ) : (
              <MdOutlineVerified color="gray" size={26} />
            )}
          </h6>
          <p className="text-sm font-extralight capitalize text-gray-500">
            {specialist}
          </p>
          <p className="text-sm font-extralight capitalize text-gray-500">
            {experience} years of Experience
          </p>
        </div>
        <div className="flex gap-4 items-center">
          <Link to={path} className="text-primary-500">
            Connect Now
          </Link>
        </div>
      </div>
    </div>
  );
};
