"use client";

import PageLoading from "@/components/PageLoading";
import { IGetBookingTypes } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const BookingDetails = () => {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [isError, setError] = useState<string>("");
  const [booking, setBooking] = useState<IGetBookingTypes | null>(null);

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const fetchBooking = async () => {
        try {
          setLoading(true);
          const response = await fetch(`/api/booking/${id}`);
          const data = await response.json();

          if (data.success) {
            setBooking(data.payload);
          }
          if (!data.success) {
            setError(data.message);
          }
        } catch (error: any) {
          setError(error.message);
        } finally {
          setLoading(false);
          setError("");
        }
      };
      fetchBooking();
    }
  }, [id]);

  if (isLoading || isError) {
    return <PageLoading isLoading={isLoading} error={isError} />;
  }

  if (!booking) {
    return (
      <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg">
        <h1 className="text-3xl font-extrabold text-gray-800 text-center">
          No booking found
        </h1>
      </div>
    );
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
        <Link href="/deshboard/booking-list">
          <button className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-300">
            Back to Booking History
          </button>
        </Link>
      </div>
    </div>
  );
};

export default BookingDetails;
