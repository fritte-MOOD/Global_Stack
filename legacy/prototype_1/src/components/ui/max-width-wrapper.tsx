import { cn } from "@/components/functions/utils"
import { ReactNode } from "react"

interface MaxWidthWrapperProps {
    className?: string
    children: ReactNode
}

export const MaxWidthWrapper =({
    className, 
    children,
}: MaxWidthWrapperProps) => {
    return (
        <div 
            className={cn("h-full w-full px-2.5", className)}
    >
        {children}
    </div>
    )
}