import { TableCell, TableRow } from "@/components/ui/table";
import { formateData } from "@/lib/utils";
import { IGetBookingTypes } from "@/types";
import Link from "next/link";

function BookingInfo({ booking }: { booking: IGetBookingTypes }) {
  const {
    _id,
    roomName,
    email,
    checkIn,
    checkOut,
    totalPrice,
    paymentStatus,
    createdAt,
  } = booking;

  const formattedDate = formateData(createdAt);

  return (
    <TableRow className="bg-white border-b hover:bg-gray-50">
      <TableCell className="py-4 text-sm font-medium">
        <p className="whitespace-nowrap">{formattedDate}</p>
        <Link
          href={`/dashboard/booking-details/${_id}`}
          className="text-blue-500 mt-2 block"
        >
          View Details
        </Link>
      </TableCell>
      <TableCell className="table-cell">{roomName}</TableCell>
      <TableCell className="table-cell">{email}</TableCell>
      <TableCell className="table-cell">{checkIn}</TableCell>
      <TableCell className="table-cell">{checkOut}</TableCell>
      <TableCell className="table-cell">{paymentStatus}</TableCell>
      <TableCell className="table-cell">${totalPrice}</TableCell>
    </TableRow>
  );
}

export default BookingInfo;
