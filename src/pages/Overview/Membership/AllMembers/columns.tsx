import { ColumnDef } from "@tanstack/react-table";

import { Member } from "./members";
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/Avatar";
import { RxAvatar } from "react-icons/rx";
import ViewMore from "./Viewmore";

export const columns: ColumnDef<Member>[] = [
  {
    header: "",
    accessorKey: "photo",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        <Avatar className="w-8 h-8 rounded-full">
          <AvatarImage
            src={(row.original as { photo: string }).photo}
            className="w-8 h-8 rounded-full object-cover"
          />
          <AvatarFallback>
            <RxAvatar className="w-8 h-8" />
          </AvatarFallback>
        </Avatar>
      </div>
    ),
  },
  {
    header: "Name",
    accessorKey: "fullName",
    cell: ({ row }) => (
      <div className="capitalize flex items-center gap-x-2">
        <p>
          {row.original?.firstName} {row.original?.lastName ?? ""}
        </p>
      </div>
    ),
  },
  {
    header: "Email",
    accessorKey: "email",
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    header: "Phone",
    accessorKey: "phone",
  },
  {
    header: "Gender",
    accessorKey: "gender",
  },
  {
    header: "Role",
    accessorKey: "role",
    cell: ({ row }) => <div className="capitalize">{row.getValue("role")}</div>,
  },
  {
    header: "Date of Birth",
    accessorKey: "dateOfBirth",
    cell: ({ row }) => (
      // Format the date of birth to 10 Jan 2022
      <div>
        {new Date(row.getValue("dateOfBirth")).toDateString().slice(4, 15)}
      </div>
    ),
  },
  {
    header: "",
    accessorKey: "action",
    cell: ({ row }) => {
      return <ViewMore id={row.original._id} />;
    },
  },
];
