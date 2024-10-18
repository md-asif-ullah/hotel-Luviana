import { formateData } from "@/lib/utils";
import { RoomTypes } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { MoreHorizontal } from "lucide-react";
import RoomsTableActions from "../RoomsTableActions";

function RoomsColumns({ getRooms }: { getRooms: () => Promise<void> }) {
  const columns: ColumnDef<RoomTypes>[] = [
    {
      accessorKey: "createdAt",
      header: "Created Date",
      cell: ({ row }) => {
        const date = row.getValue<string>("createdAt");
        const formattedDate = formateData(date);

        return <div>{formattedDate}</div>;
      },
    },
    {
      accessorKey: "roomName",
      header: "Room",
      cell: ({ row }) => {
        const roomName = row.original.roomName;
        const images = row.original.images;

        return (
          <div className="flex items-center space-x-4">
            <Image
              src={images[0]}
              alt={roomName}
              width={50}
              height={50}
              className="w-[50px] h-[50px] rounded-xl object-cover"
            />
            <h3 className="whitespace-nowrap font-medium text-md">
              {roomName}
            </h3>
          </div>
        );
      },
    },
    {
      accessorKey: "categories",
      header: "Categories",

      cell: ({ row }) => <div>{row.getValue("categories")}</div>,
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => {
        return <div>{row.getValue<string>("price")}</div>;
      },
    },

    {
      accessorKey: "adults",
      header: "Adults",
      cell: ({ row }) => {
        return <div>{row.getValue("adults")}</div>;
      },
    },
    {
      accessorKey: "children",
      header: "Children",
      cell: ({ row }) => {
        return <div>{row.getValue("children")}</div>;
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const room = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <RoomsTableActions id={room._id} getRooms={getRooms} />
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return columns;
}

export default RoomsColumns;
