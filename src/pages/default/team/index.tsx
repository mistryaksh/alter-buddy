import React from "react";
import { useGetAllTeamMembersQuery } from "../../../redux/rtk-api";

export const TeamPage = () => {
  const { data: team } = useGetAllTeamMembersQuery();

  return (
    <div className="py-20 pb-28 container mx-auto">
      <h6 className="text-4xl mb-10 capitalize font-sans2">
        Meet <span className="text-primary-500">our team</span>
      </h6>
      <div className="grid grid-cols-12 gap-10">
        {team?.data
          .map(({ name, image, dept }, i) => (
            <div
              data-aos="fade-up-rights"
              className="cols-span-12 xl:col-span-3 border rounded-md shadow-lg  lg:col-span-3 md:col-span-6"
            >
              <div className=" flex flex-col gap-5 p-2">
                <img
                  src={`https://pfpassets.fra1.cdn.digitaloceanspaces.com/media/v1/prompts/176_office-sorporate.png`}
                  className="w-full  h-auto rounded-md"
                  alt={name}
                />
                <div className="flex flex-col gap-3">
                  <h6 className="text-2xl font-libre font-bold">{name}</h6>
                  <p className="text-gray-500 uppercase">{dept}</p>
                </div>
              </div>
            </div>
          ))
          .sort()}
      </div>
    </div>
  );
};
