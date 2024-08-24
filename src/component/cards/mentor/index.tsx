import React, { FC } from "react";
import { MdVerified } from "react-icons/md";
import { BiCertification } from "react-icons/bi";
import { AppButton } from "../../UI";
import { useNavigate } from "react-router-dom";

interface MentorCardProps {
  fname: string;
  lname: string;
  specialist: string[];
  image: string;
  verified: boolean;
  expertise: string;
  id: string;
  description: string;
  languages: string;
}

export const MentorCard: FC<MentorCardProps> = ({
  fname,
  image,
  lname,
  languages,
  verified,
  expertise,
  id,
}) => {
  const navigate = useNavigate();
  return (
    <div className="p-3 rounded-lg bg-white shadow-primary-100 shadow-xl border">
      <div className="flex items-center gap-3 justify-between">
        <div className="flex items-center gap-3">
          <div className="object-cover w-[30%]">
            <img src={image} alt={fname + lname} className="rounded-lg" />
          </div>
          <div className="flex-1">
            <p className="text-2xl capitalize">
              {lname} {fname}
            </p>
          </div>
        </div>
        {verified && <MdVerified size={28} className="text-blue-500" />}{" "}
      </div>
      <div className="py-5 flex flex-col gap-3">
        <div className="flex gap-3 items-center">
          <BiCertification size={24} className="text-primary-500" />
          <p className="capitalize font-light">
            Expert for{" "}
            <span className="text-primary-500 capitalize">{expertise}</span>
          </p>
        </div>
        <div className="flex gap-3 items-center">
          <BiCertification size={24} className="text-primary-500" />
          <p className="capitalize font-light">
            Languages for <span className="text-primary-500">{languages}</span>
          </p>
        </div>
      </div>
      <hr className="border-t border-primary-500" />
      <div className="flex items-center mt-3 gap-3 w-full">
        <AppButton
          outlined
          flexed
          onClick={() => navigate(`/user/mentor/details/${id}`)}
        >
          View more
        </AppButton>
        <AppButton filled flexed>
          Schedule now
        </AppButton>
      </div>
    </div>
  );
};
