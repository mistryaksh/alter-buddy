import React, { useEffect } from "react";
import { MainLayout } from "../../../../layout";
import { useParams } from "react-router-dom";
import { handleAuthModal, useServicesSlice } from "../../../../redux/features";
import Aos from "aos";
import clsx from "clsx";
import { AppButton } from "../../../../component";
import { useAppDispatch } from "../../../../redux";

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

  useEffect(() => {
    Aos.init({});
  }, []);
  const dispatch = useAppDispatch();

  return (
    <MainLayout>
      <div
        className="relative font-libre mt-10"
        style={{
          backgroundImage: `url(${content?.banner})`,
          backgroundPosition: "center center",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
        }}
      >
        <div
          className="bg-gray-950 bg-opacity-50 backdrop-blur text-white  py-20 mt-3 px-5"
          data-aos="fade-out"
        >
          <div>
            <h1
              data-aos="fade-out"
              className="capitalize text-3xl mt-10 text-primary-500 text-center"
            >
              {content?.label.toLocaleLowerCase()}
            </h1>
            <h2 data-aos="fade-out" className="text-2xl text-center my-10">
              {content?.title}
            </h2>
            <h3
              data-aos="fade-out"
              className="text-lg font-semibold text-center text-gray-300 whitespace-pre-wrap my-10"
            >
              {content?.subTitle}
            </h3>
            <div className="my-10" data-aos="fade-out">
              <h5 className="text-lg text-gray-400">{sectionOne?.title}</h5>
              <h5 className="text-lg text-gray-300">{sectionOne?.subTitle}</h5>
              <p>{sectionOne?.highlightDescription}</p>
              <div className="flex flex-wrap gap-5 mt-5">
                {sectionOne?.points.map((prop, i) => (
                  <div
                    key={i}
                    className=" bg-primary-500 p-3 group rounded-md border-2 border-transparent hover:border-primary-500"
                  >
                    <p className=" group-hover:text-white capitalize">{prop}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="my-20" data-aos="fade-out">
              <h6 className="mb-5">WE UNDERSTAND YOUR PAINS:</h6>
              <div className="grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 gap-10 w-full justify-center items-center">
                {sectionTwo?.map(({ title, description }, i) => (
                  <div
                    key={i}
                    className="border px-10 py-5 rounded-md hover:shadow-lg col-span-1"
                  >
                    <h6 className="font-libre text-xl">{title}</h6>
                    <p className="text-gray-300 whitespace-pre-wrap">
                      {description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="xl:w-[80%] mx-auto">
              <h6 className="text-2xl">{content?.solution?.title}</h6>
              <p>{content?.solution?.paragraph}</p>
            </div>
            <div
              data-aos="fade-out"
              className="my-20 grid xl:grid-cols-2 gap-10 items-center"
            >
              <div className="w-[60%] mx-auto object-cover">
                <img
                  // className="shadow-xl shadow-primary-500"
                  src={content?.secondaryImage}
                  alt=""
                />
              </div>
              <ul
                className={clsx(
                  content?.label === "healing"
                    ? "flex flex-row flex-wrap justify-center items-center"
                    : "flex flex-row gap-10 flex-wrap justify-center items-center w-full"
                )}
              >
                <span className="text-primary-500 text-2xl">
                  OUR METHODOLOGIES:
                </span>
                {sectionThree?.points.map((prop, i) => (
                  <li
                    key={i}
                    className={clsx(
                      "flex",
                      content?.label === "MANIFESTATION" &&
                        "bg-primary-500 text-white p-2 rounded-md"
                    )}
                  >
                    {prop}
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-[70%] mx-auto text-center" data-aos="fade-out">
              <h6 className="font-sans2 text-xl text-center">
                {sectionFour?.title}
              </h6>
              <p className="italic my-5 text-lg">
                "{sectionFour?.description}"
              </p>
              <blockquote className=" text-center w-full text-xl text-primary-500">
                {sectionFour?.author}
              </blockquote>
            </div>
          </div>
          <div className="flex justify-center mt-10">
            <AppButton onClick={() => dispatch(handleAuthModal())} outlined>
              {" "}
              TALK TO US NOW!
            </AppButton>
          </div>

          {/* <DownloadApp /> */}
        </div>
      </div>
    </MainLayout>
  );
};
