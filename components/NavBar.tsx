"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import NavBarLink from "./NavBarLink";
import Image from "next/image";

export default function NavBar() {
  const pathname = usePathname();

  return (
    <div className="w-full">
      <div className="h-18 w-full bg-accentPrimary px-8">
        <div className="flex h-full items-center justify-between py-2">
          <div className="flex h-full items-center">
            <div
              style={{
                backgroundColor: "white",
                padding: "5px",
                borderRadius: "5px",
              }}
            >
              <Image
                src="/assets/Berkeley AMP Color.png"
                alt="Berkeley AMP Logo"
                width={200}
                height={200}
                style={{ objectFit: "contain" }}
              />
            </div>
          </div>
          <div className="flex h-full items-center gap-4">
            <Link href="/">
              <NavBarLink selected={pathname === "/"} text="Products" />
            </Link>
            <Link href="/solutions">
              <NavBarLink
                selected={pathname === "/solutions"}
                text="Solutions"
              />
            </Link>
            <Link href="/community">
              <NavBarLink
                selected={pathname === "/community"}
                text="Community"
              />
            </Link>
            <Link href="/resources">
              <NavBarLink
                selected={pathname === "/resources"}
                text="Resources"
              />
            </Link>
            <Link href="/contact">
              <NavBarLink selected={pathname === "/contact"} text="Contact" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
