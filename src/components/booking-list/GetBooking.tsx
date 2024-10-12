export async function GetBooking(id: string) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(`${apiUrl}/api/booking/${id}`);
    if (!res.ok) {
      throw new Error("Error fetching data");
    }
    const data = await res.json();
    return data.payload;
  } catch (error: any) {
    console.log(error.message);
    return null;
  }
}
