"use client";

import React, { ChangeEvent, useState } from "react";
import PageHeader from "../PageHeader";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Category } from "@/@types";
import CustomeInput from "@/components/common/CustomeInput";
import ImageUpload from "@/components/common/ImageUpload";

// form validation
const formSchema = z.object({
    name: z.string().nonempty({ message: "Category name is required" }),
    image: z.string().nullable(),
});

const AddCategory = () => {
    const [imagesPreview, setImagesPreview] = useState<string[]>([]);
    const [images, setImages] = useState<string[]>([]);

    const form = useForm<Category>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            image: "",
        },
    });

    // upload photo
    const uploadAvatar = (e: ChangeEvent<HTMLInputElement>): void => {
        if (!e.target.files) return;

        const files = Array.from(e.target.files);
        const previews: string[] = [];
        const imageFiles: string[] = [];

        files.forEach((file) => {
            const reader = new FileReader();

            reader.onload = () => {
                if (
                    reader.readyState === 2 &&
                    typeof reader.result === "string"
                ) {
                    previews.push(reader.result);
                    imageFiles.push(reader.result);

                    // Update state only after all files are processed
                    if (previews.length === files.length) {
                        setImagesPreview(previews);
                        setImages(imageFiles);
                        setCustomValue("images", imageFiles);
                    }
                }
            };

            reader.onerror = (err) => {
                console.error("Error reading file:", err);
            };

            reader.readAsDataURL(file);
        });
    };

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
                        {/* product name  */}
                        <CustomeInput
                            name="name"
                            label="Category Name"
                            required
                            placeholder="Enter category name"
                            control={form.control}
                        />

                        <h3 className="text-neutral-200 my-5">Choose Images</h3>

                        <ImageUpload uploadAvatar={uploadAvatar} />
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
