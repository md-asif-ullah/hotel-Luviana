import GetRooms from "@/components/GetRooms";
import RoomsTableBody from "@/components/RoomsTableBody";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

async function Rooms() {
  const AllRooms = await GetRooms();

  return (
    <div className=" pb-20 min-h-screen pt-10 w-full">
      <div className="lg:px-6 px-4">
        <div className="border border-[#e2e8f0] text-2xl rounded-t-xl">
          <h2 className="text-start p-5">Rooms</h2>
        </div>

        <Table className="border border-[#e2e8f0]">
          <TableHeader>
            <TableRow className="dark:bg-[#0f172a] bg-[#f1f5f9]">
              <TableHead className="table-head">Room Name</TableHead>
              <TableHead className="table-head">Categories</TableHead>
              <TableHead className="table-head">Price</TableHead>
              <TableHead className="table-head">Quantity</TableHead>
              <TableHead className="table-head">Adults</TableHead>
              <TableHead className="table-head">Children</TableHead>
              <TableHead className="table-head">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {AllRooms?.payload?.map((rooms: any) => (
              <RoomsTableBody key={rooms._id} rooms={rooms} />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default Rooms;
