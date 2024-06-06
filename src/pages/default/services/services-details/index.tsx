import React from "react";
import { MainLayout } from "../../../../layout";
import { useParams } from "react-router-dom";
import { useServicesSlice } from "../../../../redux/features";
import { DownloadApp } from "../../../../component";

export const ServicesDetailsPage = () => {
  const { id } = useParams();
  const { pageContent } = useServicesSlice();
  const content = pageContent.find(
    (prop) => prop.id === parseInt(id as unknown as string)
  );
  const sectionOne = content?.sectionOne;
  const sectionTwo = content?.sectionThree;
  const sectionThree = content?.sectionFour;
  const sectionFour = content?.conclusion;
  return (
    <MainLayout>
      <div className="py-20 my-20 xl:px-20 px-5">
        <img
          src="https://placehold.co/800x400"
          alt=""
          className="rounded-lg xl:h-[60vh] xl:w-[80%] mx-auto"
        />
        <h1 className="capitalize text-3xl font-sans2 mt-10">
          {content?.label.toLocaleLowerCase()}
        </h1>
        <h2 className="text-2xl">{content?.title}</h2>
        <h3 className="text-md text-gray-500 whitespace-pre-wrap">
          {content?.subTitle}
        </h3>
        <div className="my-10">
          <h4 className="capitalize font-sans2 whitespace-pre-wrap">
            {sectionOne?.subTitle.length !== 0 &&
              sectionOne?.title.toLocaleLowerCase()}
          </h4>
          <h5 className="text-lg text-gray-500">{sectionOne?.subTitle}</h5>
          <div className="flex flex-wrap gap-5 mt-5">
            {sectionOne?.points.map((prop, i) => (
              <div
                key={i}
                className="bg-primary-300 hover:bg-primary-500 p-3  group rounded-md border-2 border-transparent hover:border-primary-500"
              >
                <p className=" group-hover:text-white capitalize">{prop}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="my-20">
          <div className="grid grid-cols-1 xl:grid-cols-2 md:grid-cols-2 gap-10 justify-center items-center">
            {sectionTwo?.map(({ title, description }, i) => (
              <div
                key={i}
                className="bg-gray-200 px-5 py-3 rounded-md hover:shadow-lg"
              >
                <h6 className="font-sans2 text-xl">{title}</h6>
                <p className="text-gray-500 whitespace-pre-wrap">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="my-20 grid xl:grid-cols-2 gap-10 items-center">
          <div>
            <img
              className="xl:w-[600px] xl:h-[400px] mx-auto"
              src="https://placehold.co/400x600"
              alt=""
            />
          </div>
          <ul className="">
            {sectionThree?.points.map((prop, i) => (
              <li key={i} className="flex gap-3">
                - {prop}
              </li>
            ))}
          </ul>
        </div>
        <div className="">
          <h6 className="font-sans2 text-xl">{sectionFour?.title}</h6>
          <p className="italic my-5">"{sectionFour?.description}"</p>
          <blockquote className="inline-flex text-xl text-primary-500 text-right">
            {sectionFour?.author}
          </blockquote>
        </div>
        <DownloadApp />
      </div>
    </MainLayout>
  );
};
