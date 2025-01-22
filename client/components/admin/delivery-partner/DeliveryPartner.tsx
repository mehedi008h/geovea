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

import Dialog from "@/components/common/Dialog";
import { IoAlertCircleOutline } from "react-icons/io5";
import DeliveryPartnerDetails from "./DeliveryPartnerDetails";
import UpdateDeliveryPartner from "./UpdateDeliveryPartner";
import { DeliveryPartnerI } from "@/@types";

const data: DeliveryPartnerI[] = [
    {
        _id: "m5gr84i9",
        slug: "m5gr84i9",
        image: "",
        name: "Mens Fashions",
        email: "df",
        phone: "3636363",
        password: "454545",
    },
    {
        _id: "m5gr84i9",
        slug: "m5gr84i9",
        image: "",
        name: "Mens Fashions",
        email: "df",
        phone: "3636363",
        password: "454545",
    },
    {
        _id: "m5gr84i9",
        slug: "m5gr84i9",
        image: "",
        name: "Mens Fashions",
        email: "df",
        phone: "3636363",
        password: "454545",
    },
];

enum TYPE {
    VIEW = "view",
    EDIT = "edit",
}

const DeliveryPartner = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [modalType, setModalType] = useState<TYPE>(TYPE.VIEW);

    const columns: ColumnDef<DeliveryPartnerI>[] = [
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
                <div className="h-12 w-12 rounded-md bg-neutral-200">
                    {row.getValue("image")}
                </div>
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
            accessorKey: "email",
            header: "Email",
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("email")}</div>
            ),
        },
        {
            accessorKey: "phone",
            header: "Phone",
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("phone")}</div>
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
            <CustomTable<DeliveryPartnerI>
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
                {modalType === TYPE.VIEW && <DeliveryPartnerDetails action={()=> {""}} secondaryAction={() => handleModal(TYPE.EDIT)}/>}
                {modalType === TYPE.EDIT && <UpdateDeliveryPartner />}
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
                        Cancel
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

export default DeliveryPartner;
