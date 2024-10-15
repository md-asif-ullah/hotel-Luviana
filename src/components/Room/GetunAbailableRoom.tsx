import { ApiDataTypes } from "@/types";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";

interface Props {
  data: ApiDataTypes | null;
  date: DateRange | undefined;
}

function GetUnavailableRoom({ data, date }: Props) {
  const [unAvailableDate, setUnAvailableDate] = useState<ApiDataTypes[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUnavailableRooms = async () => {
      if (data) {
        try {
          const checkIn = format(date?.from || new Date(), "yyyy-MM-dd");
          const checkOut = format(date?.to || new Date(), "yyyy-MM-dd");

          const res = await fetch(
            `/api/rooms/available-room?roomId=${data._id}&checkIn=${checkIn}&checkOut=${checkOut}`
          );

          if (!res.ok) {
            throw new Error("Failed to fetch room availability");
          }

          const fetchData = await res.json();

          if (fetchData.success) {
            setUnAvailableDate(fetchData.payload);
          } else {
            setError("No available rooms found");
          }
        } catch (error) {
          setError((error as Error).message);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUnavailableRooms();
  }, [data, date]);

  return { unAvailableDate, loading, error };
}

export default GetUnavailableRoom;
