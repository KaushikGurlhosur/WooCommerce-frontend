"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sling as Hamburger } from "hamburger-react";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const pathname = usePathname();

  const routes = [
    {
      href: "/",
      label: "Home",
    },
    {
      href: "/segment-evaluate",
      label: "Segment Evaluation",
    },
  ];

  return (
    <>
      <div className="z-51 fixed top-10 left-10">
        {/* Logo */}
        <Link href="/">
          <Image
            height={40}
            width={90}
            priority
            src="/kaushikrg.png"
            alt="logo"
            style={{ width: "auto" }}
          />
        </Link>
      </div>

      <nav className="fixed flex justify-center items-center w-[30%] top-10 left-1/2 -translate-x-1/2 z-50 rounded-xl">
        {/* Desktop Menu */}

        <ul className="hidden md:flex w-full gap-8 items-center text-sm font-medium justify-center bg-black/50 p-3 rounded-xl shadow-lg">
          {routes.map((route) => {
            // Determine if the link is active
            const isActive = pathname === route.href;

            return (
              <li key={route.label}>
                <Link
                  href={route.href}
                  className={`
                    transition-colors 
                    ${
                      isActive
                        ? "text-amber-400 font-bold border-b-2 border-amber-400"
                        : "text-white hover:text-amber-400"
                    }
                  `}>
                  {route.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="md:hidden fixed right-4 top-10 flex rounded-4xl w-12 z-51 transition-all duration-1000 ease-in-out">
        <Hamburger
          size={30}
          color="white"
          toggled={isOpen}
          toggle={setIsOpen}
          className="z-71 bg-transparent"
        />
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-biege/90 flex flex-col items-center justify-center gap-8 z-50">
          <div className="absolute inset-0 blur"></div>
          <div className="relative flex flex-col items-center gap-6 ">
            {routes.map((route) => (
              <Link
                key={route.label}
                href={route.href}
                onClick={() => setIsOpen(false)}
                className=" text-amber-100 z-51">
                <div className="flex flex-row items-start hover:scale-125 gap-3 text-xl tracking-widest">
                  {route.icon}
                  {route.label}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
