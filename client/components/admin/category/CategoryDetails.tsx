import React from "react";
import PageHeader from "../PageHeader";
import { Button } from "@/components/ui/button";
import { FaRegEye } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";

const CategoryDetails = () => {
    return (
        <div className="p-5 flex flex-col justify-between h-screen relative">
            <div className="space-y-3 h-screen overflow-x-scroll pb-16 px-1 hide-scroll-bar">
                <PageHeader title="Category Details" subTitle="" />
                <div className="w-full flex flex-col items-center justify-center my-2">
                    <div className="size-40 rounded-full bg-neutral-100"></div>
                    <h3 className="text-lg font-semibold text-neutral-200 mt-2">
                        Category Name
                    </h3>
                </div>
            </div>

            {/* footer  */}
            <div className="flex flex-row gap-3 mt-3 absolute bottom-4 left-4 right-4">
                <Button className="w-full h-10 bg-neutral-300 hover:bg-neutral-200 text-neutral-800">
                    <FaRegEye /> Customer View
                </Button>

                <Button className="w-full h-10">
                    <CiEdit /> Update Category
                </Button>
            </div>
        </div>
    );
};

export default CategoryDetails;
