import React from "react";
import { Route, Routes } from "react-router-dom";
import {
  AboutPage,
  AllMentorsPage,
  ComingSoonPage,
  DefaultHome,
  MentorLoginPage,
  MobileVerificationPage,
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
  UserPaymentStatus,
  SignInPage,
  SignUpPage,
  MentorRantPage,
  TermsAndConditionPage,
  MentorVideoCallPage,
  PackagesPage,
  ForgotPasswordPage,
  ResetPasswordPage,
} from "../pages";
import { MentorPrivateRoutes, UserPrivateRoutes } from "../component";
import { UserVideoCallPage } from "../pages/user/video";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<DefaultHome />} />
      <Route path="/sign-in" element={<SignInPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/our-team" element={<TeamPage />} />
      <Route path="/contact-us" element={<ContactPage />} />
      <Route path="/buddytube" element={<BuddyTubePage />} />
      <Route path="services">
        <Route path="mental-health" element={<MentalHealthPage />} />
        <Route path="manifestation" element={<ManifestationPage />} />
        <Route path="healing" element={<HealingPage />} />
        <Route path="rant" element={<RantPage />} />
      </Route>
      <Route path="/mentor/list" element={<AllMentorsPage />} />
      <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
      <Route path="/terms-and-condition" element={<TermsAndConditionPage />} />
      <Route path="/mentor/category/:id" element={<AllMentorsPage />} />
      <Route path="/mobile-verification" element={<MobileVerificationPage />} />
      <Route path="/coming-soon" element={<ComingSoonPage />} />
      <Route path="user">
        <Route element={<UserPrivateRoutes />}>
          <Route
            path="mentor/details/:id"
            element={<UserMentorDetailsPage />}
          />
          <Route path="buddytube" element={<BuddyTubePage />} />
          <Route path="my-profile" element={<UserProfilePage />} />
          <Route path="payment" element={<UserPaymentStatus />} />
          <Route path="video-call/:mentorId" element={<UserVideoCallPage />} />
        </Route>
      </Route>
      <Route path="/mentor/login" element={<MentorLoginPage />} />
      <Route path="mentor">
        <Route element={<MentorPrivateRoutes />}>
          <Route path="dashboard" element={<MentorDashboardPage />} />
          <Route path="chat/:id" element={<MentorVideoCallPage />} />
          <Route path="call-history" element={<MentorCallHistoryPage />} />
          <Route path="schedules" element={<SchedulesMentorPage />} />
          <Route path="settings" element={<MentorSettingsPage />} />
          <Route path="rant" element={<MentorRantPage />} />
          <Route path="packages" element={<PackagesPage />} />
        </Route>
      </Route>
    </Routes>
  );
};
