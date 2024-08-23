async function useGetRooms() {
  try {
    const res = await fetch("http://localhost:3000/api/rooms", {
      next: { revalidate: 7200 },
    });
    const data = await res.json();
    return data;
  } catch (error: any) {
    console.log(error.message);
    return null;
  }
}

export default useGetRooms;
