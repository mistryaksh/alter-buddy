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
  MentorSettingsPage,
  PrivacyPolicyPage,
  BuddyTubePage,
  ContactPage,
  TeamPage,
  MentalHealthPage,
  ManifestationPage,
  HealingPage,
  RantPage,
  MentorCallHistoryPage,
  SchedulesMentorPage,
} from "../pages";
import { MentorPrivateRoutes, UserPrivateRoutes } from "../component";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<DefaultHome />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/our-team" element={<TeamPage />} />
      <Route path="/contact-us" element={<ContactPage />} />
      <Route path="services">
        <Route path="mental-health" element={<MentalHealthPage />} />
        <Route path="manifestation" element={<ManifestationPage />} />
        <Route path="healing" element={<HealingPage />} />
        <Route path="rant" element={<RantPage />} />
      </Route>
      <Route path="/mentor/list" element={<AllMentorsPage />} />
      <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
      <Route path="/mentor/category/:id" element={<AllMentorsPage />} />
      <Route path="/mobile-verification" element={<MobileVerificationPage />} />
      <Route path="/category/:id" element={<SingleCategoryPage />} />
      <Route path="/coming-soon" element={<ComingSoonPage />} />
      <Route path="user">
        <Route element={<UserPrivateRoutes />}>
          <Route
            path="mentor/details/:id"
            element={<UserMentorDetailsPage />}
          />
          <Route path="buddytube" element={<BuddyTubePage />} />
          <Route path="my-profile" element={<UserProfilePage />} />
        </Route>
      </Route>
      <Route path="mentor">
        <Route path="login" element={<MentorLoginPage />} />
        <Route element={<MentorPrivateRoutes />}>
          <Route path="dashboard" element={<MentorDashboardPage />} />
          <Route path="call-history" element={<MentorCallHistoryPage />} />
          <Route path="schedules" element={<SchedulesMentorPage />} />
          <Route path="settings" element={<MentorSettingsPage />} />
        </Route>
      </Route>
    </Routes>
  );
};
