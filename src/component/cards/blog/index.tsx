import React, { FC } from "react";
import { AiOutlineShareAlt } from "react-icons/ai";
import { AppButton } from "../../UI";
import { toast } from "react-toastify";

interface BlogCardProps {
  label: string;
  body: string;
  subLabel: string;
  createdAt: string;
  blogLink: string;
}

export const BlogCard: FC<BlogCardProps> = ({ label, subLabel, blogLink }) => {
  return (
    <div className="group flex flex-col items-start bg-white rounded-md hover:shadow-lg">
      <div className="w-full flex-1 p-3 rounded-b-lg">
        <div className="flex-row flex items-start justify-between">
          <div>
            <h5 className="group-hover:text-primary-500 text-xl capitalize  truncate">
              {label}
            </h5>
            <h6 className="text-gray-500 text-sm truncate">{subLabel}</h6>
          </div>
        </div>
        <div className="pt-3 flex items-center justify-end">
          <a href={blogLink} target="_blank" rel="noreferrer">
            <AppButton outlined>Read article</AppButton>
          </a>
          <button
            onClick={() => {
              const text = navigator.clipboard.writeText(blogLink);
              text
                .then(() => {
                  toast.success("Link copied to clipboard");
                })
                .catch((err) => {
                  toast.error("Something went wrong! please try again");
                  console.log(err);
                });
            }}
            className="p-2"
          >
            <AiOutlineShareAlt size={30} />
          </button>
        </div>
      </div>
    </div>
  );
};
