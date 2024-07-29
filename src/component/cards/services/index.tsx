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
    <div className="border border-solid border-gray-200 rounded-2xl transition-all duration-500 flex flex-col justify-between">
      <div className="w-full object-cover">
        <img src={image} className="w-full h-[200px]" alt={label} />
      </div>
      <div className="p-4">
        <h4 className="text-base font-semibold text-gray-900 mb-2 capitalize transition-all duration-500 ">
          {label}
        </h4>
        <p className="text-sm font-normal text-gray-500 transition-all duration-500 leading-5 mb-5">
          {body}
        </p>
        {hideReadMore && (
          <Link to={path} className="text-primary-500 ">
            Read More
          </Link>
        )}
      </div>
    </div>
  );
};
