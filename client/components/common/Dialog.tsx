import React, { ComponentProps, forwardRef, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface Props extends ComponentProps<"div"> {
    open: boolean;
    setOpen: (e: boolean) => void;
    children: React.ReactNode;
}

const Dialog = forwardRef<HTMLDivElement, Props>(
    ({ open, setOpen, children, className, ...props }, ref) => {
        const modalBox = useRef<HTMLDivElement>(null);
        // close modal when clicked outside of modal box
        useEffect(() => {
            const handleClickOutside = (event: any) => {
                if (
                    modalBox.current &&
                    !modalBox.current.contains(event.target)
                ) {
                    setOpen(false);
                } else {
                    setOpen(true);
                }
            };

            document.addEventListener("click", handleClickOutside, true);

            return () => {
                document.removeEventListener("click", handleClickOutside);
            };
        }, [modalBox, setOpen]);

        return (
            <div
                className={`h-screen bg-black bg-opacity-80 w-full flex justify-end fixed z-50 transition-opacity ease-in-out duration-300 top-0 right-0 overflow-x-hidden
            overflow-y-hidden hide-scroll-bar translate ${
                open ? "opacity-100 visible " : "opacity-0 invisible "
            }`}
            >
                <div className="relative w-full my-2 mx-auto h-full lg:h-auto md:h-auto">
                    <div
                        className={`translate duration-500 h-full transition-all py-4 flex justify-center items-center ${
                            open
                                ? "translate-x-0 opacity-100"
                                : "-translate-x-20 opacity-0"
                        }
          `}
                    >
                        {/* body  */}
                        <div
                            {...props}
                            className={cn(
                                "size-[300px] bg-white rounded-md",
                                className
                            )}
                            ref={modalBox}
                        >
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
);

Dialog.displayName = "Dialog";
export default Dialog;
