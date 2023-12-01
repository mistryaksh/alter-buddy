import React from "react";

import { AppProvider } from "./providers";
import { Route } from "react-router-dom";
import { AboutPage, DefaultHome, OurServicePage, TalkToPage } from "./pages";

export default function App() {
     return (
          <AppProvider>
               <Route path="/" element={<DefaultHome />} />
               <Route path="/about" element={<AboutPage />} />
               <Route path="/services" element={<OurServicePage />} />
               <Route path="/talk" element={<TalkToPage />} />
          </AppProvider>
     );
}
