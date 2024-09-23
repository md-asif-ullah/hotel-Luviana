"use client";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { IoIosSearch } from "react-icons/io";

import { useCallback, useEffect, useState } from "react";
import CustomerInfo from "@/components/customers/CustomersInfo";
import axios from "axios";
import { IUserType } from "@/types";
import Loading from "@/components/Loading";

type IUsersResponseTypes = {
  users: IUserType[];
  pagination: {
    totalPages: number;
    prevoiusPage: number | null;
    nextPage: number | null;
  };
};

function Customers() {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [data, setData] = useState<IUsersResponseTypes | undefined>(undefined);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const limit = 10;

  const getCustomers = useCallback(async () => {
    try {
      const res = await axios.get(
        `/api/users?search=${search}&page=${page}&limit=${limit}`
      );

      if (res.data.success) {
        setData(res.data.payload);
        setLoading(false);
      }
      if (!res.data.success) {
        setError("No data found");
        setLoading(false);
      }
    } catch (error: any) {
      setError("Something went wrong , please try again later");
      setLoading(false);
    }
  }, [page, search]);

  useEffect(() => {
    getCustomers();
  }, [getCustomers]);

  const totalPages = data?.pagination?.totalPages || 1;

  //pagination logic

  const pages = [...Array(totalPages).keys()].map((i) => i + 1);

  const handlePrevoiusPage = () => {
    if (page === 1) return;
    setPage(page - 1);
  };

  const handleNextPage = () => {
    if (page === totalPages) return;
    setPage(page + 1);
  };

  // loading and error handling
  if (isLoading || error) {
    return (
      <div className="h-screen w-full pt-20">
        {isLoading && <Loading />}
        {error && <p className="text-center text-red-500">{error}</p>}
      </div>
    );
  }

  return (
    <div className=" pb-20 min-h-screen pt-10 w-full">
      <div className="lg:px-6 px-4">
        <div className="border border-[#e2e8f0] text-2xl rounded-t-xl">
          <h2 className="text-start p-5">Customers List</h2>
        </div>

        <section className="border border-[#e2e8f0] text-2xl">
          <form className="max-w-80 md:ml-10 px-3 md:px-0 my-5 relative">
            <div className="absolute inset-y-0 left-0 flex items-center md:pl-3 pl-5 pointer-events-none">
              <IoIosSearch className="text-lg text-black dark:text-white" />
            </div>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="search"
              placeholder="Search..."
              className="block w-full py-3 pl-10 text-sm rounded-lg focus:outline-none dark:bg-[#020617] text-black dark:text-white border"
              required
            />
          </form>
        </section>
        <Table className="border border-[#e2e8f0]">
          <TableHeader>
            <TableRow className="dark:bg-[#0f172a] bg-[#f1f5f9]">
              <TableHead className="table-head">Name</TableHead>
              <TableHead className="table-head">Phone</TableHead>
              <TableHead className="table-head">Email</TableHead>
              <TableHead className="table-head">Account create</TableHead>
              <TableHead className="table-head">Edit User</TableHead>
              <TableHead className="table-head">Role</TableHead>
              <TableHead className="table-head">Status</TableHead>
              <TableHead className="table-head">Delete</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.users.map((user) => (
              <CustomerInfo
                key={user._id}
                user={user}
                getCustomers={getCustomers}
              />
            ))}
          </TableBody>
        </Table>
      </div>
      <Pagination className="flex justify-end mt-10 sm:pr-5 lg:pr-10">
        <PaginationContent className="flex items-center">
          <PaginationItem>
            <PaginationPrevious
              onClick={handlePrevoiusPage}
              className={page === 1 ? "text-gray-500 cursor-not-allowed" : ""}
            />
          </PaginationItem>
          {pages.map((pg) => (
            <PaginationItem key={pg}>
              <PaginationLink
                onClick={() => setPage(pg)}
                className={`hover:bg-primary2 ${
                  page === pg ? "bg-primary2 text-white" : ""
                }`}
              >
                {pg}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              onClick={handleNextPage}
              className={
                page === totalPages ? "text-gray-500 cursor-not-allowed" : ""
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

export default Customers;
