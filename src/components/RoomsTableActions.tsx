"use client";

import Link from "next/link";
import { useToast } from "./ui/use-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import Swal from "sweetalert2";

function RoomsTableActions({ id }: { id: string }) {
  const { toast } = useToast();
  const router = useRouter();

  const handleDeleteRoom = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axios.delete(`/api/rooms/${id}`);
          if (res.data.success) {
            toast({
              title: "Success",
              description: "Room deleted successfully",
            });
            router.refresh();
          }
          if (!res.data.success) {
            toast({
              variant: "destructive",
              title: "Error",
              description: "Failed to delete room",
            });
          }
        } catch (error) {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to delete room",
          });
        }
      }
    });
  };

  return (
    <>
      <DropdownMenuItem>
        <Link href={`/dashboard/rooms/${id}`}>Details</Link>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <Link href={`/dashboard/rooms/edit-room/${id}`}>Edit</Link>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <button onClick={handleDeleteRoom}>Delete</button>
      </DropdownMenuItem>
    </>
  );
}

export default RoomsTableActions;
