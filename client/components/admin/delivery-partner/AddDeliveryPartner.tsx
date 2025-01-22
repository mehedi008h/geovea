"use client";

import React from "react";
import PageHeader from "../PageHeader";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import CustomInput from "@/components/common/CustomInput";
import { DeliveryPartnerI } from "@/@types";
import { z } from "zod";

// form validation
const formSchema = z.object({
    name: z.string().nonempty({ message: "Delivery partner name is required" }),
    email: z
        .string()
        .nonempty({ message: "Delivery partner email is required" }),
    phone: z
        .string()
        .nonempty({ message: "Delivery partner phone is required" }),
    password: z
        .string()
        .nonempty({ message: "Delivery partner password is required" }),
});

const AddDeliveryPartner = () => {
    const form = useForm<DeliveryPartnerI>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            password: "",
        },
    });

    // form submit function
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.

        console.log(values);
    }
    return (
        <div className="p-5 flex flex-col justify-between h-screen relative">
            <div className="h-screen overflow-x-scroll pb-16 px-1 hide-scroll-bar">
                <PageHeader
                    title="Add a New Delivery Partner"
                    subTitle="Please fill up required information"
                />

                <Form {...form}>
                    <div className="space-y-6 w-full mt-8 ">
                        {/* delivery partner name  */}
                        <CustomInput
                            name="name"
                            label="Delivery Partner Name"
                            required
                            placeholder="RedX Bd"
                            control={form.control}
                        />

                        {/* delivery partner email  */}
                        <CustomInput
                            name="email"
                            label="Delivery Partner email"
                            required
                            placeholder="delivery@example.com"
                            type="email"
                            control={form.control}
                        />

                        {/* delivery partner phone  */}
                        <CustomInput
                            name="phone"
                            label="Delivery Partner phone"
                            required
                            placeholder="+8801992343434"
                            type="number"
                            control={form.control}
                        />

                        {/* delivery partner password  */}
                        <CustomInput
                            name="password"
                            label="Delivery Partner Password"
                            required
                            placeholder="******"
                            control={form.control}
                        />
                    </div>
                </Form>
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

export default AddDeliveryPartner;
