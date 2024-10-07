import { RoomResponseTypes } from "@/types";

async function GetRoom({ params }: { params: { id: string } }) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const res = await fetch(`${apiUrl}/api/rooms/${params.id}`, {
      cache: "no-cache",
    });
    if (!res.ok) {
      throw new Error("Error fetching data");
    }
    const data: RoomResponseTypes = await res.json();
    if (data.success) {
      return data.payload;
    }
  } catch (error: any) {
    console.log(error.message);
    return null;
  }
}

export default GetRoom;
