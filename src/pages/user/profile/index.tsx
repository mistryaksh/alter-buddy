import React, { useEffect } from "react";
import { MainLayout } from "../../../layout";
import { useProfileUserQuery } from "../../../redux/rtk-api";
import { useAppDispatch } from "../../../redux";
import { handleError } from "../../../redux/features";
import { Tab } from "@headlessui/react";
import clsx from "clsx";
import { AppButton, TextField } from "../../../component";
import { Link } from "react-router-dom";

const tabs = ["profile", "my schedules", "my wallet", "my orders"];

export const UserProfilePage = () => {
     const {
          data: profile,
          isError: isProfileError,
          isLoading: isProfileLoading,
          error: profileError,
     } = useProfileUserQuery();
     const dispatch = useAppDispatch();

     useEffect(() => {
          if (isProfileError) {
               if ((profileError as any).data) {
                    dispatch(handleError((profileError as any).data.message));
               } else {
                    console.log(profileError);
               }
          }
     }, [isProfileError, profileError, dispatch]);

     return (
          <MainLayout loading={isProfileLoading}>
               <div className="bg-primary-200 p-3">
                    <div className="w-[80%] mx-auto  bg-white">
                         <div className="py-10 flex bg-primary-100 px-3 items-center gap-5">
                              <div className="bg-primary-500 flex justify-start rounded-full pt-2 px-4">
                                   <p className="text-4xl uppercase text-white">{profile?.data.email.charAt(0)}</p>
                              </div>
                              <div>
                                   <h1 className="text-xl capitalize">
                                        {profile?.data.name.firstName} {profile?.data.name.lastName}
                                   </h1>
                                   <h1 className="text-md text-gray-500 capitalize">+91 {profile?.data.mobile}</h1>
                              </div>
                         </div>
                         <div className="p-3">
                              <Tab.Group>
                                   <Tab.List className="flex items-center gap-10">
                                        {({ selectedIndex }) => (
                                             <>
                                                  {tabs.map((element, i) => (
                                                       <Tab
                                                            key={i}
                                                            className={clsx(
                                                                 selectedIndex === i
                                                                      ? " border-primary-500 text-primary-500"
                                                                      : "border-transparent",
                                                                 "border-t-2 uppercase pt-3 font-bold"
                                                            )}
                                                       >
                                                            {element}
                                                       </Tab>
                                                  ))}
                                             </>
                                        )}
                                   </Tab.List>
                                   <Tab.Panels>
                                        <Tab.Panel>
                                             <div className="py-10 flex flex-col gap-10 w-[80%] mx-auto">
                                                  <div className="flex gap-3 items-center">
                                                       <TextField
                                                            label="First Name"
                                                            value={profile?.data.name.firstName}
                                                       />
                                                       <TextField
                                                            label="Last Name"
                                                            value={profile?.data.name.lastName}
                                                       />
                                                  </div>
                                                  <div>
                                                       <TextField label="email" value={profile?.data.email} />
                                                  </div>
                                                  <div>
                                                       <TextField label="mobile" value={profile?.data.mobile} />
                                                  </div>
                                                  <Link to="/forgot-password" className="underline  text-primary-500">
                                                       Forgot your password?
                                                  </Link>
                                                  <AppButton outlined>Save changes</AppButton>
                                             </div>
                                        </Tab.Panel>
                                        <Tab.Panel>Content 2</Tab.Panel>
                                        <Tab.Panel>Content 3</Tab.Panel>
                                        <Tab.Panel>Content 3</Tab.Panel>
                                   </Tab.Panels>
                              </Tab.Group>
                         </div>
                    </div>
               </div>
          </MainLayout>
     );
};
