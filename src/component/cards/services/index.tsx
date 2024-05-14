import React, { FC } from "react";
import { Link } from "react-router-dom";

interface ServicesCardProps {
  image: string;
  label: string;
  body: string;
  path: string;
  hideReadMore?: boolean;
}

export const ServicesCard: FC<ServicesCardProps> = ({
  body,
  image,
  label,
  path,
  hideReadMore,
}) => {
  return (
    <div className="flex-1 w-full flex flex-col items-center shadow-xl cursor-pointer border-gray-300 rounded-lg group gap-5">
      <div className=" h-full flex justify-center items-center">
        <img src={image} alt={label} className="rounded-lg object-fill" />
      </div>
      <div className="flex-1 flex flex-col justify-between py-5 px-2 text-justify">
        <h6 className="text-2xl group-hover:text-primary-500 font-semibold text-left capitalize">
          {label}
        </h6>
        <p className="font-extralight text-wrap italic text-gray-500">
          "{body}"
        </p>
        {!hideReadMore && (
          <div className="flex justify-end mt-3">
            <Link
              to={path}
              className="rounded-md hover:text-white hover:bg-primary-500 group py-2 items-center px-5 flex justify-center border border-primary-500 text-primary-500"
            >
              Read More
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
