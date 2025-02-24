"use client";

import React, {
    ChangeEvent,
    ComponentProps,
    forwardRef,
    useState,
} from "react";
import { TbPhotoPlus } from "react-icons/tb";
import { Input } from "../ui/input";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { IoCloseOutline } from "react-icons/io5";
import { CategoryI } from "@/@types";

interface Props extends ComponentProps<"div"> {
    setData: (data: string) => void;
    setCustomValue: (id: keyof CategoryI, value: string) => void;
    show?: boolean;
    id?: keyof CategoryI;
}

const ImageUpload = forwardRef<HTMLDivElement, Props>(
    (
        { id, setCustomValue, setData, show = false, className, ...props },
        ref
    ) => {
        const [image, setImage] = useState<string>("");

        // single image
        const uploadImage = (e: ChangeEvent<HTMLInputElement>) => {
            if (!e.target.files || e.target.files.length === 0) {
                console.warn("No file selected.");
                return;
            }

            const file = e.target.files[0];

            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === FileReader.DONE && reader.result) {
                    const base64String = reader.result as string;
                    setImage(base64String);
                    if (id) {
                        setCustomValue(id, base64String);
                    }
                    setData(base64String);
                }
            };

            reader.onerror = (error) => {
                console.error("Error reading file:", error);
            };

            reader.readAsDataURL(file);
        };

        // remove image
        const removeImage = () => {
            setImage("");
            if (id) {
                setCustomValue(id, "");
            }
        };

        return (
            <>
                {image && show ? (
                    <div
                        ref={ref}
                        className={cn(
                            "h-full w-full border border-dashed border-neutral-600 p-1 flex flex-col justify-center items-center cursor-pointer group transition-all relative",
                            className
                        )}
                        {...props}
                    >
                        <Image
                            src={image}
                            width={100}
                            height={100}
                            objectFit="cover"
                            className="w-full h-full rounded-full object-cover"
                            alt="Product Image"
                        />
                        <div
                            onClick={removeImage}
                            className="h-full w-full bg-neutral-500 absolute rounded-full  bg-opacity-50 justify-center items-center hidden group-hover:flex"
                        >
                            <IoCloseOutline
                                size={20}
                                color="white"
                                className="font-semibold bg-red-500 rounded-full"
                            />
                        </div>
                    </div>
                ) : (
                    <label htmlFor="avatar">
                        <div
                            ref={ref}
                            className={cn(
                                "border border-dashed border-neutral-600 p-5 flex flex-col justify-center items-center gap-3 cursor-pointer relative",
                                className
                            )}
                            {...props}
                        >
                            <Input
                                type="file"
                                id="avatar"
                                accept="iamges/*"
                                onChange={uploadImage}
                                className="hidden"
                            />
                            <TbPhotoPlus size={30} color="#737373" />
                            <h3 className="text-base text-neutral-500 font-semibold">
                                Click to upload
                            </h3>
                        </div>
                    </label>
                )}
            </>
        );
    }
);

ImageUpload.displayName = "ImageUpload";
export default ImageUpload;
