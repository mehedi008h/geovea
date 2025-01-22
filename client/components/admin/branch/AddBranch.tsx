"use client";

import React, { useMemo, useState } from "react";
import PageHeader from "../PageHeader";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Branch } from "@/@types";
import CustomInput from "@/components/common/CustomInput";
import dynamic from "next/dynamic";
import CountrySelect, {
    CountrySelectValue,
} from "@/components/common/CountrySelect";
import Dialog from "@/components/common/Dialog";
import { IoAlertCircleOutline } from "react-icons/io5";
import { MdOutlineDeliveryDining } from "react-icons/md";

// form validation
const formSchema = z.object({
    name: z.string().nonempty({ message: "Branch name is required" }),
    address: z.string().nonempty({ message: "Branch address is required" }),
});

const AddBranch = () => {
    const [location, setLocation] = useState<CountrySelectValue>();
    const [open, setOpen] = useState<boolean>(false);

    const form = useForm<Branch>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            address: "",
        },
    });

    // form custome fields
    const setCustomValue = (id: any, value: any) => {
        form.setValue(id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true,
        });
    };

    // form submit function
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.

        console.log(values);
    }

    const Map = useMemo(
        () =>
            dynamic(() => import("../../common/Map"), {
                ssr: false,
            }),
        [location]
    );
    return (
        <div className="p-5 flex flex-col justify-between h-screen relative">
            <div className="h-screen overflow-x-scroll pb-16 px-1 hide-scroll-bar">
                <PageHeader
                    title="Create a New Branch"
                    subTitle="Please fill up required information"
                />

                <Form {...form}>
                    <div className="space-y-6 w-full mt-8 ">
                        {/* branch name  */}
                        <CustomInput
                            name="name"
                            label="Branch Name"
                            required
                            placeholder="Enter branch name"
                            control={form.control}
                        />

                        {/* branch address  */}
                        <CustomInput
                            name="address"
                            label="Branch Address"
                            required
                            placeholder="Enter branch address"
                            control={form.control}
                        />

                        <CountrySelect
                            value={location}
                            onChange={(value) =>
                                setLocation(value as CountrySelectValue)
                            }
                        />
                        {/* <hr />
                        <Map center={location?.latlng} /> */}
                        <Button
                            className="w-full bg-orange-500 hover:bg-orange-400"
                            onClick={() => {
                                setOpen(true);
                            }}
                        >
                            <MdOutlineDeliveryDining size={35} /> Add Delivery
                            Partner
                        </Button>
                    </div>
                </Form>

                <Dialog
                    open={open}
                    setOpen={setOpen}
                    className="h-fit w-[500px] bg-neutral-800 text-center p-5 flex flex-col justify-center items-center"
                >
                    <IoAlertCircleOutline size={60} className="text-red-500" />
                    <p className="mt-2">Are you sure?</p>
                    <div className="flex items-center gap-3 mt-5 w-full">
                        <Button
                            className="w-full"
                            onClick={() => {
                                setOpen(false);
                            }}
                        >
                            Cancle
                        </Button>
                        <Button
                            className="w-full bg-red-500 hover:bg-red-600"
                            onClick={() => setOpen(false)}
                        >
                            Delete
                        </Button>
                    </div>
                </Dialog>
            </div>

            <div className="flex flex-row gap-3 mt-3 absolute bottom-4 left-4 right-4">
                <Button
                    onClick={form.handleSubmit(onSubmit)}
                    className="w-full h-10"
                >
                    Create
                </Button>
            </div>
        </div>
    );
};

export default AddBranch;
