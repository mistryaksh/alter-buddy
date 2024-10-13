import React, { useEffect } from "react";
import { MainLayout } from "../../../layout";
import { useGetAllBlogQuery } from "../../../redux/rtk-api";
import { useAppDispatch } from "../../../redux";
import { handleError } from "../../../redux/features";
import { AppButton, BlogCard } from "../../../component";

export const BuddyTubePage = () => {
  const {
    data: blogs,
    isError: isBlogError,
    isLoading: isBlogLoading,
    error: blogError,
  } = useGetAllBlogQuery();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isBlogError) {
      dispatch(handleError((blogError as any).data.message));
    }
  }, [isBlogError, blogError, dispatch]);

  return (
    <MainLayout loading={isBlogLoading}>
      <div className="bg-gradient-to-t from-white to-primary-300 xl:px-0 px-5 py-20">
        <div className="border border-primary-500 py-20 px-10 xl:w-[80%] mx-auto bg-white rounded-md flex flex-col gap-5">
          <h1 className="text-3xl">
            Read articles for basic brain development
          </h1>
          <p className="text-gray-500">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis,
            debitis reprehenderit veniam eligendi neque fugiat quibusdam aut
            consequuntur, nemo corporis minima totam dicta eaque inventore,
            distinctio expedita earum laboriosam recusandae!
          </p>
          <div>
            <AppButton filled>Get in touch with mentor</AppButton>
          </div>
        </div>
        <div className="grid xl:lg:md:grid-cols-12 grid-cols-12 gap-10 xl:w-[80%] mx-auto my-20">
          {blogs?.data.map(
            ({ body, label, subLabel, _id, createdAt, blogLink }) => (
              <div className="col-span-6">
                <BlogCard
                  key={_id}
                  body={body}
                  label={label}
                  subLabel={subLabel}
                  blogLink={blogLink}
                  createdAt={createdAt as string}
                />
              </div>
            )
          )}
        </div>
      </div>
    </MainLayout>
  );
};
