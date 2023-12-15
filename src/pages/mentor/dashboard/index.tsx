import React from "react";
import { MentorLayout } from "../../../layout";
import { useMentorProfileQuery } from "../../../redux/rtk-api";

export const MentorDashboardPage = () => {
     const { data: profile, isLoading: isProfileLoading } = useMentorProfileQuery();
     return (
          <MentorLayout loading={isProfileLoading}>
               <h3 className="text-2xl font-extrabold capitalize">
                    Good morning{" "}
                    <span className="text-primary-500 font-extrabold">Dr.{profile?.data.name.firstName}!</span>
               </h3>
          </MentorLayout>
     );
};
