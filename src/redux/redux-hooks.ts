import { Middleware, combineReducers } from "@reduxjs/toolkit";
import {
     AuthenticationApiReducer,
     AuthenticationMiddleware,
     BlogApiMiddleware,
     BlogApiReducer,
     CategoryApiMiddleware,
     CategoryApiReducer,
     FaqMiddleware,
     MentorApiMiddleware,
     MentorApiReducer,
     FaqApiReducer,
     MentorAuthenticationApiMiddleware,
     MentorAuthenticationApiReducer,
} from "./rtk-api";
import { AuthenticationReducer, FaqReducer, InputReducer, LayoutReducer, MentorReducer } from "./features";

export const AppMiddlewares: Middleware[] = [
     AuthenticationMiddleware,
     MentorApiMiddleware,
     CategoryApiMiddleware,
     BlogApiMiddleware,
     FaqMiddleware,
     MentorAuthenticationApiMiddleware,
];
export const AppReducers = combineReducers({
     //! APP API REDUCER
     authenticationApi: AuthenticationApiReducer,
     mentorApi: MentorApiReducer,
     categoryApi: CategoryApiReducer,
     blogApi: BlogApiReducer,
     faqApi: FaqApiReducer,
     mentorAuthenticationApi: MentorAuthenticationApiReducer,

     //! DEFAULT APP REDUCERS
     layout: LayoutReducer,
     faq: FaqReducer,
     mentors: MentorReducer,
     authentication: AuthenticationReducer,
     input: InputReducer,
});
