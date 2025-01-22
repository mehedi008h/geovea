import { cn } from "@/lib/utils";
import React, { ComponentProps, forwardRef } from "react";

interface Props extends ComponentProps<"div"> {
    title: string;
    description: string;
    icon?: React.ReactNode;
}

const Info = forwardRef<HTMLDivElement, Props>(
    ({ title, description, icon, className, ...props }, ref) => {
        return (
            <div
                {...props}
                className={cn("flex items-center justify-between bg-neutral-700 py-1 px-2 rounded-md", className)}
                ref={ref}
            >
                <div className="flex items-center gap-2">
                    {icon && icon}
                    <p className="text-base font-semibold text-neutral-200">
                        {title}:
                    </p>
                </div>
                <p className="text-base font-normal text-neutral-200">
                    {description}
                </p>
            </div>
        );
    }
);

Info.displayName = "Info";
export default Info;
