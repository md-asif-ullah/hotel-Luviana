"use client";

import ErrorPage from "@/components/ErrorPage";
import GetUserReviews from "@/components/GetUserReviews";
import { useAuth } from "@/components/hooks/useAuth";
import PageLoadingAnimation from "@/components/PageLoadingAnimation";
import AddReview from "@/components/Room/AddReview";
import { cn } from "@/lib/utils";
import { IGetBookingTypes } from "@/types";
import axios from "axios";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

function Booking() {
  const [data, setData] = useState<IGetBookingTypes[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useAuth();
  const userReviews = GetUserReviews();

  const fetchBooking = useCallback(async () => {
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
  }, [user]);

  useEffect(() => {
    if (user?._id) {
      fetchBooking();
    }
  }, [user, fetchBooking]);

  if (loading) {
    return <PageLoadingAnimation />;
  }

  if (!data) {
    return <ErrorPage text="No Booking Found" />;
  }

  return (
    <div className="min-h-screen h-full bg-white  p-6 md:p-8 space-y-10 pb-20">
      {data.map((booking: IGetBookingTypes) => (
        <div
          key={booking._id}
          className="bg-gray-50 p-6 rounded-lg shadow-lg space-y-6 transition-all"
        >
          <h1 className="md:text-2xl text-xl font-bold text-black">
            Booking ID:
            <span className="text-[#0a2370] ml-2">{booking.bookingId}</span>
          </h1>

          <div className="flex md:space-x-10 space-x-2">
            <button
              className={cn(
                "text-lg px-2 py-1 border inline-block mb-4 rounded-md",
                {
                  "text-yellow-500 border-yellow-500":
                    booking.bookingStatus === "pending",
                  "text-blue-500 border-blue-500":
                    booking.bookingStatus === "confirmed",
                  "text-red-500 border-red-500":
                    booking.bookingStatus === "cancelled",
                  "text-green-500 border-green-500":
                    booking.bookingStatus === "completed",
                }
              )}
            >
              {booking.bookingStatus}
            </button>

            {booking.bookingStatus === "completed" &&
              (userReviews?.some(
                (review) => review.bookingId === booking._id
              ) ? (
                ""
              ) : (
                <AddReview roomId={booking.roomId} bookingId={booking._id} />
              ))}
          </div>

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
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Booking;
