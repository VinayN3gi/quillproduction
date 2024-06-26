import { cn } from "@/lib/utils"
import React, { ReactNode } from "react"


const MaxWidthWrapper = ({
    className,
    children
}:{
    className?: string,
    children: ReactNode
}) => {
    return (
    <div className={cn(" mx-auto w-full max-w-screen-xl p-2.5 md:p-10",className)}>
        {children}
    </div>
    )
}

export default MaxWidthWrapper