import React, { useEffect } from "react";

import DataTable from "react-data-table-component";
import moment from "moment";

import { MentorLayout } from "../../../../layout";
import { IChatProps } from "../../../../interface";
import { useMentorGetMyCallsQuery } from "../../../../redux/rtk-api";
import {
  AiOutlineLoading,
  AiOutlineMessage,
  AiOutlinePhone,
  AiOutlineSearch,
  AiOutlineVideoCamera,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import {
  handleCallTypeSelection,
  useMentorSlice,
} from "../../../../redux/features";
import { useAppDispatch } from "../../../../redux";
import { TableFilterTab } from "../../../../component";
import { VscSearchStop } from "react-icons/vsc";

export const MentorCallHistoryPage = () => {
  const { data, isError, error, isLoading } = useMentorGetMyCallsQuery();
  const { selectedCallType } = useMentorSlice();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isError) {
      console.log(error);
    }
  }, [isError, error]);
  return (
    <MentorLayout>
      <h6 className="text-2xl font-bold text-gray-500 font-sans2">
        Call History
      </h6>
      <nav className="w-full rounded-md">
        <ol className="list-reset flex">
          <li>
            <Link
              to="#"
              className="text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
            >
              Home
            </Link>
          </li>
          <li>
            <span className="mx-2 text-neutral-500 dark:text-neutral-400">
              /
            </span>
          </li>
          <li>
            <Link
              to="#"
              className="text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
            >
              Calls
            </Link>
          </li>
          <li>
            <span className="mx-2 text-neutral-500 dark:text-neutral-400">
              /
            </span>
          </li>
          <li className="text-neutral-500 dark:text-neutral-400">History</li>
        </ol>
      </nav>
      <div className="p-3 my-10">
        <div className="flex gap-3 items-center ">
          <div className="flex items-center">
            <TableFilterTab
              value="all"
              filterFunc={() => dispatch(handleCallTypeSelection("all"))}
              selectedCallType={selectedCallType}
              label="All"
              dataLength={data?.data.length as number}
            />
            <TableFilterTab
              value="audio"
              filterFunc={() => dispatch(handleCallTypeSelection("audio"))}
              selectedCallType={selectedCallType}
              label="Voice"
              dataLength={
                data?.data.filter((prop) => {
                  return prop.sessionDetails.callType === "audio";
                }).length as number
              }
            />
            <TableFilterTab
              value="video"
              filterFunc={() => dispatch(handleCallTypeSelection("video"))}
              selectedCallType={selectedCallType}
              label="Video"
              dataLength={
                data?.data.filter((prop) => {
                  return prop.sessionDetails.callType === "video";
                }).length as number
              }
            />
            <TableFilterTab
              value="chat"
              filterFunc={() => dispatch(handleCallTypeSelection("chat"))}
              dataLength={
                data?.data.filter((prop) => {
                  return prop.sessionDetails.callType === "chat";
                }).length as number
              }
              selectedCallType={selectedCallType}
              label="Chat"
            />
          </div>
          <div className="flex gap-3 border items-center px-2 py-2 border-primary-500 rounded-md">
            <AiOutlineSearch size={25} className="fill-primary-500" />
            <input
              type="search"
              className=" text-md w-[300px]"
              placeholder="Search anything..."
            />
          </div>
        </div>
      </div>
      <div>
        {data?.data.length !== 0 && (
          <DataTable
            noDataComponent={
              <div className="flex justify-center items-center p-3 w-full h-[300px]">
                <VscSearchStop size={200} />
              </div>
            }
            data={
              data?.data.filter((props) => {
                if (selectedCallType === "audio") {
                  return props.sessionDetails.callType === selectedCallType;
                }
                if (selectedCallType === "video") {
                  return props.sessionDetails.callType === selectedCallType;
                }

                if (selectedCallType === "chat") {
                  return props.sessionDetails.callType === selectedCallType;
                }
                return props;
              }) as IChatProps[]
            }
            fixedHeader
            fixedHeaderScrollHeight="60vh"
            pagination
            striped
            highlightOnHover
            selectableRows
            paginationRowsPerPageOptions={[20, 50, 100, 150]}
            progressPending={isLoading}
            progressComponent={
              <div className="flex justify-center h-[40vh] items-center w-full flex-col gap-10">
                <AiOutlineLoading
                  size={150}
                  className="fill-primary-500 animate-spin"
                />
                <p className="text-gray-500 text-2xl">Loading...</p>
              </div>
            }
            columns={[
              {
                id: "users.user.name.firstName",
                name: "Username",
                sortable: true,
                width: "200px",
                wrap: true,
                cell: ({ users }) => (
                  <p className="text-sm text-gray-900 flex gap-3 capitalize">
                    {users?.user?.name?.firstName} {users?.user?.name?.lastName}
                  </p>
                ),
              },

              {
                id: "callType",
                name: "Session Type",
                sortable: true,
                width: "200px",
                cell: ({ sessionDetails }) => (
                  <p className="text-sm text-gray-900 flex gap-3 capitalize">
                    {sessionDetails.callType === "chat" && (
                      <AiOutlineMessage size={22} />
                    )}
                    {sessionDetails.callType === "audio" && (
                      <AiOutlinePhone size={22} />
                    )}
                    {sessionDetails.callType === "video" && (
                      <AiOutlineVideoCamera size={22} />
                    )}
                  </p>
                ),
              },
              {
                sortable: true,
                id: "status",
                name: "Duration",
                cell: ({ sessionDetails, status }) => {
                  return (
                    <span className="">
                      {sessionDetails.duration ? sessionDetails.duration : 0}
                    </span>
                  );
                },
              },
              {
                id: "status",
                name: "Details",
                selector: (row) => row.status as string,
              },
              {
                sortable: true,
                id: "time",
                name: "Call Time",
                cell: ({ createdAt }) => {
                  return (
                    <span className="">
                      {moment(createdAt).format("Do MMM YYYY hh:mm A")}
                    </span>
                  );
                },
              },
              {
                id: "action",
                name: "Actions",
                center: true,
                cell: () => (
                  <button type="button" className="text-red-500">
                    Report chat
                  </button>
                ),
              },
            ]}
          />
        )}
      </div>
    </MentorLayout>
  );
};
