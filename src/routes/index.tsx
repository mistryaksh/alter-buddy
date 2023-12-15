import React from "react";
import { Route, Routes } from "react-router-dom";
import {
     AboutPage,
     AllMentorsPage,
     BlogPage,
     ComingSoonPage,
     DefaultHome,
     MentorLoginPage,
     MobileVerificationPage,
     SingleCategoryPage,
     UserProfilePage,
     MentorDashboardPage,
     UserMentorDetailsPage,
} from "../pages";
import { PrivateRoutes } from "../component";
export const AppRoutes = () => {
     return (
          <Routes>
               <Route path="/" element={<DefaultHome />} />
               <Route path="/about" element={<AboutPage />} />
               <Route path="/mentor/category/:id" element={<AllMentorsPage />} />
               <Route path="/mobile-verification" element={<MobileVerificationPage />} />
               <Route path="/category/:id" element={<SingleCategoryPage />} />
               <Route path="/coming-soon" element={<ComingSoonPage />} />
               <Route path="/rant" element={<ComingSoonPage />} />
               <Route path="/blog" element={<BlogPage />} />
               <Route path="user">
                    <Route path="mentor/details/:id" element={<UserMentorDetailsPage />} />
                    <Route element={<PrivateRoutes />}>
                         <Route path="profile" element={<UserProfilePage />} />
                    </Route>
               </Route>
               <Route path="mentor">
                    <Route path="login" element={<MentorLoginPage />} />
                    <Route path="dashboard" element={<MentorDashboardPage />} />
                    <Route path="schedules" element={<MentorDashboardPage />} />
                    <Route path="chat" element={<MentorDashboardPage />} />
                    <Route path="settings" element={<MentorDashboardPage />} />
               </Route>
          </Routes>
     );
};
