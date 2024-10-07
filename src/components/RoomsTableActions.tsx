"use client";

import Link from "next/link";
import { FaPencil } from "react-icons/fa6";
import { IoEyeOutline } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { useToast } from "./ui/use-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

function RoomsTableActions({ id }: { id: string }) {
  const { toast } = useToast();
  const router = useRouter();

  const handleDeleteRoom = async () => {
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
  };

  return (
    <section className="flex justify-center items-center space-x-4">
      <Link href={`/dashboard/rooms/edit-room/${id}`}>
        <button className="text-blue-600 hover:text-blue-800 transition">
          <FaPencil className="w-5 h-5" />
        </button>
      </Link>
      <Link href={`/dashboard/rooms/${id}`}>
        <button className="text-gray-600 hover:text-gray-800 transition">
          <IoEyeOutline className="w-5 h-5" />
        </button>
      </Link>
      <button
        onClick={handleDeleteRoom}
        className="text-red-600 hover:text-red-800 transition"
      >
        <MdDeleteOutline className="w-5 h-5" />
      </button>
    </section>
  );
}

export default RoomsTableActions;
