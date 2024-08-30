async function useGetRooms() {
  try {
    const res = await fetch("http://localhost:3000/api/get-rooms", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        revalidate: 300,
      },
    });
    const data = await res.json();
    return data;
  } catch (error: any) {
    console.log(error.message);
    return null;
  }
}

export default useGetRooms;
