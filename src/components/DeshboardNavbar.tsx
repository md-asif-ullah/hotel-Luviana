import Image from "next/image";
import Link from "next/link";
import UserAccount from "./UserAccount";

function DeshboardNavbar() {
  return (
    <nav className="flex justify-between h-20 py-4 px-5 md:px-10 border-b border-[#e2e8f0]">
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

      <UserAccount />
    </nav>
  );
}

export default DeshboardNavbar;
