"use client";
import CustomTable from "@/components/common/CustomTable";
import Modal from "@/components/common/Model";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { FaRegEye } from "react-icons/fa6";
import BranchDetails from "./BranchDetails";
import UpdateBranch from "./UpdateBranch";
import Dialog from "@/components/common/Dialog";
import { IoAlertCircleOutline } from "react-icons/io5";

const data: Category[] = [
    {
        _id: "m5gr84i9",
        slug: "m5gr84i9",
        image: "df",
        name: "Mens Fashions",
    },
    {
        _id: "m5gr84i9",
        slug: "m5gr84i9",
        image: "df",
        name: "success",
    },
    {
        _id: "m5gr84i9",
        slug: "m5gr84i9",
        image: "df",
        name: "success",
    },
];

export type Category = {
    _id: string;
    slug: string;
    image: string;
    name: string;
};

enum TYPE {
    VIEW = "view",
    EDIT = "edit",
}

const Branch = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [modalType, setModalType] = useState<TYPE>(TYPE.VIEW);

    const columns: ColumnDef<Category>[] = [
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
            accessorKey: "slug",
            header: "Slug",
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("slug")}</div>
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
                            onClick={() => setOpenDialog(true)}
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
    return (
        <div>
            <CustomTable<Category>
                data={data}
                columns={columns}
                searchBy="name"
                searchPlaceholder="Search by name"
            />

            <Modal
                open={open}
                setOpen={setOpen}
                className="h-screen w-[30%] bg-neutral-800"
                title={`Product Details - ${modalType}`}
            >
                {modalType === TYPE.VIEW && <BranchDetails />}
                {modalType === TYPE.EDIT && <UpdateBranch />}
            </Modal>
            <Dialog
                open={openDialog}
                setOpen={setOpenDialog}
                className="h-fit bg-neutral-800 text-center p-5 flex flex-col justify-center items-center"
            >
                <IoAlertCircleOutline size={60} className="text-red-500" />
                <p className="mt-2">Are you sure?</p>
                <div className="flex items-center gap-3 mt-5 w-full">
                    <Button
                        className="w-full"
                        onClick={() => {
                            setOpenDialog(false);
                            setOpen(false);
                        }}
                    >
                        Cancle
                    </Button>
                    <Button
                        className="w-full bg-red-500 hover:bg-red-600"
                        onClick={() => setOpenDialog(false)}
                    >
                        Delete
                    </Button>
                </div>
            </Dialog>
        </div>
    );
};

export default Branch;
