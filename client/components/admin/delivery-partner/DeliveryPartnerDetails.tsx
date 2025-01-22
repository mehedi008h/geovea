import React from "react";
import { Button } from "@/components/ui/button";
import { FaRegEye } from "react-icons/fa6";
import { CiEdit, CiPhone } from "react-icons/ci";
import Map from "@/components/common/Map";
import { IoLocationOutline } from "react-icons/io5";
import Info from "@/components/common/Info";
import { MdOutlineTitle} from "react-icons/md";
import {AiOutlineMail} from "react-icons/ai";

interface Props {
    action?: () => void;
    secondaryAction?: () => void;
}

const DeliveryPartnerDetails = ({action, secondaryAction}:Props) => {
    return (
        <div className="p-5 flex flex-col justify-between h-screen relative">
            <div className="space-y-3 h-screen overflow-x-scroll pb-16 px-1 hide-scroll-bar">
                {/* image  */}
                <div className="w-full flex flex-col items-center justify-center my-2">
                    <div className="size-[150px] bg-neutral-100 rounded-md"></div>
                    <h3 className="text-lg font-semibold text-neutral-200 mt-2">
                        Redx Bd
                    </h3>
                </div>

                {/* details  */}
                <div className="flex flex-col gap-2">
                    <Info
                        title="Name"
                        description="RedX Bd"
                        icon={<MdOutlineTitle size={22} />}
                    />
                    <Info
                        title="Phone"
                        description="(123) 456-7890"
                        icon={<CiPhone size={22} />}
                    />
                    <Info
                        title="Email"
                        description="eric@example.com"
                        icon={<AiOutlineMail size={22} />}
                    />
                    <Info
                        title="Address"
                        description="Baliadanga, Kaliganj"
                        icon={<IoLocationOutline size={22} />}
                    />

                </div>

                <Map />

                {/* footer  */}
                <div className="flex flex-row gap-3 mt-3 absolute bottom-4 left-4 right-4">
                    {action && <Button onClick={action} className="w-full h-10 bg-neutral-300 hover:bg-neutral-200 text-neutral-800">
                        <FaRegEye /> Customer View
                    </Button>}

                    {secondaryAction && <Button onClick={secondaryAction} className="w-full h-10">
                        <CiEdit /> Update Delivery Partner
                    </Button>}
                </div>
            </div>
        </div>
    );
};

export default DeliveryPartnerDetails;
