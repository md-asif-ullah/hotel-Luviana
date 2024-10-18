import { Button } from "@/components/ui/button";
import { UpdateBookingStatus } from "@/components/UpdateBookingStatus";
import Link from "next/link";
import { formateData } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { IGetBookingTypes } from "@/types";

function BookingListColumns({
  getBookings,
}: {
  getBookings: () => Promise<void>;
}) {
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
      cell: ({ row }) => {
        const checkIn = row.getValue("checkIn");
        return (
          <div className="capitalize text-nowrap">
            {formateData(checkIn as string)}
          </div>
        );
      },
    },
    {
      accessorKey: "checkOut",
      header: "Check-Out",
      cell: ({ row }) => {
        const checkOut = row.getValue("checkOut");
        return (
          <div className="capitalize text-nowrap">
            {formateData(checkOut as string)}
          </div>
        );
      },
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
      header: () => <div className="text-center">Actions</div>,
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
              getBookings={getBookings}
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

  return columns;
}

export default BookingListColumns;
