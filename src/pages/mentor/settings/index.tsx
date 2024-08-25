import React, { useEffect } from "react";
import { MentorLayout } from "../../../layout";
import { useMentorProfileQuery } from "../../../redux/rtk-api";
import { toast } from "react-toastify";
import { AiOutlineRight, AiOutlineUser } from "react-icons/ai";

export const MentorSettingsPage = () => {
  const {
    data: profile,
    isError: isProfileError,
    error: profileError,
    isLoading: isProfileLoading,
  } = useMentorProfileQuery();

  useEffect(() => {
    if (isProfileError) {
      if ((profileError as any).data) {
        toast.error((profileError as any).data.message);
      } else {
        console.log(profileError);
      }
    }
  }, [isProfileError, profileError]);

  return (
    <MentorLayout loading={isProfileLoading}>
      <h6 className="text-3xl">My Settings</h6>
      <p className="text-gray-500">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sed iste nulla
        debitis placeat soluta blanditiis non ut consectetur vel ratione amet
        modi autem, porro officiis minima quisquam suscipit quam sequi!
      </p>
      <hr className=" my-10" />
      <div className="flex flex-col gap-10">
        <div className="shadow-lg p-5 gap-10 rounded-lg border-4 border-opacity-50 border-primary-500 flex justify-center items-center">
          <div className="flex-1 flex items-center gap-5">
            <div className="rounded-full p-3 bg-primary-300">
              <AiOutlineUser size={40} />
            </div>
            <div>
              <p className="text-2xl capitalize text-primary-500">
                {profile?.data.name.firstName} {profile?.data.name.lastName}{" "}
                settings
              </p>
              <p className="text-gray-500">@{profile?.data.auth.username}</p>
            </div>
          </div>
          <div className="w-[5%]">
            <AiOutlineRight size={30} />
          </div>
        </div>
        <hr />
      </div>
    </MentorLayout>
  );
};
