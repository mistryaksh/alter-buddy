import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "../..";

export interface LayoutSliceProps {
     darkMode: boolean;
     mobileMenu: boolean;
     authModal: boolean;
     modalView: modalView;
}

type modalView = "onboard" | "signin" | "signup";

const initialState: LayoutSliceProps = {
     darkMode: false,
     mobileMenu: false,
     authModal: false,
     modalView: "onboard",
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
          handleAuthModal: (state) => {
               state.authModal = !state.authModal;
          },
          handleAuthModalView: (state, action: PayloadAction<modalView>) => {
               if (action.payload) {
                    state.modalView = action.payload;
               } else {
                    state.modalView = "onboard";
               }
          },
     },
});

export const useLayoutSlice = () =>
     useSelector((state: RootState) => {
          return state.layout;
     });
export const LayoutReducer = LayoutSlice.reducer;

export const { handleDarkMode, handleMobileMenu, handleAuthModal, handleAuthModalView } = LayoutSlice.actions;
