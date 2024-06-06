import React from "react";
import { MainLayout } from "../../../layout";
import { useServicesSlice } from "../../../redux/features";
import { AppButton } from "../../../component";
import { useNavigate } from "react-router-dom";

export const ServicesPage = () => {
  const { pageContent } = useServicesSlice();
  const navigate = useNavigate();
  return (
    <MainLayout hideNav={false} loading={false}>
      <div className="py-20 my-20 xl:px-20 px-5">
        <h1 className="text-4xl font-bold ">
          Our <span className="text-primary-500 font-sans2">Services</span>
        </h1>
        <div className="grid mt-20 grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 gap-10">
          {pageContent?.map(({ title, subTitle, id }) => (
            <div className="" key={id}>
              <h3 className="text-2xl text-gray-900 capitalize">{title}</h3>
              <p className="text-gray-500">{subTitle}</p>
              <AppButton onClick={() => navigate(`/services/${id}`)} link>
                Read More
              </AppButton>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export * from "./services-details";
