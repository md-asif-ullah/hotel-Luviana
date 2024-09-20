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

async function Bookings() {
  const data = await GetBooking();

  return (
    <div className="h-full pb-20 pt-14 xl:px-8 px-4 w-full">
      <h1 className="md:text-3xl text-2xl font-semibold text-black">
        Bookings History
      </h1>
      <main className="lg:mr-[260px] xl:mr-0 pt-10">
        {/* Appointment Cards Section */}
        <BookingCardSection data={data.payload} />

        {/* Bookings Table Section */}
        <section className="border border-[#e2e8f0] rounded-xl overflow-auto mt-14">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Room Name</TableHead>
                <TableHead>Email Address</TableHead>
                <TableHead>Check-In</TableHead>
                <TableHead>Check-Out</TableHead>
                <TableHead>Payment Status</TableHead>
                <TableHead>Total Price</TableHead>
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

export default Bookings;
