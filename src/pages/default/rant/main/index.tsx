import React from "react";
import { MainLayout } from "../../../../layout";
import { AppButton } from "../../../../component";
import { useNavigate } from "react-router-dom";

export const RantHomePage = () => {
  const navigate = useNavigate();
  return (
    <MainLayout hideNav={false}>
      <div className="h-screen flex flex-col justify-center items-center">
        <h1 className="text-3xl font-semibold">
          This page is under development!
        </h1>
        <p className="text-gray-500">
          Exciting things are on the horizon—stay tuned for something
          extraordinary coming soon!
        </p>
        <AppButton filled onClick={() => navigate("/", { replace: true })}>
          Homepage
        </AppButton>
      </div>
    </MainLayout>
  );
};
