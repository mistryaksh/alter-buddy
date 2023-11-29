import React, { FC } from "react";

interface TestimonialsCardProps {
     body: string;
     user: string;
}

export const TestimonialsCard: FC<TestimonialsCardProps> = ({ body, user }) => {
     return (
          <div className="border border-primary-500 rounded-lg py-10 px-3 space-y-10">
               <div className="h-[200px]">
                    <blockquote className="text-xl text-ellipsis font-extralight italic">"{body}"</blockquote>
               </div>
               <p className="text-center">— {user}</p>
          </div>
     );
};
