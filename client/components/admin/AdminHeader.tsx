import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { IoMdNotificationsOutline } from "react-icons/io";
import { TbMessageDots } from "react-icons/tb";
import { CiSearch } from "react-icons/ci";
import { MdKeyboardCommandKey } from "react-icons/md";

const AdminHeader = () => {
    return (
        <div className="h-16 w-full bg-neutral-900 flex flex-row justify-between items-center px-6">
            {/* search bar  */}
            <div className="w-[500px] h-10 border border-neutral-400 rounded-full cursor-pointer flex flex-row justify-between items-center px-3">
                <div className="flex flex-row gap-2 items-center">
                    <CiSearch size={22} />{" "}
                    <p className="text-sm text-neutral-300">Search...</p>
                </div>
                <div className="flex flex-row items-center text-neutral-400">
                    (<MdKeyboardCommandKey />
                    <p>G</p>)
                </div>
            </div>

            {/* menu section  */}
            <div className="flex flex-row gap-5 items-center">
                <div className="relative cursor-pointer">
                    <TbMessageDots size={30} />
                    <div className="h-5 w-5 bg-green-500 rounded-full flex justify-center items-center absolute -top-2 -right-2">
                        <p className="text-xs font-bold text-neutral-100">1</p>
                    </div>
                </div>
                <div className="relative cursor-pointer">
                    <IoMdNotificationsOutline size={30} />
                    <div className="h-5 w-5 bg-yellow-500 rounded-full flex justify-center items-center absolute -top-2 -right-2">
                        <p className="text-xs font-bold text-neutral-700">1</p>
                    </div>
                </div>
                {/* menu  */}
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </div>
        </div>
    );
};

export default AdminHeader;
