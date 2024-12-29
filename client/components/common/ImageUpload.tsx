import React, { ChangeEventHandler } from "react";
import { TbPhotoPlus } from "react-icons/tb";
import { Input } from "../ui/input";
import Image from "next/image";

interface Props {
    avatar?: string;
    uploadAvatar: ChangeEventHandler<HTMLInputElement>;
}

const ImageUpload = ({ avatar, uploadAvatar }: Props) => {
    return (
        <label htmlFor="avatar">
            <div className="border border-dashed border-neutral-600 p-5 flex flex-col justify-center items-center gap-3 cursor-pointer relative mt-2">
                <Input
                    type="file"
                    id="avatar"
                    accept="iamges/*"
                    onChange={uploadAvatar}
                    className="hidden"
                    multiple
                />
                <TbPhotoPlus size={50} color="#737373" />
                <h3 className="text-base text-neutral-500 font-semibold">
                    Click to upload
                </h3>
                {avatar && (
                    <div>
                        <Image
                            width={100}
                            height={100}
                            objectFit="contain"
                            src={avatar}
                            alt="House"
                        />
                    </div>
                )}
            </div>
        </label>
    );
};

export default ImageUpload;
