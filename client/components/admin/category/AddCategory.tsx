"use client";

import React, { useState } from "react";
import PageHeader from "../PageHeader";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Category } from "@/@types";
import CustomInput from "@/components/common/CustomInput";
import ImageUpload from "@/components/common/ImageUpload";

// form validation
const formSchema = z.object({
    name: z.string().nonempty({ message: "Category name is required" }),
    image: z.string().nullable(),
});

const AddCategory = () => {
    const [image, setImage] = useState<string>("");

    const form = useForm<Category>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            image: "",
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
    return (
        <div className="p-5 flex flex-col justify-between h-screen relative">
            <div className="h-screen overflow-x-scroll pb-16 px-1 hide-scroll-bar">
                <PageHeader
                    title="Create a New Category"
                    subTitle="Please fill up required information"
                />

                <Form {...form}>
                    <div className="space-y-6 w-full mt-8 ">
                        {/* category name  */}
                        <CustomInput
                            name="name"
                            label="Category Name"
                            required
                            placeholder="Enter category name"
                            control={form.control}
                        />

                        {/* category image */}
                        <h3 className="text-neutral-200 my-5">Choose Image</h3>
                        <div className="w-full flex justify-center">
                            <ImageUpload
                                id="image"
                                setCustomValue={setCustomValue}
                                setData={setImage}
                                show
                                className="h-[200px] w-[200px] rounded-full"
                            />
                        </div>
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

export default AddCategory;
