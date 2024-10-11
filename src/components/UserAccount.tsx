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
import useDashboardSegments from "./hooks/useDashboardSegments";
import { CgProfile } from "react-icons/cg";
import axios from "axios";
import { useAuth } from "./hooks/useAuth";
import { useRouter } from "next/navigation";

function UserAccount({ isRoot }: { isRoot?: boolean }) {
  const { toast } = useToast();
  const router = useRouter();
  const dashboardSegments = useDashboardSegments();
  const { setUser, user } = useAuth();

  const handleLogOut = async () => {
    if (!user) {
      return router.push("/login");
    }
    try {
      const res = await axios.get("/api/logOut");
      if (res.data.success) {
        setUser(null);
        toast({
          title: "Success",
          description: "Successfully logged out",
        });
      }
      if (!res.data.success) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Something went worn",
        });
      }
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
          {dashboardSegments.map((page, index) => (
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
