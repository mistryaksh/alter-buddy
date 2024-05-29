import React from "react";
import { Route, Routes } from "react-router-dom";
import {
  AboutPage,
  AllMentorsPage,
  ComingSoonPage,
  DefaultHome,
  MentorLoginPage,
  MobileVerificationPage,
  SingleCategoryPage,
  UserProfilePage,
  MentorDashboardPage,
  UserMentorDetailsPage,
  MentorCallHistoryPage,
  MentorSchedulesPage,
  MentorSettingsPage,
  PrivacyPolicyPage,
  ServicesPage,
  MentorVideoCallPage,
  ServicesDetailsPage,
  UserVideoCallPage,
  RantHomePage,
  BuddyTubePage,
  ContactPage,
  UserChatPage,
  MentorChatPage,
} from "../pages";
import { MentorPrivateRoutes, UserPrivateRoutes } from "../component";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<DefaultHome />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact-us" element={<ContactPage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/services/:id" element={<ServicesDetailsPage />} />
      <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
      <Route path="/mentor/category/:id" element={<AllMentorsPage />} />
      <Route path="/mobile-verification" element={<MobileVerificationPage />} />
      <Route path="/category/:id" element={<SingleCategoryPage />} />
      <Route path="/coming-soon" element={<ComingSoonPage />} />
      <Route path="/rant" element={<RantHomePage />} />
      <Route path="/buddytube" element={<BuddyTubePage />} />
      <Route path="user">
        <Route path="mentor/details/:id" element={<UserMentorDetailsPage />} />
        <Route path="chat/:id/:roomId" element={<UserChatPage />} />
        <Route element={<UserPrivateRoutes />}>
          <Route path="my-profile" element={<UserProfilePage />} />
          <Route path="video-call/:mentorId" element={<UserVideoCallPage />} />
        </Route>
      </Route>
      <Route path="mentor">
        <Route path="login" element={<MentorLoginPage />} />
        <Route element={<MentorPrivateRoutes />}>
          <Route path="dashboard" element={<MentorDashboardPage />} />
          <Route path="call-history" element={<MentorCallHistoryPage />} />
          <Route path="chat/messages" element={<MentorChatPage />} />
          <Route path="schedules" element={<MentorSchedulesPage />} />
          <Route path="chat/:id" element={<MentorVideoCallPage />} />
          <Route path="settings" element={<MentorSettingsPage />} />
        </Route>
      </Route>
    </Routes>
  );
};
