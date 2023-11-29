import React, { FC } from "react";
import { Link } from "react-router-dom";

interface ServicesCardProps {
     image: string;
     label: string;
     body: string;
     path: string;
}

export const ServicesCard: FC<ServicesCardProps> = ({ body, image, label, path }) => {
     return (
          <div className="flex-1 w-full flex shadow-xl border border-gray-300 rounded-lg group gap-5">
               <div className="w-[40%] flex justify-center items-center">
                    <img src={image} alt={label} className="rounded-lg" />
               </div>
               <div className="flex-1 flex flex-col justify-between py-5">
                    <h6 className="text-2xl group-hover:text-primary-500 font-semibold text-center">{label}</h6>
                    <p className="font-extralight italic text-gray-500">{body}</p>
                    <div className="flex justify-center">
                         <Link
                              to={path}
                              className="rounded-md hover:text-white hover:bg-primary-500 group py-2 items-center px-5 flex justify-center border border-primary-500 text-primary-500"
                         >
                              Read More
                         </Link>
                    </div>
               </div>
          </div>
     );
};
