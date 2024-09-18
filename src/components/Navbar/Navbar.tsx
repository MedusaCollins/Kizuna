"use client"
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button, buttonVariants } from "../ui/button";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTrigger } from "../ui/sheet";
import { ModeToggle } from "./ModeToggle";

export default function Header() {
  const [scrollY, setScrollY] = useState(0);
  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      if (sectionId === 'hero') {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header className={`flex justify-between items-center sticky top-6 p-3 px-4 m-3 transition-all z-50 ${scrollY > 100 ? 'w-5/6 shadow-xl rounded-xl bg-primary-foreground' : 'w-full bg-transparent'}`}>
      <div className="flex items-center justify-center">
        <h1 className="font-semibold text-xl mr-5 cursor-pointer bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500" onClick={() => scrollToSection('hero')}>{process.env.PROJECT_NAME}</h1>
        <div className="space-x-2 md:block hidden">
          <Button variant={"ghost"} onClick={() => scrollToSection('about')}>About</Button>
          <Button variant={"ghost"} onClick={() => scrollToSection('features')}>Features</Button>
        </div>
      </div>

      <div className="space-x-2 flex">
        <div className="md:flex hidden space-x-2">
          <Link href='/account' className={buttonVariants({ variant: "default" })}>Account</Link>
          <ModeToggle />
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant={"outline"} className="md:hidden flex"><FontAwesomeIcon icon={faBars} /></Button>
          </SheetTrigger>
          <SheetContent className="flex flex-col" side={'left'} >
            <SheetHeader>
              <h1 className="font-semibold text-2xl cursor-pointer" onClick={() => scrollToSection('hero')}>{process.env.PROJECT_NAME}</h1>
            </SheetHeader>
            <SheetClose asChild>
              <Button variant={"ghost"} onClick={() => scrollToSection('about')}>About</Button>
            </SheetClose>
            <SheetClose asChild>
              <Button variant={"ghost"} onClick={() => scrollToSection('features')}>Features</Button>
            </SheetClose>
            <SheetClose asChild>
              <SheetHeader>
                <ModeToggle />
              </SheetHeader>
            </SheetClose>
            <SheetClose asChild>
              <SheetHeader>
                <Link href='/account' className={buttonVariants({ variant: "default" })}>Account</Link>
              </SheetHeader>
            </SheetClose>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}