"use client";
import Link from "next/link";
import WalletButton from "../UI/WalletButton";
import Image from "next/image";
import { usePathname } from "next/navigation";
const TopBar = () => {
  const path = usePathname();
  return (
    <div className="p-3 flex items-center justify-between">
      <div className="flex items-center">
        <Image
          src="/quanta.png"
          alt="Quanta"
          width={48}
          height={48}
          className="w-10 h-10 sm:w-12 sm:h-12"
        ></Image>
        <span className="text-lg font-semibold">Quanta</span>
      </div>
      <div className="flex space-x-5 items-center">
        <Link
          href="/"
          className={
            path == "/" ? "text-customGreen border-b border-customGreen" : "hover:text-customGreen"
          }
        >
          Home
        </Link>
        <Link
          href="/about"
          className={
            path == "/about" ? "text-customGreen border-b border-customGreen" : "hover:text-customGreen"
          }
        >
          About
        </Link>
        <WalletButton></WalletButton>
      </div>
    </div>
  );
};
export default TopBar;
