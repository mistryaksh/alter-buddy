import React, { useEffect } from "react";
import { MainLayout } from "../../../layout";
import { useGetAllBlogQuery } from "../../../redux/rtk-api";
import { useAppDispatch } from "../../../redux";
import { handleError } from "../../../redux/features";
import { AppButton, BlogCard } from "../../../component";
import { IBlogCommentProps } from "../../../interface";

export const BlogPage = () => {
     const { data: blogs, isError: isBlogError, isLoading: isBlogLoading, error: blogError } = useGetAllBlogQuery();
     const dispatch = useAppDispatch();

     useEffect(() => {
          if (isBlogError) {
               dispatch(handleError((blogError as any).data.message));
          }
     }, [isBlogError, blogError, dispatch]);

     return (
          <MainLayout loading={isBlogLoading}>
               <div className="bg-gradient-to-t from-white to-primary-300 py-20">
                    <div className="border border-primary-500 py-20 px-10 w-[80%] mx-auto bg-white rounded-md flex flex-col gap-5">
                         <h1 className="text-3xl">Read articles for basic brain development</h1>
                         <p className="text-gray-500">
                              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis, debitis reprehenderit
                              veniam eligendi neque fugiat quibusdam aut consequuntur, nemo corporis minima totam dicta
                              eaque inventore, distinctio expedita earum laboriosam recusandae!
                         </p>
                         <div>
                              <AppButton filled>Get in touch with mentor</AppButton>
                         </div>
                    </div>
                    <div className="grid grid-cols-3 gap-10 w-[80%] mx-auto mt-20">
                         {blogs?.data.map(({ body, label, subLabel, comment, _id, createdAt }) => (
                              <BlogCard
                                   image="https://hms.harvard.edu/sites/default/files/media/neurons-850.jpg"
                                   key={_id}
                                   body={body}
                                   comment={comment as IBlogCommentProps[]}
                                   label={label}
                                   subLabel={subLabel}
                                   createdAt={createdAt as string}
                              />
                         ))}
                    </div>
               </div>
          </MainLayout>
     );
};
