import React, { useEffect } from "react";
import { MentorLayout } from "../../../../layout";
import { useMentorGetMyCallsQuery, useMentorProfileQuery } from "../../../../redux/rtk-api";
import DataTable from "react-data-table-component";
import { IChatProps } from "../../../../interface";
import { AiOutlineLoading, AiOutlineVideoCamera } from "react-icons/ai";

export const MentorCallHistoryPage = () => {
     const { data, isError, error, isLoading } = useMentorGetMyCallsQuery();
     const { data: profile } = useMentorProfileQuery();
     useEffect(() => {
          if (isError) {
               console.log(error);
          }
     }, [isError, error]);
     return (
          <MentorLayout>
               <h6 className="text-2xl font-bold text-gray-500">
                    Hey! <span className="capitalize text-primary-500">{profile?.data.name.firstName}</span> your
                    session history is here
               </h6>
               <p className="text-gray-500">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam, totam numquam? Earum consequuntur
                    dolores similique fugiat alias animi voluptatum sed.
               </p>
               {data?.data.length !== 0 && (
                    <DataTable
                         data={data?.data as IChatProps[]}
                         pagination
                         paginationPerPage={10}
                         paginationRowsPerPageOptions={[10, 25, 50, 100]}
                         progressPending={isLoading}
                         progressComponent={
                              <div className="flex justify-center h-[40vh] items-center w-full flex-col gap-10">
                                   <AiOutlineLoading size={150} className="fill-primary-500 animate-spin" />
                                   <p className="text-gray-500 text-2xl">Loading...</p>
                              </div>
                         }
                         columns={[
                              {
                                   id: "#",
                                   name: "#",
                                   center: true,
                                   width: "100px",
                                   cell: (_, index) => (
                                        <div className="flex items-center gap-3">
                                             <AiOutlineVideoCamera className="fill-primary-500" size={18} />
                                             <p className="text-sm text-gray-500">{index + 1}</p>
                                        </div>
                                   ),
                              },
                              {
                                   id: "users.user.name.firstName",
                                   name: "Session with",
                                   center: true,
                                   width: "200px",
                                   cell: (_, index) => (
                                        <p className="text-sm text-gray-900 flex gap-3 capitalize">
                                             {_.users.user.name.firstName} {_.users.user.name.lastName}
                                        </p>
                                   ),
                              },
                              {
                                   id: "sessionDetails.roomId",
                                   name: "Meeting ID",
                                   center: true,
                                   width: "200px",
                                   cell: (_) => (
                                        <p className="text-sm text-gray-900 flex gap-3">{_.sessionDetails.roomId}</p>
                                   ),
                              },
                              {
                                   id: "message.length",
                                   name: "Messages",
                                   center: true,
                                   width: "200px",
                                   cell: (_) => (
                                        <p className="text-sm text-gray-900 flex gap-3 capitalize">
                                             {_.message.length}
                                        </p>
                                   ),
                              },
                              {
                                   id: "status",
                                   name: "Call Status",
                                   center: true,
                                   cell: ({ status }) => (
                                        <div className="text-center">
                                             {status === "PENDING" && (
                                                  <p className="text-yellow-500 px-10 py-2 rounded-lg">
                                                       <span className="uppercase">{status}</span>
                                                  </p>
                                             )}
                                             {status === "ONGOING" && (
                                                  <p className="text-gray-500 px-10 py-2 rounded-lg">
                                                       <span className="uppercase">{status}</span>
                                                  </p>
                                             )}
                                             {status === "COMPLETED" && (
                                                  <p className="text-emerald-500 px-10 py-2 rounded-lg">
                                                       <span className="uppercase">{status}</span>
                                                  </p>
                                             )}
                                             {status === "REJECTED" && (
                                                  <p className="text-red-500 px-10 py-2 rounded-lg">
                                                       <span className="uppercase">{status}</span>
                                                  </p>
                                             )}
                                        </div>
                                   ),
                              },
                              {
                                   id: "action",
                                   name: "Actions",
                                   center: true,
                                   cell: () => (
                                        <div>
                                             <button type="button" className="text-red-500">
                                                  Report chat
                                             </button>
                                        </div>
                                   ),
                              },
                         ]}
                    />
               )}
          </MentorLayout>
     );
};
