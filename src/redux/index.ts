import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { CurriedGetDefaultMiddleware } from "@reduxjs/toolkit/dist/getDefaultMiddleware";
import { useDispatch } from "react-redux";
import { FaqReducer, LayoutReducer } from "./features";

const AppMiddlewareFunc = (getDefaultMiddleware: CurriedGetDefaultMiddleware<any>) => {
     return getDefaultMiddleware({ immutableCheck: false }).concat([]);
};

export const AppStore = configureStore({
     reducer: combineReducers({
          layout: LayoutReducer,
          faq: FaqReducer,
     }),
     middleware: (getDefaultMiddleware) => AppMiddlewareFunc(getDefaultMiddleware),
});

export type RootState = ReturnType<typeof AppStore.getState>;
export type AppDispatch = typeof AppStore.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
