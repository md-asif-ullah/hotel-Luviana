import { GetBooking } from "@/components/booking-list/GetBooking";
import ErrorPage from "@/components/ErrorPage";
import SecondaryButton from "@/components/SecondaryButton";
import Image from "next/image";
import Link from "next/link";

const BookingDetails = async ({ params }: { params: { id: string } }) => {
  const booking = await GetBooking(params.id);

  if (!booking) {
    return <ErrorPage text="Booking not found" />;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      {/* Booking Details Header */}
      <h1 className="text-3xl font-extrabold text-gray-800 mb-6 border-b pb-3">
        Booking Details
      </h1>

      {/* Booking Information Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {/* Customer Information */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
          <h2 className="text-xl font-semibold text-blue-600 mb-4">
            Customer Information
          </h2>
          <p className="text-gray-700">
            <strong className="font-medium text-gray-900 mr-2">Name:</strong>
            {booking.name}
          </p>
          <p className="text-gray-700">
            <strong className="font-medium text-gray-900 mr-2">Email:</strong>
            {booking.email}
          </p>
          <p className="text-gray-700">
            <strong className="font-medium text-gray-900 mr-2">Phone:</strong>
            {booking.phoneNumber}
          </p>
        </div>

        {/* Booking Information */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
          <h2 className="text-xl font-semibold text-blue-600 mb-4">
            Booking Information
          </h2>
          <p className="text-gray-700">
            <strong className="font-medium text-gray-900 mr-2">
              Booking ID:
            </strong>
            {booking.bookingId}
          </p>
          <p className="text-gray-700">
            <strong className="font-medium text-gray-900 mr-2">
              Room Name:
            </strong>
            {booking.roomName}
          </p>
          <p className="text-gray-700">
            <strong className="font-medium text-gray-900 mr-2">
              Check-in Date:
            </strong>
            {new Date(booking.checkIn).toLocaleDateString()}
          </p>
          <p className="text-gray-700">
            <strong className="font-medium text-gray-900 mr-2">
              Check-out Date:
            </strong>
            {new Date(booking.checkOut).toLocaleDateString()}
          </p>
          <p className="text-gray-700">
            <strong className="font-medium text-gray-900 mr-2">
              Total Amount:
            </strong>
            ${booking.totalPrice}
          </p>
        </div>
      </div>

      {/* Room Images */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-blue-600 mb-4">
          Room Images
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {booking.roomImages && booking.roomImages.length > 0 ? (
            booking.roomImages.map((image: any, index: any) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-lg shadow-md"
              >
                <Image
                  src={image}
                  alt={`Room image ${index + 1}`}
                  priority
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover hover:scale-110 transform transition-transform duration-300 ease-in-out"
                />
              </div>
            ))
          ) : (
            <p className="text-gray-500">No images available for this room.</p>
          )}
        </div>
      </div>

      {/* Additional Information */}
      <div className="mt-8 bg-blue-50 p-6 rounded-lg shadow-inner">
        <h2 className="text-xl font-semibold text-blue-600 mb-4">
          Additional Information
        </h2>
        <p className="text-gray-700">
          <strong className="font-medium text-gray-900 mr-2">
            Payment Status:
          </strong>
          <span>{booking.paymentStatus}</span>
        </p>
        <p className="text-gray-700 mt-1">
          <strong className="font-medium text-gray-900 mr-2">
            Booking Status:
          </strong>
          {booking.bookingStatus}
        </p>
      </div>

      {/* Back Button */}
      <div className="mt-6 text-right">
        <Link href="/dashboard/booking-list">
          <SecondaryButton
            text="Back"
            className="rounded-md md:px-5 md:py-1 px-5 py-3 bg-[#0a2370] hover:bg-primary2 "
          />
        </Link>
      </div>
    </div>
  );
};

export default BookingDetails;
