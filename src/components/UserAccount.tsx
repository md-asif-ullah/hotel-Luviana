"use client";

import { LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "./ui/use-toast";
import Link from "next/link";
import useDeshboardSegments from "./hooks/UseDeshboardSegments";
import { CgProfile } from "react-icons/cg";

function UserAccount({ isRoot }: { isRoot?: boolean }) {
  const { toast } = useToast();
  const deshboardSegments = useDeshboardSegments();

  const handleLogOut = async () => {
    try {
    } catch (error: any) {
      if (error.data) {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.data.message,
        });
      }
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={`focus:outline-none text-2xl ${
            isRoot ? "text-white" : "text-black"
          }`}
        >
          <CgProfile />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 my-3">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {deshboardSegments.map((page, index) => (
            <Link href={page.to} key={index}>
              <DropdownMenuItem>
                <i className="mr-2 h-4 w-4">{page.icon}</i>
                <span>{page.label}</span>
              </DropdownMenuItem>
            </Link>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuItem onClick={handleLogOut}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserAccount;
