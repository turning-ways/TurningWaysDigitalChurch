/* eslint-disable @typescript-eslint/no-explicit-any */
// import {
//   FaClockRotateLeft,
//   FaCommentSms,
//   FaRegCreditCard,
//   FaRegEnvelope,
// } from "react-icons/fa6";
// import { useNavigate } from "react-router-dom";
// import { CiExport, , CiImport, CiMail } from "react-icons/ci";
import { CiFilter } from "react-icons/ci";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/ui/DropDownMenu/DropDown";
import { useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { Table } from "@tanstack/react-table";

interface QuickActionsProps {
  display?: string;
  table: Table<any>; // Replace TData with a valid type or use 'any' if not needed
}

const QuickActions: React.FC<QuickActionsProps> = ({ display, table }) => {
  const [position, setPosition] = useState("");
  //   const items = [
  //     { name: "Filter", icon: <CiFilter />, action: handleFilter },
  //     {
  //       name: "Send Bulk Message",
  //       icon: <CiMail />,
  //       action: () => console.log("Send Bulk Message"),
  //     },
  //     {
  //       name: "Export Data",
  //       icon: <CiExport />,
  //       action: () => console.log("Export Data"),
  //     },
  //     {
  //       name: "Import Data",
  //       icon: <CiImport />,
  //       action: () => console.log("Import Data"),
  //     },
  //   ];

  //   function handleFilter(filter?: string) {
  //     // Implement filter logic here
  //     console.log("Filter action triggered");
  //   }

  return (
    <>
      <div
        className={`flex justify-between mt-6 mb-4 lg:my-10 flex-col space-y-1 lg:flex-row lg:space-y-0 ${display}`}>
        <p className="lg:text-lg text-[#7F7E7E] text-base">
          {table.getFilteredRowModel().rows.length} Members
        </p>
        <ul className="flex md:space-x-6 text-[18px] text-[#8A8989] overflow-x-scroll scrollbar-hide">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <li
                className={`flex items-center space-x-1  cursor-pointer hover:text-[#555555] whitespace-nowrap`}>
                <CiFilter />
                <p className="pt-1">Filter</p>
              </li>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 bg-white">
              <DropdownMenuLabel>Filter By</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={position}
                onValueChange={setPosition}>
                {table.getAllColumns().map((column: any) => {
                  if (
                    column.id === "action" ||
                    column.id === "photo" ||
                    column.id === "phone"
                  ) {
                    return null;
                  }
                  return (
                    // When selected it filter the table by the column
                    <DropdownMenuRadioItem
                      key={column.id}
                      value={column.id}
                      className="capitalize"
                      onClick={() => column.toggleSorting(false)}>
                      {column.id === "fullName" ? "Name" : column.id}
                    </DropdownMenuRadioItem>
                  );
                })}
              </DropdownMenuRadioGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  table.resetSorting();
                  setPosition("");
                }}>
                <button className="flex items-center bg-primary text-white hover:bg-primaryDark w-full justify-center rounded py-1">
                  Clear Filter
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="ml-auto flex items-center">
                Columns <BsChevronDown className="ml-2 h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 bg-white">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }>
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </ul>
      </div>
    </>
  );
};

export default QuickActions;
