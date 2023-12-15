import React from "react";
import { Route, Routes } from "react-router-dom";
import {
     AboutPage,
     AllMentorsPage,
     BlogPage,
     ComingSoonPage,
     DefaultHome,
     MobileVerificationPage,
     SingleCategoryPage,
     UserProfilePage,
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
               <Route element={<PrivateRoutes />}>
                    <Route path="user">
                         <Route path="profile" element={<UserProfilePage />} />
                    </Route>
               </Route>
          </Routes>
     );
};
