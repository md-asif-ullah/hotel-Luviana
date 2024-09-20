import { GiConfirmed, GiSandsOfTime } from "react-icons/gi";
import { ImCancelCircle } from "react-icons/im";
import { BookingCard } from "@/components/BookingCard";
import { IBookingType } from "@/types";

function BookingCardSection({ data }: { data: IBookingType[] }) {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
      <BookingCard
        iconColor="text-yellow-500"
        count={
          data.filter((booking: any) => booking.bookingStatus === "pending")
            .length
        }
        label="Pending bookings"
        icon={<GiSandsOfTime />}
      />
      <BookingCard
        count={
          data.filter((booking: any) => booking.bookingStatus === "confirmed")
            .length
        }
        label="Confirmed bookings"
        icon={<GiConfirmed />}
        iconColor="text-green-500"
      />
      <BookingCard
        count={
          data.filter((booking: any) => booking.bookingStatus === "cancelled")
            .length
        }
        label="Cancelled bookings"
        icon={<ImCancelCircle />}
        iconColor="text-red-500"
      />
      <BookingCard
        count={
          data.filter((booking: any) => booking.paymentStatus === "completed")
            .length
        }
        label="Completed bookings"
        icon={<GiConfirmed />}
        iconColor="text-green-500"
      />
    </section>
  );
}

export default BookingCardSection;
