"use client";

import { addDays, differenceInDays, format, isBefore } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { cn, formateData } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useState } from "react";
import SecondaryButton from "../SecondaryButton";
import { Label } from "../ui/label";
import { ApiDataTypes } from "@/types";
import Link from "next/link";
import { TotalPriceAndTotalDays } from "@/helper/TotalPriceAndTotalDays";
import GetUnavailableRoom from "./GetunAbailableRoom";

interface BookingSectionProps {
  data: ApiDataTypes | null;
}

export default function BookingSection({ data }: BookingSectionProps) {
  const [error, setError] = useState<string | null>(null);
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 10),
  });

  // Get unavailable room

  const { unAvailableDate, loading } = GetUnavailableRoom({ data, date });

  const disablePreviousDates = (date: Date) => {
    return isBefore(date, new Date());
  };

  const fromDate = date?.from;
  const toDate = date?.to;

  useEffect(() => {
    if (!fromDate && !toDate) {
      setError("Please select check-in and check-out dates");
    } else if (fromDate && !toDate) {
      setError("Please select check-out date");
    } else {
      setError(null);
    }
  }, [fromDate, toDate]);

  const fromDateString = fromDate
    ? format(fromDate, "dd MMMM yyyy")
    : "Pick a date";
  const toDateString = toDate ? format(toDate, "dd MMMM yyyy") : "";

  const { totalPrice, totalDays } = TotalPriceAndTotalDays({
    price: data?.price ?? 0,
    fromDate: fromDate || new Date(),
    toDate: toDate || new Date(),
  });

  const newFormData = {
    checkIn: fromDateString,
    checkOut: toDateString,
    totalPrice: totalPrice,
    roomId: data?._id,
  };

  return (
    <div className="grid gap-6 sm:p-6 lg:p-8 bg-white sm:shadow-md rounded-lg border border-gray-200">
      <div>
        <Label className="text-lg text-gray-700">Select Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal text-gray-600 border-gray-300",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {fromDate ? (
                toDate ? (
                  <>
                    {fromDateString} - {toDateString}
                  </>
                ) : (
                  fromDateString
                )
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={fromDate}
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
              disabled={disablePreviousDates}
            />
          </PopoverContent>
        </Popover>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>

      {unAvailableDate?.length > 0 &&
        unAvailableDate.map((room: any) => (
          <div
            key={room.roomId}
            className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg"
          >
            <p className="text-red-600 font-semibold">
              This room is unavailable from
              <span className="font-bold p-1">{formateData(room.checkIn)}</span>
              to
              <span className="font-bold p-1">
                {formateData(room.checkOut)}
              </span>
              for the selected dates. Please select another date.
            </p>
          </div>
        ))}

      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <h3 className="text-xl font-medium text-gray-800">Total:</h3>
          <p className="text-2xl font-semibold text-primary">
            ${totalPrice || data?.price}
            <span className="text-sm font-normal text-gray-600">
              / per {totalDays || ""} night
            </span>
          </p>
        </div>

        <Link
          href={{
            pathname: "/booking-information",
            query: { newFormData: JSON.stringify(newFormData) },
          }}
        >
          <SecondaryButton
            text="Confirm Reservation"
            disabled={
              error ? true : false || loading || unAvailableDate.length > 0
            }
            className="w-full mt-4"
          />
        </Link>
      </div>
    </div>
  );
}
