import React from "react";
import PageHeader from "../PageHeader";
import { IoIosStar } from "react-icons/io";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FaRegEye } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";

const ProductDetails = () => {
    return (
        <div className="p-5 flex flex-col justify-between h-screen relative">
            <div className="space-y-3 h-screen overflow-x-scroll pb-16 px-1 hide-scroll-bar">
                <PageHeader title="Product Details" subTitle="" />
                {/* image  */}
                {/* TODO: add image slider  */}
                <div className="flex gap-3 flex-row flex-wrap">
                    <div className="size-[150px] bg-neutral-100 rounded-md"></div>
                    <div className="size-[150px] bg-neutral-100 rounded-md"></div>
                    <div className="size-[150px] bg-neutral-100 rounded-md"></div>
                </div>
                {/* name  */}
                <h3 className="text-lg font-semibold text-neutral-200">
                    Product Name
                </h3>

                {/* rating, price & sold  */}
                <div className="flex justify-between items-start">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1">
                                <IoIosStar color="yellow" size={20} />
                                <IoIosStar color="yellow" size={20} />
                                <IoIosStar color="yellow" size={20} />
                                <IoIosStar color="yellow" size={20} />
                                <IoIosStar color="yellow" size={20} />
                                <p>(4.5)</p>
                            </div>
                            <p>1534 Reviews</p>
                        </div>
                        <div className="flex gap-2 ">
                            <Badge className="text-sm bg-neutral-600 hover:bg-neutral-600">
                                1234 Sold
                            </Badge>
                            <Badge className="text-sm bg-neutral-600 hover:bg-neutral-600">
                                1234 Reamining
                            </Badge>
                        </div>
                    </div>
                    {/* price  */}
                    <p className="text-lg font-semibold text-neutral-300">
                        $500
                    </p>
                </div>

                {/* sizes */}
                <div>
                    <p className="text-base font-semibold text-neutral-200">
                        Size
                    </p>
                    <div className="space-x-2 mt-2">
                        {[
                            "34 EU",
                            "35 EU",
                            "36 EU",
                            "37 EU",
                            "38 EU",
                            "39 EU",
                        ].map((size) => (
                            <Badge
                                key={size}
                                variant="outline"
                                className="text-neutral-300 border-neutral-400 py-2 cursor-pointer"
                            >
                                {size}
                            </Badge>
                        ))}
                    </div>
                </div>

                {/* colors  */}
                {/* TODO: add tooltip  */}
                <div>
                    <p className="text-base font-semibold text-neutral-200">
                        Color
                    </p>
                    <div className="flex gap-2 mt-2">
                        {[
                            "blue",
                            "yellow",
                            "green",
                            "red",
                            "white",
                            "pink",
                            "black",
                        ].map((color) => (
                            <div
                                key={color}
                                style={{
                                    backgroundColor: color,
                                }}
                                className={`cursor-pointer size-8 rounded-full`}
                            ></div>
                        ))}
                    </div>
                </div>

                {/* description  */}
                <div>
                    <p className="text-base font-semibold text-neutral-200">
                        Description
                    </p>
                    <p className="text-sm font-normal text-neutral-300 mt-2">
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Laudantium a, eaque sit corrupti repellendus
                        voluptatem quisquam quidem rerum quaerat, maxime
                        exercitationem, doloremque amet culpa aut! Doloremque
                        pariatur nostrum expedita possimus.
                    </p>
                </div>

                {/* product details  */}
                <div>
                    <p className="text-base font-semibold text-neutral-200">
                        Product Details
                    </p>
                </div>
            </div>

            {/* footer  */}
            <div className="flex flex-row gap-3 mt-3 absolute bottom-4 left-4 right-4">
                <Button className="w-full h-10 bg-neutral-300 hover:bg-neutral-200 text-neutral-800">
                    <FaRegEye /> Customer View
                </Button>

                <Button className="w-full h-10">
                    <CiEdit /> Edit Product
                </Button>
            </div>
        </div>
    );
};

export default ProductDetails;
