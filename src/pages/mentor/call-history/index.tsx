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
import { callHistories } from "../../../data/call-history";
import { CallHistory } from "../../../interface";
import clsx from "clsx";
import { AppButton } from "../../../component";
import {
  FiChevronDown,
  FiMessageSquare,
  FiPhone,
  FiVideo,
} from "react-icons/fi";
import moment from "moment";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Fragment } from "react";

export const MentorCallHistoryPage = () => {
  const columns: ColumnDef<CallHistory>[] = [
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
            <p>Jhon Doe</p>
          </div>
        );
      },
    },
    {
      accessorKey: "callType",
      cell: ({ row }) => {
        return (
          <div>
            {row.original.callType === "audio" && <FiPhone size={24} />}
            {row.original.callType === "video" && <FiVideo size={24} />}
            {row.original.callType === "chat" && <FiMessageSquare size={24} />}
          </div>
        );
      },
    },
    {
      accessorKey: "timestamp",
      cell: ({ row }) => (
        <div className="text-gray-500">
          {moment(row.original.timestamp).format("LLL")}
        </div>
      ),
    },
    {
      accessorKey: "duration",
      cell: ({ row }) => {
        return (
          <div>
            <p>
              {row.original.duration ? (
                row.original.duration.toString()
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
              {row.original.messageContent ? (
                `${row.original.messageContent.length} messages`
              ) : (
                <span className="text-gray-500">N/A</span>
              )}
            </p>
          </div>
        );
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: () => {
        return (
          <div className="relative flex justify-end">
            <Menu>
              <MenuButton as={Fragment}>
                {({ active }) => (
                  <button
                    className={clsx(
                      active
                        ? "bg-primary-200 text-gray-950"
                        : "bg-primary-500 text-white",
                      "rounded-md px-5 py-2 flex items-center gap-3"
                    )}
                  >
                    Options <FiChevronDown size={24} />
                  </button>
                )}
              </MenuButton>

              <MenuItems
                anchor="bottom start"
                className="w-64 z-50 right-4 px-3 space-y-4 bg-white py-2 rounded-md shadow-xl shadow-primary-500 ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                {links.map(({ label }, i) => (
                  <MenuItem as={Fragment}>
                    {({ focus }) => <div key={i}>{label}</div>}
                  </MenuItem>
                ))}
              </MenuItems>
            </Menu>
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
    data: callHistories,
    columns,
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const links = [
    {
      label: "Report a problem",
      path: "path",
    },
    {
      label: "Privacy Document",
      path: "path",
    },
    {
      label: "Export data",
      path: "path",
    },
  ];
  return (
    <MentorLayout>
      <div>
        <div className="flex items-center justify-between py-3">
          <h1 className="text-3xl font-libre capitalize">calls</h1>
          <div className="flex gap-5 items-center">
            <AppButton outlined>Export history</AppButton>
          </div>
        </div>
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
      </div>
    </MentorLayout>
  );
};
