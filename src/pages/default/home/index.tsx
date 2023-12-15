import React, { useEffect } from "react";
import { MainLayout } from "../../../layout";
import {
     AppButton,
     DayHours,
     ExportMentors,
     HumanBrainIcon,
     ServicesCard,
     ShopUser,
     TestimonialsCard,
     TwoHands,
} from "../../../component";
import { Link } from "react-router-dom";
import { handleError, handleFaq, useAuthenticationSlice, useFaqSlice, useLayoutSlice } from "../../../redux/features";
import { useAppDispatch } from "../../../redux";
import clsx from "clsx";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { useGetAllFaqQuery, useGetAllSubCategoryQuery, useGetTopMentorListQuery } from "../../../redux/rtk-api";
import { getUserToken } from "../../../utils";
export const DefaultHome = () => {
     const { active } = useFaqSlice();
     const { data: mentor } = useGetTopMentorListQuery();
     const { authentication } = useAuthenticationSlice();

     const {
          data: subCategory,
          isError: isSubCategoryError,
          isLoading: isSubCategoryLoading,
          error: subCategoryError,
     } = useGetAllSubCategoryQuery();

     const { data: faq, isError: isFaqError, error: faqError, isLoading: isFaqLoading } = useGetAllFaqQuery();

     const { darkMode } = useLayoutSlice();

     const dispatch = useAppDispatch();

     const localStore = getUserToken();
     useEffect(() => {
          if (isSubCategoryError) {
               dispatch(handleError((subCategoryError as any).data.message));
          }
          if (isFaqError) {
               dispatch(handleError((faqError as any).data.message));
          }
     }, [authentication, dispatch, isSubCategoryError, subCategoryError, isFaqError, faqError, localStore]);

     return (
          <MainLayout loading={isSubCategoryLoading || isFaqLoading}>
               {/* section one */}
               <div
                    className={clsx(
                         `flex items-center gap-10 py-10 bg-gradient-to-bl `,
                         darkMode ? "dark  from-primary-600 to-gray-400" : "light  from-primary-300 to-white"
                    )}
               >
                    <div className="flex-1 p-10">
                         <h1 className="text-7xl text-primary-500 font-bold font-sans2">Welcome to AlterBuddy</h1>
                         <p className="py-10 text-lg dark:text-gray-500">
                              AlterBuddy is an online platform to help people connect with external therapists and help
                              with their mental health problems. Our mission is to provide mental wellness support to
                              those in need.
                         </p>
                         <AppButton outlined>Talk to expert</AppButton>
                    </div>
                    <div className="flex-1">
                         <img
                              src="
                         https://static.wixstatic.com/media/7cc31a_fd24e6bc5c1147c0a1e69922ca52d1b0~mv2.png/v1/fill/w_708,h_610,al_c,q_90,enc_auto/7cc31a_fd24e6bc5c1147c0a1e69922ca52d1b0~mv2.png"
                              alt=""
                         />
                    </div>
               </div>

               {/* section two */}
               <div className="my-20 container mx-auto w-[60%]">
                    <h6 className="font-light text-4xl text-center capitalize font-sans2">
                         why choose <span className="font-semibold text-primary-500">AlterBuddy?</span>
                    </h6>
                    <div className="grid grid-cols-12 gap-10 mt-20 xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-6">
                         <div className="flex flex-col justify-center gap-2 items-center">
                              <HumanBrainIcon height={100} width={100} />
                              <p className="text-xl font-semibold">Licensed Therapists</p>
                         </div>
                         <div className="flex flex-col justify-center gap-2 items-center">
                              <DayHours height={100} width={100} />
                              <p className="text-xl font-semibold">Licensed Therapists</p>
                         </div>
                         <div className="flex flex-col justify-center gap-2 items-center">
                              <ShopUser height={100} width={100} />
                              <p className="text-xl font-semibold">Licensed Therapists</p>
                         </div>
                         <div className="flex flex-col justify-center gap-2 items-center">
                              <TwoHands height={100} width={100} />
                              <p className="text-xl font-semibold">Licensed Therapists</p>
                         </div>
                    </div>
               </div>

               {/* section three */}
               <div className="container mx-auto w-[60%]">
                    <h6 className="text-5xl capitalize text-left font-semibold font-sans2">
                         our <span className="text-primary-500">experts</span>
                    </h6>
                    <p className="font-extralight text-md text-gray-500 my-5">
                         This is your Team section. It's a great place to introduce your team and talk about what makes
                         it special, such as your culture and work philosophy. Don't be afraid to illustrate personality
                         and character to help users connect with your team.
                    </p>
               </div>

               {/* section four */}
               <div className="bg-primary-200 py-20 pb-28">
                    <div className="container mx-auto grid grid-col-12 xl:grid-cols-4 lg:grid-cols-4 gap-10 md:col-span-12">
                         {mentor?.data
                              .map(({ mentorId, _id }) => (
                                   <ExportMentors
                                        key={_id}
                                        image="https://static.wixstatic.com/media/413494fe1952433685bef1305e765971.jpg/v1/fill/w_574,h_646,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Personal%20Trainer.jpg"
                                        experience="1"
                                        name={`${mentorId?.name?.firstName} ${mentorId?.name?.lastName}`}
                                        path="#read_more"
                                        specialist={mentorId?.specialists?.join(", ")}
                                   />
                              ))
                              .slice(0, 4)}
                    </div>
               </div>

               {/* section five */}
               <div className="">
                    <div className="container mx-auto w-[60%] py-20">
                         <h6 className="text-5xl capitalize text-left font-sans2">
                              Client <span className="text-primary-500 font-semibold">Testimonials</span>
                         </h6>
                         <p className="font-extralight text-md text-gray-500 my-5">
                              You do not have to take our word for it. Read through the testimonials of users who
                              transformed themselves with the guidance of Alterbuddy Experts.
                         </p>
                    </div>
                    <div className="xl:grid grid-cols-12 xl:grid-cols-4 lg:grid-cols-4 gap-10 container mx-auto">
                         <TestimonialsCard
                              body="I was hesitant to try online therapy but AlterBuddy made it easy and convenient for me. I highly recommend it."
                              user="Samantha Smith"
                         />
                         <TestimonialsCard
                              body="AlterBuddy helped me find the perfect therapist who understood my needs and supported me through a difficult time in my life."
                              user="Robert Cooper"
                         />
                         <TestimonialsCard
                              body="The self-care tools provided by AlterBuddy have been a game-changer for me. I feel more in control of my mental health now."
                              user="Robert Rose
"
                         />
                         <TestimonialsCard
                              body="I was hesitant to try online therapy but AlterBuddy made it easy and convenient for me. I highly recommend it."
                              user=" Samantha Smith"
                         />
                    </div>
               </div>

               {/* section six */}
               <div>
                    <div className=" mx-auto w-[60%] pt-20 pb-10">
                         <h6 className="text-5xl capitalize text-left font-sans2">
                              Our <span className="text-primary-500 font-semibold">Services</span>
                         </h6>
                    </div>
                    <div className="xl:w-[70%] mx-auto">
                         <div className="w-full xl:grid xl:grid-cols-12 gap-10 lg:grid-cols-6 md:grid-cols-12">
                              {subCategory?.data.map(({ label, desc, _id }) => (
                                   <div className="col-span-6" key={_id}>
                                        <ServicesCard
                                             body={desc}
                                             image="https://static.wixstatic.com/media/4432a4c385c44e609ac41982225b1669.jpg/v1/fill/w_386,h_466,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Loneliness.jpg"
                                             label={label}
                                             path="#read_more"
                                        />
                                   </div>
                              ))}
                         </div>
                    </div>
                    <div className="w-full text-center py-10">
                         <Link
                              to="/services"
                              className="hover:underline font-extralight text-lg text-primary-500 text-center"
                         >
                              Browse all services
                         </Link>
                    </div>
               </div>

               {/* section seven */}
               {faq?.data.length !== 0 && (
                    <div className="w-[70%] mx-auto py-20">
                         <h6 className="text-4xl font-bold capitalize text-center font-sans2">
                              Frequently asked questions
                         </h6>
                         <div className="mt-10">
                              {faq?.data.map(({ question, answer }, i: number) => (
                                   <div key={i} onClick={() => dispatch(handleFaq(i))}>
                                        <div className="border-b py-5 border-primary-500">
                                             <div className="flex items-center justify-between">
                                                  <h6
                                                       className={clsx(
                                                            `text-md font-semibold capitalize`,
                                                            i === active && "text-primary-500"
                                                       )}
                                                  >
                                                       {question}
                                                  </h6>
                                                  {i === active ? <FaAngleUp size={26} /> : <FaAngleDown size={26} />}
                                             </div>
                                             {i === active && <p className="mt-3 font-extralight">{answer}</p>}
                                        </div>
                                   </div>
                              ))}
                         </div>
                    </div>
               )}
          </MainLayout>
     );
};
