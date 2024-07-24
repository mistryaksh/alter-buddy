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
  UserApiMiddleware,
  UserApiReducer,
  CallApiMiddleware,
  CallApiReducer,
  VideoCallApiReducer,
  VideoCallApiMiddleware,
  NotificationApiMiddleware,
  NotificationApiReducer,
  ChatApiReducer,
  ChatApiMiddleware,
} from "./rtk-api";
import {
  AuthenticationReducer,
  FaqReducer,
  HomeReducer,
  InputReducer,
  LayoutReducer,
  MentorReducer,
  ServicesReducer,
  SlotReducer,
  UserReducer,
  VideoCallReducer,
} from "./features";

export const AppMiddlewares: Middleware[] = [
  AuthenticationMiddleware,
  MentorApiMiddleware,
  CategoryApiMiddleware,
  BlogApiMiddleware,
  FaqMiddleware,
  MentorAuthenticationApiMiddleware,
  UserApiMiddleware,
  CallApiMiddleware,
  VideoCallApiMiddleware,
  NotificationApiMiddleware,
  ChatApiMiddleware,
];
export const AppReducers = combineReducers({
  //! APP API REDUCER
  authenticationApi: AuthenticationApiReducer,
  mentorApi: MentorApiReducer,
  categoryApi: CategoryApiReducer,
  blogApi: BlogApiReducer,
  faqApi: FaqApiReducer,
  mentorAuthenticationApi: MentorAuthenticationApiReducer,
  userApi: UserApiReducer,
  callApi: CallApiReducer,
  videoCallApi: VideoCallApiReducer,
  notificationApi: NotificationApiReducer,
  mentorChatApi: ChatApiReducer,

  //! DEFAULT APP REDUCERS
  layout: LayoutReducer,
  faq: FaqReducer,
  mentors: MentorReducer,
  authentication: AuthenticationReducer,
  input: InputReducer,
  slot: SlotReducer,
  home: HomeReducer,
  services: ServicesReducer,
  videoCall: VideoCallReducer,
  user: UserReducer,
});
