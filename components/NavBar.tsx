"use client";

import NavBarLink from "./NavBarLink";

export default function NavBar() {
  return (
    <div className="h-18 w-full bg-accentPrimary px-8">
      <div className="flex h-full items-center justify-between py-2">
        <div className="flex h-full items-center">
          <div className="relative h-14 w-14 p-2 text-white">
            {/* <Image src={logoIconSmall} alt="Logo"></Image> */}
            Logo
          </div>
        </div>

        <div className="flex h-full items-center gap-4">
          <NavBarLink selected={true} text={"Products"}></NavBarLink>
          <NavBarLink selected={false} text={"Solutions"}></NavBarLink>
          <NavBarLink selected={false} text={"Community"}></NavBarLink>
          <NavBarLink selected={false} text={"Resources"}></NavBarLink>
          <NavBarLink selected={false} text={"Contact"}></NavBarLink>
        </div>
      </div>
    </div>
  );
}
