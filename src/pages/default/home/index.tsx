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
import { handleAuthModal, handleFaq, useAuthenticationSlice, useFaqSlice } from "../../../redux/features";
import { useAppDispatch } from "../../../redux";
import clsx from "clsx";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { useGetAllFaqQuery, useGetAllSubCategoryQuery, useGetMentorsListQuery } from "../../../redux/rtk-api";
import { getUserToken } from "../../../utils";
import { AiOutlineCheckCircle, AiOutlinePhone } from "react-icons/ai";
export const DefaultHome = () => {
     const { active } = useFaqSlice();
     const { data: mentor } = useGetMentorsListQuery();
     const { authentication } = useAuthenticationSlice();

     const {
          data: subCategory,
          isError: isSubCategoryError,
          isLoading: isSubCategoryLoading,
          error: subCategoryError,
     } = useGetAllSubCategoryQuery();

     const { data: faq, isError: isFaqError, error: faqError, isLoading: isFaqLoading } = useGetAllFaqQuery();

     const dispatch = useAppDispatch();

     const localStore = getUserToken();
     useEffect(() => {
          if (isSubCategoryError) {
               console.log(subCategoryError);
               // dispatch(handleError((subCategoryError as any).data));
          }
          if (isFaqError) {
               console.log(faqError);
               // dispatch(handleError((faqError as any).data.message));
          }
     }, [authentication, dispatch, isSubCategoryError, subCategoryError, isFaqError, faqError, localStore]);

     return (
          <MainLayout loading={isSubCategoryLoading || isFaqLoading}>
               {/* section one */}
               <div className={clsx(`flex items-center gap-10 py-10 bg-gradient-to-bl `, "from-primary-300 to-white")}>
                    <div className="flex-1 p-10">
                         <h1 className="text-5xl text-primary-500 font-bold font-sans2 whitespace-pre-wrap">
                              Welcome to AlterBuddy.
                         </h1>
                         <h3 className="text-5xl mt-3 text-primary-500 font-bold font-sans2 whitespace-pre-wrap">
                              Your life alters here.
                         </h3>
                         <ul className="my-5">
                              <li className="flex items-center gap-3">
                                   <div className=" text-primary-500 p-2 rounded-full">
                                        <AiOutlineCheckCircle size={25} />
                                   </div>
                                   <p className="text-gray-500">
                                        Linking you to a support system for mental health, healing, and manifestation,
                                        24/7.
                                   </p>
                              </li>
                              <li className="flex items-center gap-5">
                                   <div className=" text-primary-500 p-2 rounded-full">
                                        <AiOutlineCheckCircle size={25} />
                                   </div>
                                   <p className="text-gray-500">
                                        Empower your journey with our expert guidance and personalized services to
                                        reshape your reality.
                                   </p>
                              </li>
                              <li className="flex items-center gap-5">
                                   <div className=" text-primary-500 p-2 rounded-full">
                                        <AiOutlineCheckCircle size={25} />
                                   </div>
                                   <p className="text-gray-500">
                                        Guiding you through demanding workdays and sleepless nights toward positive life
                                        transformations.
                                   </p>
                              </li>
                         </ul>
                         <div className="">
                              <div className="flex items-center mt-10 justify-start">
                                   <div onClick={() => dispatch(handleAuthModal())} className="flex-1">
                                        <AppButton filled>
                                             <AiOutlinePhone size={26} className="rotate-90" /> talk to buddy
                                        </AppButton>
                                   </div>
                                   <div className="flex-1">
                                        <a
                                             rel="noreferrer"
                                             href="http://play.google.com/store/apps/details?"
                                             target="_blank"
                                        >
                                             <img
                                                  className="w-[60%]"
                                                  src={require("../../../assets/play-store.jpeg")}
                                                  alt=""
                                             />
                                        </a>
                                   </div>
                                   <div className="flex-1">
                                        <a
                                             rel="noreferrer"
                                             href="http://play.google.com/store/apps/details?"
                                             target="_blank"
                                             className="flex-1"
                                        >
                                             <img
                                                  className="w-[60%]"
                                                  src={require("../../../assets/app-store.png")}
                                                  alt=""
                                             />
                                        </a>
                                   </div>
                              </div>
                         </div>
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
               <div className="my-40 container mx-auto w-[80%]">
                    <h6 className="font-light text-4xl text-center capitalize font-sans2">
                         why <span className="font-semibold text-primary-500">AlterBuddy?</span>
                    </h6>
                    <p className="text-center text-gray-500">
                         At AlterBuddy, we recognize the significance of fostering a positive mindset and nurturing
                         mental well-being. That's why we offer trusted buddies who are equipped to navigate through any
                         obstacles with you
                    </p>
                    <div className="grid grid-cols-12 gap-10 mt-20 items-center xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-6">
                         <div className="flex flex-col justify-center gap-2 items-center">
                              <HumanBrainIcon height={100} width={100} />
                              <p className="text-xl text-center text-gray-500 font-semibold">
                                   Trusted & Verified Buddies
                              </p>
                         </div>
                         <div className="flex flex-col justify-center gap-2 items-center">
                              <DayHours height={100} width={100} />
                              <p className="text-xl text-center text-gray-500 font-semibold">24*7 available</p>
                         </div>
                         <div className="flex flex-col justify-center gap-2 items-center">
                              <ShopUser height={100} width={100} />
                              <p className="text-xl text-center text-gray-500 font-semibold">Licensed Therapists</p>
                         </div>
                         <div className="flex flex-col justify-center gap-2 items-center">
                              <TwoHands height={100} width={100} />
                              <p className="text-xl text-center text-gray-500 font-semibold">
                                   Regional/Multiple Lanuages
                              </p>
                         </div>
                    </div>
               </div>

               {/* section three */}
               <div className="container mx-auto w-[80%]">
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
                              .map(({ name, _id, specialists, accountStatus }) => (
                                   <ExportMentors
                                        status={accountStatus.verification}
                                        key={_id}
                                        image="https://static.wixstatic.com/media/413494fe1952433685bef1305e765971.jpg/v1/fill/w_574,h_646,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Personal%20Trainer.jpg"
                                        experience="1"
                                        name={`${name?.firstName} ${name?.lastName}`}
                                        path="#read_more"
                                        specialist={specialists?.join(", ")}
                                   />
                              ))
                              .slice(0, 4)}
                    </div>
               </div>

               {/* section six */}
               <div>
                    <div className=" mx-auto w-[70%] pt-20 pb-10">
                         <h6 className="text-5xl capitalize text-left font-sans2">
                              We got your <span className="text-primary-500 font-semibold">back for</span>
                         </h6>
                    </div>
                    <div className="xl:w-[70%] mx-auto">
                         <div className="w-full xl:grid xl:grid-cols-12 gap-10 lg:grid-cols-6 md:grid-cols-12">
                              {subCategory?.data.map(({ label, desc, _id }) => (
                                   <div className="col-span-6" key={_id}>
                                        <ServicesCard
                                             body={desc}
                                             image="https://res.cloudinary.com/nowandme/image/upload/v1699332230/landing/services/card/sadness_eylxtc.webp"
                                             label={label}
                                             path={`/category/${_id}`}
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

               <div className="w-[80%] p-3 mx-auto my-20">
                    <h6 className="text-5xl capitalize text-left font-sans2">
                         How It <span className="text-primary-500">Works</span>
                    </h6>
                    <ul className="flex flex-wrap items-center gap-20 mt-10">
                         <li className="flex-1 flex flex-col items-center">
                              <h6 className="text-gray-900 font-xl text-2xl font-bold">
                                   <span className="select-none">01.</span> Get your logins
                              </h6>
                              <p className="text-gray-500 text-center">
                                   Take your pick from our panel of mental health & self-improvement experts
                              </p>
                              <img
                                   src={require("../../../assets/image/app-home-user.jpeg")}
                                   className="mt-5 w-[70%]"
                                   alt=""
                              />
                         </li>
                         <li className="flex-1  flex flex-col items-center">
                              <h6 className="text-gray-900 font-xl text-2xl font-bold">
                                   <span className="select-none">02.</span>Find Online Experts
                              </h6>
                              <p className="text-gray-500 text-center">
                                   Take your pick from our panel of mental health & self-improvement experts
                              </p>
                              <img
                                   src={require("../../../assets/image/app-mentor-list.jpeg")}
                                   className="mt-5 w-[70%]"
                                   alt=""
                              />
                         </li>
                         <li className="flex-1 flex flex-col items-center">
                              <h6 className="text-gray-900 font-xl text-2xl font-bold">
                                   <span className="select-none">03.</span> Connect Instantly
                              </h6>
                              <p className="text-gray-500 text-center">
                                   Share your thoughts, get support, and feel better
                              </p>
                              <img
                                   src={require("../../../assets/image/app-chat-user.jpeg")}
                                   className="mt-5 w-[70%]"
                                   alt=""
                              />
                         </li>
                    </ul>
                    <div
                         className="mt-10
                     flex justify-center"
                    >
                         <a rel="noreferrer" href="http://play.google.com/store/apps/details?" target="_blank">
                              <AppButton filled>Download app</AppButton>
                         </a>
                    </div>
               </div>

               {/* section five */}
               <div className="">
                    <div className="container mx-auto pt-20">
                         <h6 className="text-5xl capitalize text-left font-sans2">
                              Client <span className="text-primary-500 font-semibold">Testimonials</span>
                         </h6>
                         <p className="font-extralight text-md text-gray-500 my-5">
                              You do not have to take our word for it. Read through the testimonials of users who
                              transformed themselves with the guidance of Alterbuddy Experts.
                         </p>
                    </div>
                    <div className="flex gap-5 relative px-10 overflow-x-scroll items-center no-scrollbar">
                         <div className="w-[400px]">
                              <TestimonialsCard
                                   body="I was hesitant to try online therapy but AlterBuddy made it easy and convenient for me. I highly recommend it."
                                   user="Samantha Smith"
                              />
                         </div>
                         <div className="w-[400px]">
                              <TestimonialsCard
                                   body="AlterBuddy helped me find the perfect therapist who understood my needs and supported me through a difficult time in my life."
                                   user="Robert Cooper"
                              />
                         </div>
                         <div className="w-[400px]">
                              <TestimonialsCard
                                   body="The self-care tools provided by AlterBuddy have been a game-changer for me. I feel more in control of my mental health now."
                                   user="Robert Rose
"
                              />
                         </div>
                         <div className="w-[400px]">
                              <TestimonialsCard
                                   body="I was hesitant to try online therapy but AlterBuddy made it easy and convenient for me. I highly recommend it."
                                   user=" Samantha Smith"
                              />
                         </div>
                         <div className="w-[400px]">
                              <TestimonialsCard
                                   body="I was hesitant to try online therapy but AlterBuddy made it easy and convenient for me. I highly recommend it."
                                   user="Samantha Smith"
                              />
                         </div>
                         <div className="w-[400px]">
                              <TestimonialsCard
                                   body="AlterBuddy helped me find the perfect therapist who understood my needs and supported me through a difficult time in my life."
                                   user="Robert Cooper"
                              />
                         </div>
                         <div className="w-[400px]">
                              <TestimonialsCard
                                   body="The self-care tools provided by AlterBuddy have been a game-changer for me. I feel more in control of my mental health now."
                                   user="Robert Rose
"
                              />
                         </div>
                         <div className="w-[400px]">
                              <TestimonialsCard
                                   body="I was hesitant to try online therapy but AlterBuddy made it easy and convenient for me. I highly recommend it."
                                   user=" Samantha Smith"
                              />
                         </div>
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
                                        <div className="border-b py-8 border-gray-900">
                                             <div className="flex items-center justify-between">
                                                  <h6
                                                       className={clsx(
                                                            `text-lg font-semibold capitalize`,
                                                            i === active && "text-primary-500"
                                                       )}
                                                  >
                                                       {/* {i + 1} */}
                                                       {question}
                                                  </h6>
                                                  {i === active ? (
                                                       <FaAngleUp size={26} className="text-primary-500" />
                                                  ) : (
                                                       <FaAngleDown size={26} />
                                                  )}
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
