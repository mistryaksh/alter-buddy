import React from "react";
import { MainLayout } from "../../../layout";
import clsx from "clsx";

export const AboutPage = () => {
     return (
          <MainLayout>
               <div className={clsx("bg-gradient-to-t  py-32  p-3", "to-primary-400 light from-white via-white")}>
                    <h6 className="text-6xl font-semibold text-center capitalize">
                         About <span className="text-primary-500">Us</span>
                    </h6>
                    <div className="object-cover w-[60%] mx-auto my-20">
                         <img
                              src="https://static.wixstatic.com/media/a3c153_20122b9a32cc4e9a9faca835b9f82d14~mv2.jpg/v1/fill/w_1768,h_892,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/yiranding-yOWUAKYk46Y-unsplash%252520copy_.jpg"
                              alt=""
                         />
                    </div>
                    <hr className="pt-20 border-t-2 border-primary-300" />
                    <div className="flex items-start flex-col container w-[60%] mx-auto gap-10 flex-wrap">
                         <div className="w-[40%]">
                              <h6 className="capitalize text-3xl font-light">Our Company</h6>
                         </div>
                         <div className="flex-1">
                              <p className="font-extralight text-gray-500">
                                   This is your About page. This space is a great opportunity to give a full background
                                   on who you are, what you do, and what your site has to offer. Your users are
                                   genuinely interested in learning more about you, so don’t be afraid to share personal
                                   anecdotes to create a more friendly quality. Every website has a story, and your
                                   visitors want to hear yours. This space is a great opportunity to provide any
                                   personal details you want to share with your followers. Include interesting anecdotes
                                   and facts to keep readers engaged. Double click on the text box to start editing your
                                   content and make sure to add all the relevant details you want site visitors to know.
                                   If you’re a business, talk about how you started and share your professional journey.
                                   Explain your core values, your commitment to customers and how you stand out from the
                                   crowd. Add a photo, gallery or video for even more engagement.
                              </p>
                         </div>
                    </div>
               </div>
          </MainLayout>
     );
};
