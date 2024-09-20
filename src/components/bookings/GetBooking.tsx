async function GetBooking() {
  try {
    const res = await fetch("http://localhost:3000/api/booking", {
      cache: "no-cache",
    });
    if (!res.ok) {
      throw new Error("Error fetching data");
    }
    const data = await res.json();
    return data;
  } catch (error: any) {
    console.log(error.message);
    return null;
  }
}

export default GetBooking;
