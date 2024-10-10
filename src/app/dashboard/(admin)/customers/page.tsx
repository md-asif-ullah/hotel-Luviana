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
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { IPaginationTypes, IUserType } from "@/types";
import Link from "next/link";
import { formateData } from "@/lib/utils";
import PageLoadingAnimation from "@/components/PageLoadingAnimation";
import DataTable from "@/components/DataTable";
import ErrorPage from "@/components/ErrorPage";

type IUsersResponseTypes = {
  users: IUserType[];
  pagination: IPaginationTypes;
};

export const columns: ColumnDef<IUserType>[] = [
  {
    accessorKey: "createdAt",
    header: () => <div>Create</div>,
    cell: ({ row }) => {
      const date = row.getValue<string>("createdAt");
      const formattedDate = formateData(date);

      return <div className="text-right font-medium">{formattedDate}</div>;
    },
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className="capitalize text-nowrap">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone",
    cell: ({ row }) => {
      const phoneNumber = row.getValue<string>("phoneNumber");
      return (
        <div className="capitalize">
          {phoneNumber ? phoneNumber : "No phone number"}
        </div>
      );
    },
  },

  {
    accessorKey: "isAdmin",
    header: "Role",
    cell: ({ row }) => {
      const isAdmin = row.getValue("isAdmin");
      return <div className="capitalize">{isAdmin ? "admin" : "user"}</div>;
    },
  },
  {
    accessorKey: "isBanned",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("isBanned");
      return (
        <div
          className={`capitalize ${status ? "text-red-500" : "text-green-500"}`}
        >
          {status ? "banned" : "active"}
        </div>
      );
    },
  },
  {
    accessorKey: "isVerified",
    header: "Verified",
    cell: ({ row }) => {
      const isVerified = row.getValue("isVerified");
      return (
        <div
          className={`capitalize ${
            isVerified ? "text-green-500" : "text-red-500"
          }`}
        >
          {isVerified ? "verified" : "unverified"}
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const user = row.original;

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
            <DropdownMenuItem>
              <Link href={`/dashboard/customers/${user._id}`}>Edit</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function Customers() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [page, setPage] = React.useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [data, setData] = useState<IUsersResponseTypes | undefined>(undefined);
  const [isLoading, setLoading] = useState<boolean>(true);

  const getCustomers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `/api/users?search=${search}&page=${page}&limit=10`
      );

      if (res.data.success) {
        setData(res.data.payload);
        setLoading(false);
      }
    } catch (error: any) {
      setLoading(false);
    }
  }, [page, search]);

  useEffect(() => {
    const debounceSearch = setTimeout(() => {
      getCustomers();
    }, 500);

    return () => clearTimeout(debounceSearch);
  }, [search, page, getCustomers]);

  const table = useReactTable({
    data: data?.users ?? [],
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
    return <ErrorPage text="Something went wrong" />;
  }

  return (
    <DataTable
      header="Customers List"
      table={table}
      page={page}
      setPage={setPage}
      search={search}
      setSearch={setSearch}
      paginationData={data?.pagination}
    />
  );
}

export default Customers;
