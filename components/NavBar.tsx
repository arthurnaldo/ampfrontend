"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import NavBarLink from "./NavBarLink";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function NavBar() {
  const pathname = usePathname();
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      // Set visible if scrolling up or at the top of the page
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  return (
    <div
      className={`fixed top-0 z-50 w-full transition-transform duration-300 ${visible ? "translate-y-0" : "-translate-y-full"}`}
    >
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
                src="./assets/Berkeley AMP Color.png"
                alt="Berkeley AMP Logo"
                width={200}
                height={200}
                style={{ objectFit: "contain" }}
              />
            </div>
          </div>
          <div className="flex h-full items-center gap-4">
            <Link href="/">
              <NavBarLink selected={pathname === "/"} text="Home" />
            </Link>
            <Link href="/chat">
              <NavBarLink selected={pathname === "/chat"} text="Chat" />
            </Link>
            <Link href="/forum">
              <NavBarLink selected={pathname === "/forum"} text="Forum" />
            </Link>
            <Link href="/community">
              <NavBarLink
                selected={pathname === "/community"}
                text="Leadership"
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
