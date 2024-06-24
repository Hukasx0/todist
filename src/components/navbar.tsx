"use client";

import Image from "next/image";
import { ThemeToggle } from "./theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import Link from "next/link";
import React, { useEffect } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

interface NavbarProps {
  user: ({
        id: string;
    } & {
        name?: string | null | undefined;
        email?: string | null | undefined;
        image?: string | null | undefined;
    }) | undefined
}

export function Navbar({ user }: NavbarProps) {
  const isMobile = useMediaQuery("(max-width: 768px)")

  return (
    <header className="sticky top-0 z-10 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary mb-5">
      <div className="mx-4 sm:mx-8 flex h-14 items-center">
        <div className="flex items-center lg:space-x-0 gap-2">
          <Image
            src="/icon.svg"
            alt="Todist logo"
            width={32}
            height={32}
          />
          <h1 className="font-bold">Todist</h1>
        </div>
        <div className="flex flex-1 items-center space-x-2 justify-end gap-2">
          <ThemeToggle />
          {(() => {
            if (user && !isMobile) {
              return (
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.image || undefined} />
                      <AvatarFallback>User</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Signed in as <span className="font-bold">{user?.name || "User"}</span></DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => window.location.href = "/api/auth/signout"} className="cursor-pointer">Sign out</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )
            }
            else if (user && isMobile) {
              return (
                <Drawer>
                <DrawerTrigger>
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.image || undefined} />
                    <AvatarFallback>User</AvatarFallback>
                  </Avatar>
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle>Signed in as <span className="font-bold">{user?.name || "User"}</span></DrawerTitle>
                  </DrawerHeader>
                  <DrawerFooter>
                    <Link href={"/api/auth/signout"}><Button variant={"outline"} className="w-full">Sign out</Button></Link>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
              )
            }
            else {
              return (
                <Link href={"/api/auth/signin"}><Button variant={"default"}>Sign in</Button></Link>
              )
            }
          })()}
        </div>
      </div>
    </header>
  );
}

