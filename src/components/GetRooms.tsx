async function GetRooms() {
  try {
    const res = await fetch("http://localhost:3000/api/rooms", {
      cache: "no-cache",
    });
    const data = await res.json();
    return data;
  } catch (error: any) {
    console.log(error.message);
    return [];
  }
}

export default GetRooms;
