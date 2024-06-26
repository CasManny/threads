"use client";
import { sidebarLinks } from "@/constants";
import Link from "next/link";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

const Bottombar = () => {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <section className="bottombar">
      <div className="bottonbar_container flex items-center justify-between">
        {sidebarLinks.map((link, index) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;
          return (
            <>
              <Link
                href={link.route}
                key={link.label}
                className={`bottombar_link ${isActive && "bg-primary-500"}`}
              >
                <Image
                  src={link.imgURL}
                  alt={link.label}
                  width={24}
                  height={24}
                />
                <p className="text-subtle-medium  text-light-1 max-sm:hidden">
                  {link.label.split(" ")[0]}
                </p>
              </Link>
            </>
          );
        })}
      </div>
    </section>
  );
};

export default Bottombar;
