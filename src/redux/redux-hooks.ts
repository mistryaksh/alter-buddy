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
     VideoCallApiMiddleware,
     VideoCallApiReducer,
     UserApiMiddleware,
     UserApiReducer,
     CallApiMiddleware,
     CallApiReducer,
} from "./rtk-api";
import {
     AuthenticationReducer,
     FaqReducer,
     InputReducer,
     LayoutReducer,
     MentorReducer,
     SlotReducer,
     VideoCallReducer,
} from "./features";

export const AppMiddlewares: Middleware[] = [
     AuthenticationMiddleware,
     MentorApiMiddleware,
     CategoryApiMiddleware,
     BlogApiMiddleware,
     FaqMiddleware,
     MentorAuthenticationApiMiddleware,
     VideoCallApiMiddleware,
     UserApiMiddleware,
     CallApiMiddleware,
];
export const AppReducers = combineReducers({
     //! APP API REDUCER
     authenticationApi: AuthenticationApiReducer,
     mentorApi: MentorApiReducer,
     categoryApi: CategoryApiReducer,
     blogApi: BlogApiReducer,
     faqApi: FaqApiReducer,
     mentorAuthenticationApi: MentorAuthenticationApiReducer,
     videoCallApi: VideoCallApiReducer,
     userApi: UserApiReducer,
     callApi: CallApiReducer,

     //! DEFAULT APP REDUCERS
     layout: LayoutReducer,
     faq: FaqReducer,
     mentors: MentorReducer,
     authentication: AuthenticationReducer,
     input: InputReducer,
     videoCall: VideoCallReducer,
     slot: SlotReducer,
});
