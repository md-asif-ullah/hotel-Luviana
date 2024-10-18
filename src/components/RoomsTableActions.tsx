"use client";

import Link from "next/link";
import { useToast } from "./ui/use-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface IRoomTableActionsPropsTypes {
  id: string;
  getRooms: () => Promise<void>;
}

function RoomsTableActions({ id, getRooms }: IRoomTableActionsPropsTypes) {
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
        await getRooms();
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
    <>
      <DropdownMenuItem>
        <Link href={`/dashboard/rooms/${id}`}>Details</Link>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <Link href={`/dashboard/rooms/edit-room/${id}`}>Edit</Link>
      </DropdownMenuItem>

      <div className="hover:bg-[#f1f2f3] duration-500">
        <Dialog>
          <DialogTrigger asChild>
            <button className="text-sm ml-2">Delete</button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] bg-white shadow-lg rounded-md p-6">
            <DialogHeader>
              <DialogTitle className="text-lg font-semibold">
                Confirm Delete
              </DialogTitle>
              <DialogDescription className="text-gray-600">
                Are you sure you want to delete this item permanently?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex justify-end space-x-2 mt-2">
              <DialogClose asChild>
                <Button variant="secondary">Cancel</Button>
              </DialogClose>
              <Button variant="destructive" onClick={handleDeleteRoom}>
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}

export default RoomsTableActions;
