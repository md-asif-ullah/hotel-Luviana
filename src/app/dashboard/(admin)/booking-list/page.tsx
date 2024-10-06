import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import BookingInfo from "@/components/bookings/BookingInfo";
import GetBooking from "@/components/bookings/GetBooking";
import BookingCardSection from "@/components/BookingCardSection";
import { IGetBookingTypes } from "@/types";

async function BookingsList() {
  const data = await GetBooking();

  if (!data) {
    return (
      <div className="min-h-screen h-full bg-white p-6 md:p-8 flex items-center justify-center">
        <h1 className="text-2xl font-bold text-black">No Bookings Found</h1>
      </div>
    );
  }

  return (
    <div className="h-full pb-20 pt-14 xl:px-8 px-4 w-full">
      <h1 className="md:text-3xl text-2xl font-semibold text-black">
        Bookings History
      </h1>
      <main className="pt-10">
        {/* Appointment Cards Section */}
        <BookingCardSection data={data.payload} />

        {/* Bookings Table Section */}
        <section className="border border-[#e2e8f0] rounded-xl overflow-auto mt-14">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="table-head">Date</TableHead>
                <TableHead className="table-head">Customer Name</TableHead>
                <TableHead className="table-head">Check-In</TableHead>
                <TableHead className="table-head">Check-Out</TableHead>
                <TableHead className="table-head">Payment Status</TableHead>
                <TableHead className="table-head">Total Price</TableHead>
                <TableHead className="flex flex-col justify-center items-center">
                  Action <span>Booking Status</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.payload?.map((booking: IGetBookingTypes) => (
                <BookingInfo key={booking._id} booking={booking} />
              ))}
            </TableBody>
          </Table>
        </section>
      </main>
    </div>
  );
}

export default BookingsList;
