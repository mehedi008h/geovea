"use client";

import React, { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { AiOutlineDelete } from "react-icons/ai";
import { FaRegEye } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import CustomeTable from "@/components/common/CustomeTable";
import { Badge } from "@/components/ui/badge";
import Modal from "@/components/common/Model";

const data: Product[] = [
    {
        _id: "m5gr84i9",
        name: "Product name provided",
        category: "Category",
        price: 19.99,
        stock: 100,
        image: "/images/product1.jpg",
    },
    {
        _id: "m5gr84i9",
        name: "Product",
        category: "Category",
        price: 19.99,
        stock: 4,
        image: "/images/product1.jpg",
    },
];

export type Product = {
    _id: string;
    image: string;
    name: string;
    category: string;
    price: number;
    stock: number;
};

enum TYPE {
    VIEW = "view",
    EDIT = "edit",
}

export const Products = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [modalType, setModalType] = useState<TYPE>(TYPE.VIEW);

    const columns: ColumnDef<Product>[] = [
        {
            id: "select",
            header: ({ table }) => (
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) =>
                        table.toggleAllPageRowsSelected(!!value)
                    }
                    aria-label="Select all"
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: "image",
            header: "Image",
            cell: ({ row }) => (
                <div className="h-12 w-12 rounded-md bg-neutral-200"></div>
            ),
        },
        {
            accessorKey: "name",
            header: "Name",
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("name")}</div>
            ),
        },
        {
            accessorKey: "price",
            header: () => <div className="text-right">Price</div>,
            cell: ({ row }) => {
                const amount = parseFloat(row.getValue("price"));

                // Format the amount as a dollar amount
                const formatted = new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                }).format(amount);

                return (
                    <div className="text-right font-medium">{formatted}</div>
                );
            },
        },
        {
            accessorKey: "category",
            header: "Category",
            cell: ({ row }) => (
                <Badge variant="destructive">{row.getValue("category")}</Badge>
            ),
        },
        {
            accessorKey: "stock",
            header: "Stock",
            cell: ({ row }) => {
                const stock = parseInt(row.getValue("stock"));
                return (
                    <div className="lowercase">
                        {stock > 5 ? (
                            <span className="text-green-600 font-medium">
                                {stock}
                            </span>
                        ) : (
                            <span className="text-red-600 font-medium">
                                {stock}
                            </span>
                        )}
                    </div>
                );
            },
        },
        {
            id: "actions",
            header: "Actions",
            enableHiding: false,
            cell: ({ row }) => {
                return (
                    <div className="flex gap-2">
                        <Button
                            onClick={() => handleModal(TYPE.VIEW)}
                            size="icon"
                            className="bg-blue-500 hover:bg-blue-600 text-white"
                        >
                            <FaRegEye />
                        </Button>
                        <Button
                            onClick={() => handleModal(TYPE.EDIT)}
                            size="icon"
                            className="bg-orange-500 hover:bg-orange-600 text-white"
                        >
                            <CiEdit />
                        </Button>
                        <Button
                            size="icon"
                            className="bg-red-500 hover:bg-red-600 text-white"
                        >
                            <AiOutlineDelete />
                        </Button>
                    </div>
                );
            },
        },
    ];

    // handle modal
    const handleModal = (type: TYPE) => {
        setModalType(type);
        setOpen(true);
    };

    // render the component
    return (
        <div>
            <CustomeTable<Product>
                data={data}
                columns={columns}
                searchBy="name"
                searchPalceholder="Search by name"
            />
            <Modal
                open={open}
                setOpen={setOpen}
                className="h-screen w-[30%] bg-neutral-800"
                title={`Product Details - ${modalType}`}
            >
                {modalType === TYPE.VIEW && <div>View</div>}
                {modalType === TYPE.EDIT && <div>Edit</div>}
            </Modal>
        </div>
    );
};

export default Products;
