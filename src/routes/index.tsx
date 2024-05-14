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
  VideoCallOnboard,
  MentorChatPage,
  MentorCallHistoryPage,
  MentorSchedulesPage,
  MentorSettingsPage,
  PrivacyPolicyPage,
  ServicesPage,
  ServicesDetailsPage,
} from "../pages";
import { MentorPrivateRoutes, UserPrivateRoutes } from "../component";
export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<DefaultHome />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/services/:id" element={<ServicesDetailsPage />} />
      <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
      <Route path="/mentor/category/:id" element={<AllMentorsPage />} />
      <Route path="/mobile-verification" element={<MobileVerificationPage />} />
      <Route path="/category/:id" element={<SingleCategoryPage />} />
      <Route path="/coming-soon" element={<ComingSoonPage />} />
      <Route path="/rant" element={<ComingSoonPage />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="user">
        <Route path="mentor/details/:id" element={<UserMentorDetailsPage />} />
        <Route element={<UserPrivateRoutes />}>
          <Route path="profile" element={<UserProfilePage />} />
          <Route path="video/onboard/:id" element={<VideoCallOnboard />} />
        </Route>
      </Route>
      <Route path="mentor">
        <Route path="login" element={<MentorLoginPage />} />
        <Route element={<MentorPrivateRoutes />}>
          <Route path="dashboard" element={<MentorDashboardPage />} />
          <Route path="call-history" element={<MentorCallHistoryPage />} />
          <Route path="schedules" element={<MentorSchedulesPage />} />
          <Route path="chat/:id" element={<MentorChatPage />} />
          <Route path="settings" element={<MentorSettingsPage />} />
        </Route>
      </Route>
    </Routes>
  );
};
