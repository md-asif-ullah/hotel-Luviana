import { TableCell, TableRow } from "@/components/ui/table";
import { formateData } from "@/lib/utils";
import { IGetBookingTypes } from "@/types";
import Link from "next/link";
import { UpdateBookingStatus } from "../UpdateBookingStatus";
import Button from "../Button";

function BookingInfo({ booking }: { booking: IGetBookingTypes }) {
  const {
    _id,
    name,
    checkIn,
    checkOut,
    totalPrice,
    paymentStatus,
    bookingStatus,
    createdAt,
  } = booking;

  const formattedDate = formateData(createdAt);

  return (
    <TableRow className="bg-white border-b hover:bg-gray-50">
      <TableCell className="py-4 text-sm font-medium">
        <p className="whitespace-nowrap">{formattedDate}</p>
        <Link
          href={`/deshboard/booking-list/${_id}`}
          className="text-blue-500 mt-2 block"
        >
          <Button text="View Details" />
        </Link>
      </TableCell>
      <TableCell className="table-cell">{name}</TableCell>
      <TableCell className="table-cell">{checkIn}</TableCell>
      <TableCell className="table-cell">{checkOut}</TableCell>
      <TableCell className="table-cell">{paymentStatus}</TableCell>
      <TableCell className="table-cell">${totalPrice}</TableCell>
      <TableCell className="table-cell">
        <UpdateBookingStatus id={_id} bookingStatus={bookingStatus} />
      </TableCell>
    </TableRow>
  );
}

export default BookingInfo;
