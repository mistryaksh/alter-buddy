import React, { useEffect } from "react";
import { MainLayout } from "../../../../layout";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../../../redux";
import { useGetMentorUsingIdQuery } from "../../../../redux/rtk-api";
import { handleError } from "../../../../redux/features";
import { FaArrowLeft } from "react-icons/fa6";

export const UserMentorDetailsPage = () => {
     const { id } = useParams();
     const dispatch = useAppDispatch();
     const {
          isError: isMentorError,
          isLoading: isMentorLoading,
          data: mentor,
          error: mentorError,
     } = useGetMentorUsingIdQuery(id as string);
     useEffect(() => {
          if (isMentorError) {
               if ((mentorError as any).data) {
                    dispatch(handleError((mentorError as any).data.message));
               } else {
                    console.log(mentorError);
               }
          }
     }, [isMentorError, mentorError, dispatch]);

     console.log(mentor);
     return (
          <MainLayout loading={isMentorLoading}>
               <div className="container mx-auto w-[70%] py-20 px-5">
                    <div className="flex items-center gap-20">
                         <FaArrowLeft size={30} color="gray" />
                         <h6 className="text-2xl capitalize font-bold">
                              {mentor?.data.name.firstName} {mentor?.data.name.lastName}'s profile
                         </h6>
                    </div>
                    <div className="">
                         <img
                              src="https://res.cloudinary.com/nowandme/image/upload/user_profile_pic/ia7rgfuhptbypnzgc9oy"
                              className="rounded-full w-[15%]"
                              alt=""
                         />
                    </div>
               </div>
          </MainLayout>
     );
};
