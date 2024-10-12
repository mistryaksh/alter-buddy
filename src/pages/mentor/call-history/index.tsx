import React, { useState } from "react";
import { MentorLayout } from "../../../layout";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  PaginationState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import clsx from "clsx";
import { AppButton } from "../../../component";
import { FiMessageSquare, FiPhone, FiVideo } from "react-icons/fi";
import moment from "moment";
import { useMentorGetMyCallsQuery } from "../../../redux/rtk-api";
import { IChatProps } from "../../../interface";
import { AiOutlineLoading } from "react-icons/ai";

export const MentorCallHistoryPage = () => {
  const { data: calls, isLoading: isCallLoading } = useMentorGetMyCallsQuery();

  const columns: ColumnDef<IChatProps>[] = [
    {
      header: "Sr",
      cell: ({ row }) => <div>{row.index + 1}</div>,
    },
    {
      header: "User Name ",
      accessorKey: "userId",
      cell: ({ row }) => {
        return (
          <div>
            <p className="capitalize">
              {row.original.users.user.name?.firstName}{" "}
              {row.original.users.user.name?.lastName}
            </p>
          </div>
        );
      },
    },
    {
      accessorKey: "call Type",
      cell: ({ row }) => {
        return (
          <div>
            {row.original.sessionDetails.callType === "audio" && (
              <FiPhone size={24} />
            )}
            {row.original.sessionDetails.callType === "video" && (
              <FiVideo size={24} />
            )}
            {row.original.sessionDetails.callType === "chat" && (
              <FiMessageSquare size={24} />
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "timestamp",
      cell: ({ row }) => (
        <div className="text-gray-500">
          {moment(row.original.createdAt).format("LLL")}
        </div>
      ),
    },
    {
      accessorKey: "duration",
      cell: ({ row }) => {
        return (
          <div>
            <p>
              {row.original.sessionDetails.duration ? (
                row.original.sessionDetails.duration.toString()
              ) : (
                <span className="text-gray-500">N/A</span>
              )}
            </p>
          </div>
        );
      },
    },
    {
      header: "Messages",
      accessorKey: "messageContent",
      cell: ({ row }) => {
        return (
          <div>
            <p>
              {row.original.message.length ? (
                `${row.original.message.length} messages`
              ) : (
                <span className="text-gray-500">N/A</span>
              )}
            </p>
          </div>
        );
      },
    },
  ];
  const [columnVisibility] = useState<VisibilityState>({});
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const table = useReactTable({
    data: calls?.data || [],
    columns: columns,
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <MentorLayout>
      <div>
        <div className="flex items-center justify-between py-3">
          <h1 className="text-3xl font-libre capitalize">calls</h1>
          <div className="flex gap-5 items-center">
            <AppButton outlined>Export history</AppButton>
          </div>
        </div>
        {isCallLoading && (
          <div className="flex justify-center">
            <AiOutlineLoading size={100} className="animate-spin" />
          </div>
        )}
        {!isCallLoading && (
          <div className="overflow-x-auto bg-white px-3 pb-3 mt-5 rounded-lg font-libre">
            <table className="w-full caption-top text-sm">
              <thead className="[&_tr]:border-b bg-primary-200">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr
                    key={headerGroup.id}
                    className="border-b border-primary-300 transition-colors data-[state=selected]:bg-gray-500"
                  >
                    {headerGroup.headers.map((header) => {
                      const columnId = header.column.id;
                      return columnVisibility[columnId] !== false ? (
                        <th
                          align={(header.column.columnDef.meta as any)?.align}
                          key={header.id}
                          className={clsx(
                            "h-14 px-4 ltr:text-left uppercase rtl:text-right ltr:last:text-right rtl:last:text-left align-middle font-semibold text-sm text-primary-800 ltr:[&:has([role=checkbox])]:pr-0 rtl:[&:has([role=checkbox])]:pl-0",
                            header.column.columnDef.id === "actions" ||
                              header.column.columnDef.id === "status"
                              ? "text-right"
                              : "text-left"
                          )}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </th>
                      ) : null;
                    })}
                  </tr>
                ))}
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                {table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b border-default-300 transition-colors data-[state=selected]:bg-gray-500"
                  >
                    {row.getVisibleCells().map((cell) => {
                      const columnId = cell.column.id;
                      return columnVisibility[columnId] !== false ? (
                        <td
                          align={(cell.column.columnDef.meta as any)?.align}
                          key={cell.id}
                          className={clsx(
                            `px-4 table-cell border-b py-3`,
                            cell.column.columnDef.id === "actions" ||
                              cell.column.columnDef.id === "status"
                              ? "text-right"
                              : "text-left",
                            (cell.column.columnDef.meta as any)?.className
                          )}
                        >
                          {flexRender(
                            cell.column.columnDef.cell
                              ? cell.column.columnDef.cell
                              : "N/A",
                            cell.getContext()
                          )}
                        </td>
                      ) : null;
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-4 flex justify-between items-center">
              <button
                onClick={() =>
                  setPagination((prev) => ({
                    ...prev,
                    pageIndex: Math.max(prev.pageIndex - 1, 0),
                  }))
                }
                className="px-4 py-1 bg-primary-500 text-gray-100 rounded disabled:bg-gray-100 disabled:text-gray-500 text-md"
                disabled={pagination.pageIndex === 0}
              >
                Previous
              </button>
              <span className="text-gray-500 text-sm">
                Page {pagination.pageIndex + 1} of {table.getPageCount()}
              </span>
              <button
                onClick={() =>
                  setPagination((prev) => ({
                    ...prev,
                    pageIndex: Math.min(
                      prev.pageIndex + 1,
                      table.getPageCount() - 1
                    ),
                  }))
                }
                className="px-4 py-1 bg-primary-500 text-gray-100 rounded disabled:bg-gray-100 disabled:text-gray-500 text-sm"
                disabled={pagination.pageIndex === table.getPageCount() - 1}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </MentorLayout>
  );
};
