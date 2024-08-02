import React from "react";
import { useGetAllTeamMembersQuery } from "../../../redux/rtk-api";
import { MainLayout } from "../../../layout";

export const TeamPage = () => {
  const { data: team } = useGetAllTeamMembersQuery();

  return (
    <MainLayout>
      <div className="py-20 pb-28 container mx-auto" id="sectionOne">
        <h6 className="text-4xl mb-10 capitalize font-sans2">
          Meet <span className="text-primary-500">our team</span>
        </h6>
        <div className="mx-auto">
          {team?.data
            .map(({ name, image, dept }, i) => (
              <div
                key={i}
                className="flex flex-col xl:flex-row lg:flex-row md:flex-row items-center my-4 gap-5 container mx-auto border rounded-md"
              >
                {i % 2 === 0 ? (
                  <>
                    <img
                      src={
                        image
                          ? image
                          : `https://pfpassets.fra1.cdn.digitaloceanspaces.com/media/v1/prompts/176_office-sorporate.png`
                      }
                      alt={name}
                      className="w-1/4"
                    />
                    <div className="w-full p-4">
                      <h2 className="text-2xl font-bold">{name}</h2>
                      <p className="uppercase">{dept}</p>
                      <p className="text-lg text-gray-500">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Itaque beatae perspiciatis praesentium molestias. Quasi
                        exercitationem autem ea, ullam facilis non!
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-full p-4">
                      <h2 className="text-2xl font-bold">{name}</h2>
                      <p className="uppercase">{dept}</p>
                      <p className="text-lg text-gray-500">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Itaque beatae perspiciatis praesentium molestias. Quasi
                        exercitationem autem ea, ullam facilis non!
                      </p>
                    </div>
                    <img
                      src={
                        image
                          ? image
                          : `https://pfpassets.fra1.cdn.digitaloceanspaces.com/media/v1/prompts/176_office-sorporate.png`
                      }
                      alt={name}
                      className="w-1/4"
                    />
                  </>
                )}
              </div>
            ))
            .sort()}
        </div>
      </div>
    </MainLayout>
  );
};
