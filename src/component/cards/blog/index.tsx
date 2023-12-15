import React, { FC } from "react";
import { IBlogCommentProps } from "../../../interface";
import { AiOutlineComment, AiOutlineShareAlt } from "react-icons/ai";
import { AppButton } from "../../UI";

interface BlogCardProps {
     label: string;
     body: string;
     subLabel: string;
     comment: IBlogCommentProps[];
     createdAt: string;
     image: string;
}

export const BlogCard: FC<BlogCardProps> = ({ body, comment, label, subLabel, createdAt, image }) => {
     return (
          <div className="group flex flex-col items-start bg-white rounded-md hover:shadow-lg">
               <div>
                    <img src={image} alt="" />
               </div>
               <div className="w-full flex-1 p-3 rounded-b-lg">
                    <div className="flex-row flex items-start justify-between">
                         <div>
                              <h5 className="group-hover:text-primary-500 text-2xl capitalize font-bold truncate">
                                   {label}
                              </h5>
                              <h6 className="text-gray-500 truncate">{subLabel}</h6>
                         </div>
                         <div className="flex items-center gap-3 bg-primary-100 px-3 py-1 rounded-md">
                              <AiOutlineComment size={30} />
                              {comment.length}
                         </div>
                    </div>
                    <div className="pt-3 flex items-center justify-between">
                         <AppButton outlined>Read article</AppButton>
                         <button>
                              <AiOutlineShareAlt size={26} color="gray" />
                         </button>
                    </div>
               </div>
          </div>
     );
};
