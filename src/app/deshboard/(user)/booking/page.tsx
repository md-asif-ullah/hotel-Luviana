"use client";

import { useAuth } from "@/components/hooks/useAuth";
import PageLoading from "@/components/PageLoading";
import { cn } from "@/lib/utils";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

function Booking() {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useAuth();

  useEffect(() => {
    const fetchBooking = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/user-booking/${user?._id}`);

        if (res.data.success) {
          setData(res.data.payload);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    if (user?._id) {
      fetchBooking();
    }
  }, [user]);

  if (loading) {
    return <PageLoading isLoading={loading} error="" />;
  }

  return (
    <div className="min-h-screen h-full bg-white  p-6 md:p-8 space-y-10 pb-20">
      {data && data.length > 0 ? (
        data.map((booking: any) => (
          <div
            key={booking._id}
            className="bg-gray-50 p-6 rounded-lg shadow-lg space-y-6 transition-all hover:shadow-xl"
          >
            <h1 className="md:text-2xl text-xl font-bold text-black">
              Booking ID:
              <span className="text-[#f58220] ml-2">{booking.bookingId}</span>
            </h1>

            <button
              className={cn("text-lg px-2 py-1 border inline-block mb-4 ", {
                "text-yellow-500 border-yellow-500":
                  booking.bookingStatus === "pending",
                "text-blue-500 border-blue-500":
                  booking.bookingStatus === "confirmed",
                "text-red-500 border-red-500":
                  booking.bookingStatus === "cancelled",
                "text-green-500 border-green-500":
                  booking.bookingStatus === "completed",
              })}
            >
              {booking.bookingStatus}
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              <div className="flex items-center space-x-4">
                {booking.roomImages.map((img: any, index: number) => (
                  <div key={index} className="relative w-16 h-16">
                    <Image
                      src={img}
                      alt="room image"
                      className="rounded-lg shadow-md object-cover"
                      height={64}
                      width={64}
                    />
                  </div>
                ))}
              </div>
              <div className="space-y-1">
                <h2 className="text-xl font-semibold text-black">
                  Room Name:
                  <span className="text-gray-800"> {booking.roomName}</span>
                </h2>
                <p className="text-lg text-black">
                  Price:
                  <span className="text-gray-600"> ${booking.totalPrice}</span>
                </p>
                <p className="text-sm text-black">
                  Quantity:
                  <span className="text-gray-500">{booking.roomQuantity}</span>
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-xl text-center text-gray-500">No bookings found.</p>
      )}
    </div>
  );
}

export default Booking;