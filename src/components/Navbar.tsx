"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const segments = [
    { name: "Home", url: "/" },
    { name: "Rooms", url: "/rooms" },
    { name: "About Luviana", url: "/about" },
    { name: "Our Gallery", url: "/services" },
    { name: "Contact Us", url: "/contact-us" },
  ];

  const isRoot = pathname === "/";

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="w-full flex justify-between items-center px-4 lg:px-20 h-20 relative">
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
      <ul
        className={`lg:flex lg:space-x-4 animation-container absolute lg:static top-20 left-0 w-full lg:w-auto lg:bg-transparent ${
          isOpen
            ? `block ${isRoot ? "bg-[#476192]" : "bg-white"} py-10`
            : "hidden"
        }`}
      >
        {segments.map((segment) => (
          <li
            key={segment.name}
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
    </nav>
  );
}

export default Navbar;
