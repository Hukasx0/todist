import { Github } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";

import drizzle from "../assets/drizzle.png";
import nextauth from "../assets/nextauth.png";
import nextjs from "../assets/nextjs.svg";
import t3 from "../assets/t3-dark.svg";
import trpc from "../assets/trpc.svg";
import tailwind from "../assets/tailwind.png";
import { Features } from "./features";
import LetterPullup from "./ui/letter-pullup";
import CallToAction from "./cta";

export default function Hero() {
    return (
        <>
            <div className="px-3 py-16 md:py-24 xl:py-36">
                <div className="mx-auto max-w-screen-lg">
                    <div className="mt-3 text-center text-4xl font-bold tracking-tight"><LetterPullup className="text-primary text-5xl py-2" words={"Todist"} delay={0.05} />Todos in the cloud in kanban board style</div>
                    <div className="mx-auto mt-5 max-w-screen-md text-center text-xl text-muted-foreground">Project created as a result of a challenge - write a simple Fullstack web application with authentication in 1 day</div>
                    <div className="mt-8 flex justify-center gap-x-5 gap-y-3 max-sm:flex-col">
                        <Link href={"/api/auth/signin"} className="inline-flex items-center justify-center whitespace-nowrap text-sm"><Button className="w-full">Get started</Button></Link>
                        <Link href={"https://github.com/Hukasx0/todist"} target="_blank" className="inline-flex items-center justify-center whitespace-nowrap text-sm"><Button variant="outline" className="w-full"><Github className="mr-2 h-4 w-4" /> Star on GitHub</Button></Link>
                    </div>
                </div>
                <div className="mx-auto max-w-screen-lg mt-16 md:mt-24 xl:mt-36">
                <div className="text-center text-xl font-medium text-muted-foreground">Built with</div>
                    <div className="mt-12 grid grid-cols-2 place-items-center gap-y-6 md:grid-cols-6">
                        <Link href={"https://nextjs.org/"} target="_blank">
                            <Image
                                src={nextjs}
                                alt="Next.js logo"
                                width={48}
                                height={48}
                                className="cursor-pointer grayscale hover:grayscale-0 transition duration-300"
                            />
                        </Link>
                        <Link href={"https://create.t3.gg/"} target="_blank">
                            <Image
                                src={t3}
                                alt="T3 logo"
                                width={48}
                                height={48}
                                className="dark:invert cursor-pointer grayscale hover:grayscale-0 transition duration-300"
                            />
                        </Link>
                        <Link href={"https://next-auth.js.org/"} target="_blank">
                            <Image
                                src={nextauth}
                                alt="NextAuth logo"
                                width={48}
                                height={48}
                                className="cursor-pointer grayscale hover:grayscale-0 transition duration-300"
                            />
                        </Link>
                        <Link href={"https://orm.drizzle.team/"} target="_blank">
                            <Image
                                src={drizzle}
                                alt="Drizzle logo"
                                width={48}
                                height={48}
                                className="cursor-pointer grayscale hover:grayscale-0 transition duration-300"
                            />
                        </Link>
                        <Link href={"https://trpc.io/"} target="_blank">
                            <Image
                                src={trpc}
                                alt="TRPC logo"
                                width={48}
                                height={48}
                                className="cursor-pointer grayscale hover:grayscale-0 transition duration-300"
                            />
                        </Link>
                        <Link href={"https://tailwindcss.com/"} target="_blank">
                            <Image
                                src={tailwind}
                                alt="Tailwind logo"
                                width={48}
                                height={48}
                                className="cursor-pointer grayscale hover:grayscale-0 transition duration-300"
                            />
                        </Link>
                    </div>
                </div>
                <div className="mt-16 flex flex-col items-center">
                    <div className="text-center text-xl font-medium text-muted-foreground mb-12">Features</div>
                    <Features />
                </div>
            </div>
            <div className="flex justify-center">
                <div className="w-2/3">
                    <CallToAction />
                </div>
            </div>
            <footer className="w-full flex flex-col sm:flex-row items-center justify-between p-6 mx-auto space-y-4 sm:space-y-0 mt-12">
           <span className="text-sm text-center">Todist © {new Date().getFullYear()} by <Link href={"https://github.com/Hukasx0"} target="_blank" className="hover:text-primary"><b>Hubert Kasperek</b></Link></span>
           <div className="flex items-center space-x-4">
              <Link href={"https://github.com/Hukasx0/todist"} target="_blank">
                <Github width={30} height={30} className="hover:text-primary" />
              </Link>
          </div>
          </footer>
        </>
    )
}