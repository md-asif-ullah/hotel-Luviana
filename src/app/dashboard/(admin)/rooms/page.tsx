"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { IPaginationTypes, RoomTypes } from "@/types";
import { formateData } from "@/lib/utils";
import PageLoadingAnimation from "@/components/PageLoadingAnimation";
import DataTable from "@/components/DataTable";
import ErrorPage from "@/components/ErrorPage";
import RoomsTableActions from "@/components/RoomsTableActions";
import Image from "next/image";

interface IRoomResponseTypes {
  rooms: RoomTypes[];
  pagination: IPaginationTypes;
}

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
          <h3 className="whitespace-nowrap font-medium text-md">{roomName}</h3>
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
            <RoomsTableActions id={room._id} />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

function Rooms() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [page, setPage] = React.useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [data, setData] = useState<IRoomResponseTypes | undefined>(undefined);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const getCustomers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `/api/rooms?search=${search}&page=${page}&limit=10`
      );

      if (res.data.success) {
        setData(res.data.payload);
      }
    } catch (error: any) {
      setError(error.response.data.message);
    } finally {
      setLoading(false);
      setError("");
    }
  }, [page, search]);

  useEffect(() => {
    const debounceSearch = setTimeout(() => {
      getCustomers();
    }, 1000);

    return () => clearTimeout(debounceSearch);
  }, [search, page, getCustomers]);

  const table = useReactTable({
    data: data?.rooms ?? [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  if (isLoading) {
    return <PageLoadingAnimation />;
  }

  if (!data) {
    return <ErrorPage text={error} />;
  }

  return (
    <div className="pb-20 min-h-screen pt-10 w-full h-full bg-white px-6">
      <h2 className="text-start font-semibold text-2xl md:text-3xl">Rooms</h2>
      <DataTable
        table={table}
        page={page}
        setPage={setPage}
        search={search}
        setSearch={setSearch}
        paginationData={data?.pagination}
      />
    </div>
  );
}

export default Rooms;
