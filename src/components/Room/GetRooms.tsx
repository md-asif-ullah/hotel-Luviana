async function GetRooms() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(`${apiUrl}/api/rooms`, {
      cache: "no-cache",
    });
    if (!res.ok) {
      throw new Error("Error fetching data");
    }
    const data = await res.json();
    if (data.success) {
      return data;
    }
  } catch (error: any) {
    console.log(error.message);
    return null;
  }
}

export default GetRooms;
