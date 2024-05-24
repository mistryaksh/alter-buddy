import React from "react";
import { MainLayout } from "../../../layout";
import clsx from "clsx";
import { useGetMentorsListQuery } from "../../../redux/rtk-api";
import { DownloadApp, ExportMentors } from "../../../component";

export const AboutPage = () => {
  const { data: mentor } = useGetMentorsListQuery();
  return (
    <MainLayout>
      <div
        className={clsx(
          "bg-gradient-to-t  py-32  p-3",
          "to-primary-400 light from-white via-white"
        )}
      >
        <h6 className="text-6xl font-semibold text-center capitalize">
          About <span className="text-primary-500">Us</span>
        </h6>
        <div className="object-cover w-[60%] mx-auto my-20">
          <img
            src="https://static.wixstatic.com/media/a3c153_20122b9a32cc4e9a9faca835b9f82d14~mv2.jpg/v1/fill/w_1768,h_892,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/yiranding-yOWUAKYk46Y-unsplash%252520copy_.jpg"
            alt=""
          />
        </div>
        <hr className="pt-20 border-t-2 border-primary-300" />
        <div className="flex items-start flex-col container w-[60%] mx-auto flex-wrap">
          <div className="">
            <h6 className="capitalize text-3xl text-gray-900 font-semibold">
              get to know your mentors!
            </h6>
            <p className="text-lg font-sans2 text-primary-500 italic my-10">
              "Discover the Power Within, Transform Your Life."
            </p>
          </div>

          <div className="flex-1">
            <p className="text-lg text-gray-800 whitespace-pre-line">
              At times we are lost and filled with negativity all around us,
              drowning in the challenges and uncertainties of life. Our
              relationships, careers, health, and money all are at stake. We
              feel nothing is working for us and we are living the most
              miserable life one can ever have.
              <br />
              <br />
              We, the entire team of at Alterbuddy, have seen hundreds and
              thousands of people go through the same feeling, and have
              beautifully healed them to come out of these traumas and helped
              them live the best versions of themselves.
              <br />
              <br />
              The entire goal of all of us coming under one roof (Alterbuddy) as
              your buddies, healers, and genies, was to serve you as a one-stop
              solution for personal growth, healing, and manifestation.
              <br />
              <br />
              Where we guide you on your journey to mental wellness and
              transformation for:
              <br />
              - Better relationships
              <br />
              - Better health
              <br />
              - Better career
              <br />
              - Better inflow of money
              <br />
              <br />
            </p>

            <p className="font-sans2">
              Welcome aboard on the journey of self-discovery and
              transformation.
            </p>
          </div>
        </div>
      </div>
      <div className="py-20 pb-28 ">
        <div className="container mx-auto grid items-start px-2 justify-center grid-cols-2 md:grid-cols-3 xl:grid-cols-5  lg:grid-cols-3 gap-3 md:col-span-12">
          {mentor?.data
            .map(({ name, _id, accountStatus, category, subCategory }) => (
              <ExportMentors
                status={accountStatus.verification}
                key={_id}
                image="https://static.wixstatic.com/media/413494fe1952433685bef1305e765971.jpg/v1/fill/w_574,h_646,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Personal%20Trainer.jpg"
                name={`${name?.firstName} ${name?.lastName}`}
                path={`/user/mentor/details/${_id}`}
                specialist={category.title}
                subCategory={subCategory}
              />
            ))
            .reverse()}
        </div>
        <DownloadApp />
      </div>
    </MainLayout>
  );
};
