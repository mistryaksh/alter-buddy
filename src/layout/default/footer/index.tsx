import clsx from "clsx";
import React, { FC, useEffect } from "react";
import { useGetAllCategoryQuery } from "../../../redux/rtk-api";
import { Link } from "react-router-dom";
import { AlterBuddyLogo } from "../../../assets/logo";
import { useServicesSlice } from "../../../redux/features";
import { DownloadApp } from "../../../component";

interface MainFooterProps {}

export const MainFooter: FC<MainFooterProps> = () => {
  const {
    data: category,
    isError: isCategoryError,
    error: categoryError,
  } = useGetAllCategoryQuery();
  const { pageContent } = useServicesSlice();

  useEffect(() => {
    if (isCategoryError) {
      console.log(categoryError);
    }
  }, [isCategoryError, categoryError]);

  return (
    <div className={clsx("bg-primary-100")}>
      <footer className={clsx("py-20 border-t")}>
        <div className="grid xl:grid-cols-4 gap-10 px-2 lg:grid-cols-6 md:grid-cols-2 sm:grid-cols-2 grid-cols-1">
          <div className="flex flex-col">
            <div className="w-[100%] px-3">
              <Link to="/">
                <AlterBuddyLogo />
              </Link>
            </div>
            <DownloadApp />
          </div>
          <div>
            <label
              htmlFor="services"
              className="text-gray-900 capitalize font-sans2 font-semibold text-lg"
            >
              Our services
            </label>
            <div className="mt-2" id="services">
              <Link to="/buddytube">
                <p className="text-gray-500 capitalize font-sans  text-lg">
                  BuddyTube
                </p>
              </Link>
              {pageContent.map(({ id, label }, i) => (
                <Link to={`/services/${id}`} key={i}>
                  <p className="text-gray-500 capitalize font-sans  text-lg">
                    {label.toLowerCase()}
                  </p>
                </Link>
              ))}
            </div>
          </div>
          <div className="text-left">
            <label
              htmlFor="categories"
              className="text-gray-900  capitalize font-sans2 font-semibold text-lg"
            >
              Talk to experts
            </label>
            <div className="mt-2" id="categories">
              {category?.data.map(({ title, _id }) => (
                <p className="capitalize text-gray-500 " key={_id}>
                  {title}
                </p>
              ))}
            </div>
          </div>

          <div>
            <label
              htmlFor="Company"
              className="text-gray-900 capitalize font-sans2 font-semibold text-lg"
            >
              Company
            </label>
            <div>
              <p className="capitalize text-gray-500">Contact us</p>
              <p className="capitalize text-gray-500">About us</p>
              <p className="capitalize text-gray-500">Terms & Condition</p>
              <p className="capitalize text-gray-500">privacy policy</p>
            </div>
          </div>
        </div>
      </footer>
      <div className="bg-primary-200 p-4 flex justify-between items-center">
        <h6>© 2024 | AlterBuddy - All Rights Reserved</h6>
        <h6>
          Developed By{" "}
          <span className="text-primary-500">Akshal Web Solution</span>
        </h6>
      </div>
    </div>
  );
};
