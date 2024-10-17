import BookingInformationForm from "@/components/forms/BookingInformationForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Booking Information",
};

function BookingInformation() {
  return <BookingInformationForm />;
}

export default BookingInformation;
