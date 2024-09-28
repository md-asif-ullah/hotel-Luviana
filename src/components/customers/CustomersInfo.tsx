import { TableCell, TableRow } from "@/components/ui/table";
import { IUserType } from "@/types";
import Link from "next/link";
import SecondaryButton from "../SecondaryButton";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { useToast } from "../ui/use-toast";
import { useAuth } from "../hooks/useAuth";
import { formateData } from "@/lib/utils";

interface CustomerInfoProps {
  user: IUserType;
  getCustomers: () => void;
}

function CustomerInfo({ user, getCustomers }: CustomerInfoProps) {
  const { _id, name, phoneNumber, email, createdAt, isAdmin, isBanned } = user;

  const { toast } = useToast();
  const { user: existUser } = useAuth();

  const handleDeleteUser = async () => {
    try {
      const res = await axios.delete(`/api/user/${_id}`);
      if (res.data.success) {
        getCustomers();
        toast({
          title: "Success",
          description: "User deleted successfully",
        });
      }
      if (!res.data.success) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "User does not exist with this ID",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong, please try again later",
      });
    }
  };

  const formattedDate = formateData(createdAt);

  const isDisabled = existUser?._id === _id;

  return (
    <TableRow key={_id}>
      <TableCell className="table-cell">{name}</TableCell>
      <TableCell className="table-cell">{phoneNumber}</TableCell>
      <TableCell className="table-cell">{email}</TableCell>
      <TableCell className="table-cell">{formattedDate}</TableCell>
      <TableCell className="table-cell">
        <Link href={`/dashboard/customers/${_id}`}>
          <SecondaryButton
            text="Edit"
            className="rounded-md border-primary2 border bg-white text-primary2 md:px-[20px] md:py-2 px-[20px] py-2 hover:bg-primary2 hover:text-white"
          />
        </Link>
      </TableCell>
      <TableCell>
        {isAdmin ? (
          <p className="text-red-600 font-semibold ">Admin</p>
        ) : (
          <p className="text-blue-600 font-semibold">Customer</p>
        )}
      </TableCell>
      <TableCell>
        {isBanned ? (
          <p className="text-[#ef433a] bg-[#fdecec] py-1 rounded-md">Blocked</p>
        ) : (
          <p className="text-[#22c55e] bg-[#e8f9ef] py-1 rounded-md">Active</p>
        )}
      </TableCell>
      <TableCell className="text-center">
        <button
          disabled={isDisabled}
          onClick={handleDeleteUser}
          className={`text-red-600 text-2xl ${
            isDisabled ? "cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          <MdDelete />
        </button>
      </TableCell>
    </TableRow>
  );
}

export default CustomerInfo;
