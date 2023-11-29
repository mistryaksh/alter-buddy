import React from "react";

import { AppProvider } from "./providers";
import { Route } from "react-router-dom";
import { DefaultHome } from "./pages";

export default function App() {
     return (
          <AppProvider>
               <Route path="/" element={<DefaultHome />} />
          </AppProvider>
     );
}
