"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { memo, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Separator } from "./ui/separator";
import UserAccount from "./UserAccount";
import { useAuth } from "./hooks/useAuth";

interface Segment {
  name: string;
  url: string;
}

function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState<Boolean>(false);

  const segments: Segment[] = [
    { name: "Home", url: "/" },
    { name: "Rooms", url: "/rooms" },
    { name: "About Luviana", url: "/about-luviana" },
    { name: "Our Gallery", url: "/our-gallery" },
    { name: "Contact Us", url: "/contact-us" },
    ...(isOpen
      ? [
          { name: "Login", url: "/login" },
          { name: "Register", url: "/register" },
        ]
      : []),
  ];

  const isRoot = pathname === "/";

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const { user } = useAuth();

  return (
    <nav
      className={`w-full flex justify-between items-center px-4 lg:px-16 xl:px-20 h-20 relative ${
        isRoot ? "" : "border-b border-[#e2e8f0]"
      }`}
    >
      {/* responsive menu */}

      <div className="lg:hidden flex items-center">
        <button onClick={toggleMenu} aria-label="Toggle menu">
          {isOpen ? (
            <FaTimes
              className={`text-2xl ${isRoot ? "text-white" : "text-black"}`}
            />
          ) : (
            <FaBars
              className={`text-2xl ${isRoot ? "text-white" : "text-black"}`}
            />
          )}
        </button>
      </div>

      {/* logo */}

      <Link href="/" className="flex items-center">
        <Image
          src={`/assets/icons/${isRoot ? "logotype.svg" : "logotype_gold.svg"}`}
          alt="logo"
          priority
          width={60}
          height={60}
        />
        <h1 className={`text-2xl ml-4 ${isRoot ? "text-white" : "text-black"}`}>
          Luviana
        </h1>
      </Link>

      {/* navigation links */}

      <ul
        className={`lg:flex animation-container absolute lg:static top-20 left-0 w-full lg:w-auto lg:bg-transparent ${
          isOpen
            ? `block ${isRoot ? "bg-[#476192]" : "bg-white"} py-10`
            : "hidden"
        }`}
      >
        {segments?.map((segment, index) => (
          <li
            key={index}
            className={`${
              pathname === segment.url ? "activeborderXwidth" : "borderXwidth"
            } ${
              isRoot ? "rootNavLinkBackground" : "allNavLinkBackground"
            } px-4 py-2 lg:px-0`}
          >
            <Link
              href={segment.url}
              className={isRoot ? "text-white" : "text-black"}
            >
              {segment.name}
            </Link>
          </li>
        ))}
      </ul>

      {/* user account for desktop */}

      <div className="hidden lg:block">
        {user ? (
          <div className="md:flex items-center hidden space-x-1">
            <UserAccount isRoot={isRoot} />
          </div>
        ) : (
          <div className="sm:flex hidden h-5 items-center space-x-4 text-sm">
            <Link
              href="/login"
              className={`text-base ${isRoot ? "text-white" : "text-black"}`}
            >
              Login
            </Link>
            <Separator orientation="vertical" />
            <Link
              href="/register"
              className={`text-base ${isRoot ? "text-white" : "text-black"}`}
            >
              Register
            </Link>
          </div>
        )}
      </div>

      {/* user account for mobile */}

      <div className="lg:hidden">
        <UserAccount isRoot={isRoot} />
      </div>
    </nav>
  );
}

export default memo(Navbar);
