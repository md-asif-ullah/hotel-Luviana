import { ApiResponseTypes } from "@/types";

async function GetRooms() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(`${apiUrl}/api/rooms`, {
      next: { revalidate: 86400 },
    });
    if (!res.ok) {
      throw new Error("Error fetching data");
    }
    const data: ApiResponseTypes = await res.json();
    if (data.success) {
      return data.payload;
    }
  } catch (error: any) {
    console.log(error.message);
    return null;
  }
}

export default GetRooms;
