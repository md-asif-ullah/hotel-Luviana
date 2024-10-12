import { GiConfirmed, GiSandsOfTime } from "react-icons/gi";
import { ImCancelCircle } from "react-icons/im";
import { BookingCard } from "@/components/BookingCard";

type BookingCardProps = {
  bookingStatus: { bookingStatus: string }[];
};

function BookingCardSection({ bookingStatus }: BookingCardProps) {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
      {/* Pending bookings */}
      <BookingCard
        count={
          bookingStatus.filter((status) => status.bookingStatus === "pending")
            .length
        }
        label="Pending bookings"
        icon={<GiSandsOfTime />}
      />
      {/* Confirmed bookings */}
      <BookingCard
        count={
          bookingStatus.filter((status) => status.bookingStatus === "confirmed")
            .length
        }
        label="Confirmed bookings"
        icon={<GiConfirmed />}
      />
      {/* Cancelled bookings */}
      <BookingCard
        count={
          bookingStatus.filter((status) => status.bookingStatus === "cancelled")
            .length
        }
        label="Cancelled bookings"
        icon={<ImCancelCircle />}
      />
      {/* Completed bookings */}
      <BookingCard
        count={
          bookingStatus.filter((status) => status.bookingStatus === "completed")
            .length
        }
        label="Completed bookings"
        icon={<GiConfirmed />}
      />
    </section>
  );
}

export default BookingCardSection;
