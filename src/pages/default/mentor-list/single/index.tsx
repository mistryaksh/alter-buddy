import React, { useEffect } from "react";
import { MainLayout } from "../../../../layout";
import { AppButton, MentorCard } from "../../../../component";
import { IMentorProps } from "../../../../interface";
import clsx from "clsx";
import { AiOutlineArrowRight } from "react-icons/ai";
import { handleError, useLayoutSlice } from "../../../../redux/features";
import { useLazyGetMentorBySubCategoryQuery, useLazyGetSubCategoryByIdQuery } from "../../../../redux/rtk-api";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../../../redux";

export const SingleCategoryPage = () => {
     const { error } = useLayoutSlice();
     const { id } = useParams();
     const dispatch = useAppDispatch();
     const [
          GetSubCategoryByIdQuery,
          { data: subCategory, isError: isSubCategoryError, error: subCategoryError, isLoading: isSubCategoryLoading },
     ] = useLazyGetSubCategoryByIdQuery({ pollingInterval: 3000 });
     const [
          GetMentorBySubCategoryQuery,
          { data: mentor, isError: isMentorError, isLoading: isMentorLoading, error: mentorError },
     ] = useLazyGetMentorBySubCategoryQuery({ pollingInterval: 3000 });

     useEffect(() => {
          if (isSubCategoryError) {
               if ((subCategoryError as any).data) {
                    dispatch(handleError((subCategoryError as any).data.message));
               }
          }
          if (isMentorError) {
               if ((mentorError as any).data) {
                    dispatch(handleError((mentorError as any).data.message));
               }
          }
          if (id) {
               (async () => {
                    await GetMentorBySubCategoryQuery(id);
                    await GetSubCategoryByIdQuery(id);
               })();
          }
     }, [
          isSubCategoryError,
          subCategoryError,
          dispatch,
          isMentorError,
          mentorError,
          id,
          GetSubCategoryByIdQuery,
          GetMentorBySubCategoryQuery,
     ]);

     return (
          <MainLayout loading={isSubCategoryLoading || isMentorLoading}>
               {error}
               <div className={clsx(`bg-gradient-to-t from-white via-white to-primary-200`)}>
                    <div className="container mx-auto flex flex-col gap-5 py-20 w-[60%]">
                         <h1 className="text-5xl font-semibold capitalize">{subCategory?.data.label}</h1>
                         <h6 className="text-2xl font-semibold">{subCategory?.data.subTitle}</h6>
                         <p className="w-[60%] font-light">{subCategory?.data.desc}</p>
                         <div>
                              <AppButton outlined flexed={false}>
                                   get in touch with your buddy
                                   <AiOutlineArrowRight size={25} />
                              </AppButton>
                         </div>
                    </div>
                    <div
                         className={clsx(
                              "border shadow-lg border-primary-500 rounded-lg p-10 w-[70%] container mx-auto"
                         )}
                    >
                         <div className="grid grid-cols-12 xl:grid-cols-3 lg:col-span-3 md:col-span-12 divide-x divide-primary-500">
                              <div className="px-10">
                                   <p className="text-center text-2xl capitalize">Symptoms</p>
                                   <ul className="list list-disc flex gap-5 flex-col mt-10 font-extralight">
                                        {subCategory?.data.symptoms.map((data, i) => (
                                             <li key={i}>{data}</li>
                                        ))}
                                   </ul>
                              </div>
                              <div className="px-10">
                                   <p className="text-center text-2xl capitalize">Causes</p>
                                   <ul className="list list-disc flex gap-5 flex-col mt-10 font-extralight">
                                        {subCategory?.data.causes.map((data, i) => (
                                             <li key={i}>{data}</li>
                                        ))}
                                   </ul>
                              </div>
                              <div className="px-10">
                                   <p className="text-center text-2xl capitalize">Treatment Options</p>
                                   <ul className="list list-disc flex gap-5 flex-col mt-10 font-extralight">
                                        {subCategory?.data.treatment.map((data, i) => (
                                             <li key={i}>{data}</li>
                                        ))}
                                   </ul>
                              </div>
                         </div>
                    </div>
                    <div className="w-[70%] container mx-auto py-20">
                         <h6 className="text-4xl font-semibold">
                              Recomended <span className="text-primary-500">Experts</span>
                         </h6>
                         <div className="grid my-10 grid-cols-12 xl:grid-cols-2 gap-5 lg:grid-cols-2 md:grid-cols-6">
                              {mentor?.data.length !== 0 &&
                                   mentor?.data.map(
                                        ({ name, _id: id, specialists, accountStatus, category }: IMentorProps) => (
                                             <MentorCard
                                                  id={id as string}
                                                  image={
                                                       "https://static.wixstatic.com/media/413494fe1952433685bef1305e765971.jpg/v1/fill/w_574,h_646,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Personal%20Trainer.jpg"
                                                  }
                                                  expertise={category.title}
                                                  verified={accountStatus.verification}
                                                  key={id}
                                                  fname={name?.firstName}
                                                  lname={name?.lastName}
                                                  specialist={specialists}
                                             />
                                        )
                                   )}
                         </div>
                         {mentor?.data.length === 0 && (
                              <div className="">
                                   <h5 className="text-3xl text-gray-500">No mentor's found for this service</h5>
                                   <p>
                                        Stay tuned for more updated by subscribing our service! Lorem ipsum dolor sit
                                        amet, consectetur adipisicing elit. Ut incidunt enim esse suscipit amet sint
                                        facere ipsam voluptatem perspiciatis tenetur!
                                   </p>
                              </div>
                         )}
                    </div>
               </div>
               {mentor?.data.length !== 0 && (
                    <div className="flex justify-center pb-10">
                         <button className="capitalize font-light text-gray-500 text-center">load more</button>
                    </div>
               )}
          </MainLayout>
     );
};
