"use client"

import { useEffect } from "react"

import { useToast } from "@/components/ui/use-toast"

export default function LoginGreeting({ children }: { children: React.ReactNode }) {

    const { toast } = useToast()

    useEffect(() => {
        const timeout = setTimeout(() => {
            toast({
                title: "Welcome!",
                description: "Successfully logged in.",
            })
        }, 0)
    
        return (() => clearTimeout(timeout))
      }, [toast])

    return (
        <>
           {children}
        </>
    )
}