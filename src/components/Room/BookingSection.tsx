"use client";

import { addDays, differenceInDays, format, isBefore } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChangeEvent, useEffect, useState } from "react";
import SecondaryButton from "../SecondaryButton";
import { Label } from "../ui/label";
import { ApiDataTypes } from "@/types";
import Link from "next/link";

export default function BookingSection({
  data,
}: {
  data: ApiDataTypes | null;
}) {
  const [roomQuantity, setRoomQuantity] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 9),
  });

  const disablePreviousDates = (date: Date) => {
    return isBefore(date, new Date());
  };

  const fromDate = date?.from;
  const toDate = date?.to;

  useEffect(() => {
    if (!fromDate && !toDate) {
      setError("please select check-in and check-out dates");
    } else if (fromDate && !toDate) {
      setError("please select check-out date");
    } else {
      setError(null);
    }
  }, [fromDate, toDate]);

  // check if the user has selected the dates

  const fromDateString = fromDate
    ? format(fromDate, "dd MMMM yyyy")
    : "Pick a date";
  const toDateString = toDate ? format(toDate, "dd MMMM yyyy") : "";

  const totalDays =
    fromDate && toDate ? differenceInDays(toDate, fromDate) + 1 : 0;

  // count the total price

  const totalPrice = (totalDays * (data?.price ?? 0) * roomQuantity).toFixed(2);

  // create an array of numbers from

  const array = Array.from(
    { length: data?.quantity ?? 0 },
    (_, index) => index
  );

  // create new form data

  const newFormData = {
    checkIn: fromDateString,
    checkOut: toDateString,
    totalPrice: totalPrice,
    roomQuantity: roomQuantity,
    roomId: data?._id,
  };

  return (
    <div className="grid gap-6 sm:p-4 lg:p-8 bg-white sm:shadow-xl rounded-lg">
      <div>
        <Label className="text-lg text-[#818186]">Select date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal text-[#818186] border-[#e4e4e4]",
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

      <div className="space-y-4">
        <div className="flex flex-wrap">
          <div className="flex items-center space-x-4">
            <span className="text-[#818186]">Reserve</span>
            <select
              onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                setRoomQuantity(Number(event.target.value))
              }
              name="cars"
              className="py-1 px-2 border border-primary2"
            >
              {array.map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
            <span className="text-gray-500">of {data?.quantity} available</span>
          </div>
          <p className="mt-1 text-gray-500">accommodations</p>
        </div>
        <div className="flex items-center space-x-1">
          <h3 className="text-xl">Total :</h3>
          <p className="text-gray-700 text-2xl font-semibold">
            ${totalPrice || data?.price}
            <span className="text-sm font-normal">
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
          <SecondaryButton text="CONFIRM RESERVATION" className="w-full mt-4" />
        </Link>
      </div>
    </div>
  );
}
