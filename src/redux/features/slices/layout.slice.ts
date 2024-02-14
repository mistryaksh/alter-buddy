import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "../..";

export interface LayoutSliceProps {
     mobileMenu: boolean;
     authModal: boolean;
     modalView: modalView;
     error: string | null;
     success: string | null;
     verificationMode: "mobile" | "otp";
}

type modalView = "onboard" | "signin" | "signup";

const initialState: LayoutSliceProps = {
     mobileMenu: false,
     authModal: false,
     modalView: "onboard",
     error: null,
     success: null,
     verificationMode: "mobile",
};

const LayoutSlice = createSlice({
     initialState,
     name: "layout",
     reducers: {
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
          handleError: (state, action: PayloadAction<string | null>) => {
               state.error = action.payload;
          },
          handleSuccess: (state, action: PayloadAction<string>) => {
               state.success = action.payload;
          },
          handleVerificationMode: (state) => {
               if (state.verificationMode === "mobile") {
                    state.verificationMode = "otp";
               } else {
                    state.verificationMode = "mobile";
               }
          },
     },
});

export const useLayoutSlice = () =>
     useSelector((state: RootState) => {
          return state.layout;
     });
export const LayoutReducer = LayoutSlice.reducer;

export const {
     handleMobileMenu,
     handleAuthModal,
     handleAuthModalView,
     handleError,
     handleSuccess,
     handleVerificationMode,
} = LayoutSlice.actions;
