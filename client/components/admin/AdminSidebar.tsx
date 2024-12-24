import React from "react";
import { RiHomeSmile2Line } from "react-icons/ri";
import { TbListCheck, TbListDetails } from "react-icons/tb";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";

const AdminSidebar = () => {
    return (
        <div className="w-[300px] bg-neutral-900 h-screen flex flex-col justify-between">
            <div>
                {/* logo  */}
                <div className="w-full text-center py-5">
                    <h1 className="font-bold text-2xl">GEOVEA</h1>
                </div>

                {/* menu list  */}
                <div className="ps-3">
                    <p className="uppercase font-semibold text-sm ms-5 text-neutral-400">
                        Main Menu
                    </p>

                    <div className="my-2">
                        <div className="hover:bg-neutral-700 py-3 ps-5 rounded-l-full flex flex-row gap-2 items-center cursor-pointer group">
                            <RiHomeSmile2Line size={22} />
                            <h5 className="text-base font-medium group-hover:text-neutral-50">
                                Overview
                            </h5>
                        </div>

                        <Link href={"/admin/dashboard/product"}>
                            <div className="hover:bg-neutral-700 py-3 ps-5 rounded-l-full flex flex-row gap-2 items-center cursor-pointer group">
                                <TbListDetails size={22} />
                                <h5 className="text-basefont-medium group-hover:text-neutral-50">
                                    Products
                                </h5>
                            </div>
                        </Link>

                        <div className="hover:bg-neutral-700 py-3 ps-5 rounded-l-full flex flex-row gap-2 items-center cursor-pointer group">
                            <TbListCheck size={22} />
                            <h5 className="text-base font-medium group-hover:text-neutral-50">
                                Orders
                            </h5>
                        </div>

                        <div className="hover:bg-neutral-700 py-3 ps-5 rounded-l-full flex flex-row gap-2 items-center cursor-pointer group">
                            <TbListCheck size={22} />
                            <h5 className="text-base font-medium group-hover:text-neutral-50">
                                Branch
                            </h5>
                        </div>

                        <div className="hover:bg-neutral-700 py-3 ps-5 rounded-l-full flex flex-row gap-2 items-center cursor-pointer group">
                            <TbListCheck size={22} />
                            <h5 className="text-base font-medium group-hover:text-neutral-50">
                                Delivery Partner
                            </h5>
                        </div>

                        <div className="hover:bg-neutral-700 py-3 ps-5 rounded-l-full flex flex-row gap-2 items-center cursor-pointer group">
                            <TbListCheck size={22} />
                            <h5 className="text-base font-medium group-hover:text-neutral-50">
                                Message
                            </h5>
                        </div>

                        <div className="hover:bg-neutral-700 py-3 ps-5 rounded-l-full flex flex-row gap-2 items-center cursor-pointer group">
                            <TbListCheck size={22} />
                            <h5 className="text-base font-medium group-hover:text-neutral-50">
                                Calendar
                            </h5>
                        </div>

                        <div className="hover:bg-neutral-700 py-3 ps-5 rounded-l-full flex flex-row gap-2 items-center cursor-pointer group">
                            <TbListCheck size={22} />
                            <h5 className="text-base font-medium group-hover:text-neutral-50">
                                Finance Management
                            </h5>
                        </div>
                    </div>

                    <p className="uppercase font-semibold text-sm mt-2 ms-5 text-neutral-400">
                        Other
                    </p>
                    <div className="my-2">
                        <div className="hover:bg-neutral-700 py-3 ps-5 rounded-l-full flex flex-row gap-2 items-center cursor-pointer group">
                            <RiHomeSmile2Line size={22} />
                            <h5 className="text-base font-medium group-hover:text-neutral-50">
                                Pick-up/Truck
                            </h5>
                        </div>

                        <div className="hover:bg-neutral-700 py-3 ps-5 rounded-l-full flex flex-row gap-2 items-center cursor-pointer group">
                            <TbListDetails size={22} />
                            <h5 className="text-basefont-medium group-hover:text-neutral-50">
                                Staff Members
                            </h5>
                        </div>

                        <div className="hover:bg-neutral-700 py-3 ps-5 rounded-l-full flex flex-row gap-2 items-center cursor-pointer group">
                            <TbListCheck size={22} />
                            <h5 className="text-base font-medium group-hover:text-neutral-50">
                                Settings
                            </h5>
                        </div>
                    </div>
                </div>
            </div>

            {/* footer  */}
            <div className="px-5">
                <div className="bg-neutral-800 p-3 rounded-xl mb-5 flex flex-row flex-wrap items-center gap-2">
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>

                    <div>
                        <h3 className="text-base font-semibold">
                            Mehedi Hasan
                        </h3>
                        <p className="text-sm">Software Engineer</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminSidebar;
