import React, { useEffect } from "react";
import { MainLayout } from "../../../../layout";
import { useParams } from "react-router-dom";
import { useServicesSlice } from "../../../../redux/features";
import Aos from "aos";
import clsx from "clsx";

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
              className="capitalize text-3xl mt-10 text-primary-500"
            >
              {content?.label.toLocaleLowerCase()}
            </h1>
            <h2 data-aos="fade-out" className="text-2xl">
              {content?.title}
            </h2>
            <h3
              data-aos="fade-out"
              className="text-md text-gray-300 whitespace-pre-wrap"
            >
              {content?.subTitle}
            </h3>
            <div className="my-10" data-aos="fade-out">
              <h4 className="capitalize font-sans2 whitespace-pre-wrap">
                {sectionOne?.subTitle.length !== 0 &&
                  sectionOne?.title.toLocaleLowerCase()}
              </h4>
              <h5 className="text-lg text-gray-300">{sectionOne?.subTitle}</h5>
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
              <div className="grid grid-cols-1 xl:grid-cols-2 md:grid-cols-2 gap-10 justify-center items-center">
                {sectionTwo?.map(({ title, description }, i) => (
                  <div
                    key={i}
                    className="border px-10 py-5 rounded-md hover:shadow-lg"
                  >
                    <h6 className="font-libre text-xl">{title}</h6>
                    <p className="text-gray-300 whitespace-pre-wrap">
                      {description}
                    </p>
                  </div>
                ))}
              </div>
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
                    ? "flex flex-row flex-wrap"
                    : "flex flex-row gap-10 flex-wrap"
                )}
              >
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
            <div className="w-[70%] mx-auto" data-aos="fade-out">
              <h6 className="font-sans2 text-xl">{sectionFour?.title}</h6>
              <p className="italic my-5 text-lg">
                "{sectionFour?.description}"
              </p>
              <blockquote className="inline-flex text-xl text-primary-500 text-right">
                {sectionFour?.author}
              </blockquote>
            </div>
          </div>
          {/* <DownloadApp /> */}
        </div>
      </div>
    </MainLayout>
  );
};
