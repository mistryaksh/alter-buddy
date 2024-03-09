import React, { FC } from "react";

interface TestimonialsCardProps {
     body: string;
     user: string;
}

export const TestimonialsCard: FC<TestimonialsCardProps> = ({ body, user }) => {
     return (
          <div className="border w-[400px] flex flex-col border-primary-500 rounded-md py-10 px-3 space-y-10">
               <div className="">
                    <blockquote className="text-xl text-ellipsis font-extralight italic">"{body}"</blockquote>
               </div>
               <blockquote className="text-right border-primary-500 border-r-2 pr-5">{user}</blockquote>
          </div>
     );
};
