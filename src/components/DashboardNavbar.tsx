"use client";

import Image from "next/image";
import Link from "next/link";
import UserAccount from "./UserAccount";
import { useAuth } from "./hooks/useAuth";
import { Separator } from "@radix-ui/react-separator";

function DashboardNavbar() {
  const { user } = useAuth();

  return (
    <nav className="flex justify-between items-center h-20 py-4 px-5 md:px-10 border-b border-[#e2e8f0]">
      <Link href="/" className="flex items-center">
        <Image
          src={"/assets/icons/logotype_gold.svg"}
          alt="logo"
          priority
          width={60}
          height={60}
        />
        <h1 className={"text-2xl ml-4 text-black"}>Luviana</h1>
      </Link>

      <div>
        {/* user account for desktop */}

        <div className="hidden lg:block">
          {user ? (
            <div className="md:flex items-center hidden space-x-1">
              <UserAccount />
            </div>
          ) : (
            <div className="sm:flex hidden h-5 items-center space-x-4 text-sm">
              <Link href="/login" className="text-base">
                Login
              </Link>
              <Separator orientation="vertical" />
              <Link href="/register" className="text-base">
                Register
              </Link>
            </div>
          )}
        </div>

        {/* user account for mobile */}

        <div className="lg:hidden">
          <UserAccount />
        </div>
      </div>
    </nav>
  );
}

export default DashboardNavbar;
