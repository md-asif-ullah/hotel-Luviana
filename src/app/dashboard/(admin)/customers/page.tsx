"use client";

import * as React from "react";
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { IPaginationTypes, IUserType } from "@/types";
import PageLoadingAnimation from "@/components/PageLoadingAnimation";
import DataTable from "@/components/DataTable";
import ErrorPage from "@/components/ErrorPage";
import CustomersColumns from "@/components/TableColumns/CustomersColumns";

interface IUsersResponseTypes {
  users: IUserType[];
  pagination: IPaginationTypes;
}

function Customers() {
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

  const getCustomers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `/api/users?search=${search}&page=${page}&limit=10`
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

  // Columns for the table

  const columns = CustomersColumns();

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
    return <ErrorPage text={error} />;
  }

  return (
    <div className="pb-20 min-h-screen pt-10 w-full h-full bg-white px-6">
      <h2 className="text-start font-semibold text-2xl md:text-3xl">
        Customers List
      </h2>
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

export default Customers;
