import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";

import { TRPCReactProvider } from "@/trpc/react";

import { Toaster } from "@/components/ui/toaster"

import { ThemeProvider } from "@/components/theme-provider"

export const metadata = {
  title: "Todist: Manage your tasks with ease",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/icon.svg" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <TRPCReactProvider>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
          >
            <div vaul-drawer-wrapper="" className="bg-background">
              {children}
              <Toaster />
            </div>
          </ThemeProvider>  
          </TRPCReactProvider>
      </body>
    </html>
  );
}
