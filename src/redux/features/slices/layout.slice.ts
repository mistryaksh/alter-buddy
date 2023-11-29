import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "../..";

export interface LayoutSliceProps {
     darkMode: boolean;
     mobileMenu: boolean;
}

const initialState: LayoutSliceProps = {
     darkMode: false,
     mobileMenu: false,
};

const LayoutSlice = createSlice({
     initialState,
     name: "layout",
     reducers: {
          handleDarkMode: (state) => {
               if (state.darkMode) {
                    localStorage.setItem("darkMode", "false");
                    state.darkMode = false;
               } else {
                    state.darkMode = true;
                    localStorage.setItem("darkMode", "true");
               }
          },
          handleMobileMenu: (state) => {
               state.mobileMenu = !state.mobileMenu;
          },
     },
});

export const useLayoutSlice = () =>
     useSelector((state: RootState) => {
          return state.layout;
     });
export const LayoutReducer = LayoutSlice.reducer;

export const { handleDarkMode, handleMobileMenu } = LayoutSlice.actions;
