import { TableCell, TableRow } from "@/components/ui/table";
import Image from "next/image";
import RoomsTableActions from "./RoomsTableActions";
import { ApiDataTypes } from "@/types";

function RoomsTableBody({ rooms }: { rooms: ApiDataTypes }) {
  const {
    _id,
    roomName,
    price,
    images,
    quantity,
    adults,
    categories,
    children,
  } = rooms;

  return (
    <TableRow className="hover:bg-gray-50">
      <TableCell className="py-4 px-6 text-center">
        <div className="flex items-center whitespace-nowrap space-x-4 mr-5">
          <Image
            src={images[0]}
            alt={roomName}
            width={50}
            height={50}
            className="w-[50px] h-[50px] rounded-xl object-cover"
          />
          <h3 className="text-gray-900 font-semibold text-lg">{roomName}</h3>
        </div>
      </TableCell>
      <TableCell className="py-4 px-6 text-center">
        <span className="text-gray-600">{categories}</span>
      </TableCell>
      <TableCell className="py-4 px-6 text-center">
        <span className="text-gray-900">${price}</span>
      </TableCell>
      <TableCell className="py-4 px-6 text-center">
        <span className="text-gray-900">{quantity}</span>
      </TableCell>
      <TableCell className="py-4 px-6 text-center">
        <span className="text-gray-900">{adults}</span>
      </TableCell>
      <TableCell className="py-4 px-6 text-center">
        <span className="text-gray-900">{children}</span>
      </TableCell>
      <TableCell className="py-4 px-6 text-center">
        <RoomsTableActions id={_id} />
      </TableCell>
    </TableRow>
  );
}

export default RoomsTableBody;
