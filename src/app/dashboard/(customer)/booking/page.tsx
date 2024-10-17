import { Metadata } from "next";
import UserBooking from "./UserBookings";

export const metadata: Metadata = {
  title: "Bookings | Hotel Luviana",
};
function page() {
  return <UserBooking />;
}

export default page;
