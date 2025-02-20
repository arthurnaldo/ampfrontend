"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import NavBarLink from "./NavBarLink";

export default function NavBar() {
  const pathname = usePathname();

  return (
    <div className="fixed left-0 top-0 z-50 w-full">
      <div className="h-18 w-full bg-accentPrimary px-8">
        <div className="flex h-full items-center justify-between py-2">
          <div className="flex h-full items-center">
            <div className="relative h-14 w-14 p-2 text-white">Logo</div>
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
