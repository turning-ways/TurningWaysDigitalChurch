import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui/Table/table";
import React from "react";
import QuickActions from "./TableActions";
import { SlArrowRight } from "react-icons/sl";
import { RxAvatar } from "react-icons/rx";
import AddMemberBtn from "@/ui/Button/AddMemberBtn";
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/Avatar";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const navigate = useNavigate();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  return (
    <>
      <QuickActions table={table} />
      <div className="hidden lg:flex">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="font-azoSemiBold text-primary/50">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="hover:bg-gray-100 cursor-pointer"
                  data-state={row.getIsSelected() && "selected"}
                  onClick={() =>
                    navigate(
                      `/admin/directory/member/personal-information?id=${
                        (row.original as { _id: string })._id
                      }`
                    )
                  }>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <AddMemberBtn />
      </div>
      {table.getPageCount() > 1 && (
        <div className="lg:flex items-center justify-center space-x-2 py-4  !border-t-0 hidden ">
          <button
            className="flex items-center"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}>
            <IoIosArrowRoundBack className="size-6" /> Previous
          </button>
          <div className="flex items-center gap-1">
            {Array.from({ length: table.getPageCount() }).map((_, index) => (
              <button
                // variant="outline"
                // size="sm"
                className={`${
                  table.getState().pagination.pageIndex === index
                    ? "bg-primary text-white"
                    : "text-primary"
                } w-6 h-6 rounded-full flex items-center justify-center pt-1`}
                key={index}
                onClick={() => table.setPageIndex(index)}
                disabled={table.getState().pagination.pageIndex === index}>
                {index + 1}
              </button>
            ))}
          </div>
          <button
            // variant="outline"
            // size="sm"
            onClick={() => table.nextPage()}
            className="flex items-center"
            disabled={!table.getCanNextPage()}>
            Next <IoIosArrowRoundForward className="size-6" />
          </button>
        </div>
      )}
      {/* Mobile view of the table in list format */}
      <div className="flex flex-col  lg:hidden divide-y divide-gray-300 ">
        {table.getRowModel().rows.map((row) => (
          <div
            key={row.id}
            className="flex items-center justify-between px-4 py-2  hover:bg-gray-100"
            onClick={() =>
              navigate(
                `/admin/directory/member/personal-information?id=${
                  (row.original as { _id: string })._id
                }`
              )
            }>
            {/* Profile */}
            <div className="flex items-center gap-4">
              <Avatar className="w-8 h-8 rounded-full">
                <AvatarImage
                  src={(row.original as { photo: string }).photo}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <AvatarFallback>
                  <RxAvatar className="w-8 h-8" />
                </AvatarFallback>
              </Avatar>
              {/* Name, email, phone */}
              <div key={row.id} className="text-sm text-muted-foreground">
                <div className="text-base items-center flex gap-2 font-azoSemiBold capitalize">
                  {(row.original as { fullName: string }).fullName}{" "}
                  {(row.original as { role: string }).role !== "Member" && (
                    <span className="text-primary text-xs">
                      ({(row.original as { role: string }).role})
                    </span>
                  )}
                </div>
                <div className="flex gap-4">
                  {(row.original as { phone: string }).phone}
                </div>
              </div>
            </div>
            <SlArrowRight />
          </div>
        ))}
        {/* Pagination for mobile view */}
        {table.getPageCount() > 1 && (
          <div className="flex items-center justify-center space-x-2 py-4  !border-t-0">
            <button
              className="flex items-center"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}>
              <IoIosArrowRoundBack className="size-6" /> Previous
            </button>
            <div className="flex items-center gap-1">
              {Array.from({ length: table.getPageCount() }).map((_, index) => (
                <button
                  // variant="outline"
                  // size="sm"
                  className={`${
                    table.getState().pagination.pageIndex === index
                      ? "bg-primary text-white"
                      : "text-primary"
                  } w-6 h-6 rounded-full flex items-center justify-center pt-1`}
                  key={index}
                  onClick={() => table.setPageIndex(index)}
                  disabled={table.getState().pagination.pageIndex === index}>
                  {index + 1}
                </button>
              ))}
            </div>
            <button
              // variant="outline"
              // size="sm"
              onClick={() => table.nextPage()}
              className="flex items-center"
              disabled={!table.getCanNextPage()}>
              Next <IoIosArrowRoundForward className="size-6" />
            </button>
          </div>
        )}
        <AddMemberBtn />
      </div>
    </>
  );
}

export default DataTable;
