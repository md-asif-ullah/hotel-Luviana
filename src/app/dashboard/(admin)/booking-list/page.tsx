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
import { Button } from "@/components/ui/button";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { IGetBookingTypes, IPaginationTypes } from "@/types";
import Link from "next/link";
import { formateData } from "@/lib/utils";
import PageLoadingAnimation from "@/components/PageLoadingAnimation";
import DataTable from "@/components/DataTable";
import ErrorPage from "@/components/ErrorPage";
import { UpdateBookingStatus } from "@/components/UpdateBookingStatus";
import BookingCardSection from "@/components/BookingCardSection";

function BookingsList() {
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
  const [error, setError] = useState<string>("");

  type IUsersResponseTypes = {
    bookingData: IGetBookingTypes[];
    pagination: IPaginationTypes;
  };

  const columns: ColumnDef<IGetBookingTypes>[] = [
    {
      accessorKey: "createdAt",
      header: () => <div>Create</div>,
      cell: ({ row }) => {
        const date = row.getValue<string>("createdAt");
        const formattedDate = formateData(date);

        return <div className="font-medium text-nowrap">{formattedDate}</div>;
      },
    },
    {
      accessorKey: "name",
      header: "User Name",
      cell: ({ row }) => (
        <div className="capitalize text-nowrap">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "checkIn",
      header: "Check-In",
      cell: ({ row }) => (
        <div className="capitalize text-nowrap">{row.getValue("checkIn")}</div>
      ),
    },
    {
      accessorKey: "checkOut",
      header: "Check-Out",
      cell: ({ row }) => (
        <div className="capitalize text-nowrap">{row.getValue("checkOut")}</div>
      ),
    },
    {
      accessorKey: "paymentStatus",
      header: "Payment Status",
      cell: ({ row }) => (
        <div className="capitalize text-center">
          {row.getValue("paymentStatus")}
        </div>
      ),
    },
    {
      accessorKey: "totalPrice",
      header: "Total Price",
      cell: ({ row }) => (
        <div className="capitalize text-nowrap text-center">
          {row.getValue("totalPrice")}
        </div>
      ),
    },

    {
      id: "actions",
      header: "Actions",
      enableHiding: false,
      cell: ({ row }) => {
        <div className="capitalize text-center">{row.getValue("actions")}</div>;
        const Bookinginfo = row.original;
        const { _id, bookingStatus } = Bookinginfo;

        return (
          <div className="flex justify-center items-center space-x-2 bg-gray-100">
            <UpdateBookingStatus
              id={_id}
              bookingStatus={bookingStatus}
              getCustomers={getCustomers}
            />
            <Link
              href={`/dashboard/booking-list/${_id}`}
              className="text-blue-600 hover:text-blue-800 font-semibold mt-2 block"
            >
              <Button className="bg-blue-500 mb-2 text-white rounded-md hover:bg-blue-700 duration-300">
                Details
              </Button>
            </Link>
          </div>
        );
      },
    },
  ];

  const getCustomers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `/api/booking?search=${search}&page=${page}&limit=10`
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

  console.log(data);

  const table = useReactTable({
    data: data?.bookingData ?? [],
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
    <div className="pb-20 min-h-screen pt-10 w-full h-full bg-white px-6 space-y-7">
      <h2 className="text-start font-semibold text-2xl md:text-3xl">
        Customers List
      </h2>

      <BookingCardSection data={data.bookingData} />
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

export default BookingsList;
