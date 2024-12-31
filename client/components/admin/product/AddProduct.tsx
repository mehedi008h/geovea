"use client";

import React, { ChangeEvent, useMemo, useState } from "react";
import PageHeader from "../PageHeader";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Product } from "@/@types";
import { categories } from "@/data";
import Image from "next/image";
import { IoCheckmarkDoneOutline, IoCloseOutline } from "react-icons/io5";
import ImageUpload from "@/components/common/ImageUpload";
import CustomeInput, { VARIENT } from "@/components/common/CustomeInput";

// form validation
const formSchema = z.object({
    name: z.string().nonempty({ message: "Product name is required" }),
    description: z
        .string()
        .nonempty({ message: "Product description is required" }),
    price: z.string().nonempty({ message: "Product price is required" }),
    quantity: z.string().nonempty({ message: "Product quantity is required" }),
    category: z.string().nonempty({ message: "Product Category is required" }),
    discountPrice: z.string().nullable(),
    stock: z.string().nullable(),
    images: z.array(z.string()).nullable(),
});

enum STEPS {
    INFO = 0,
    IMAGE = 1,
}

const AddProduct = () => {
    const [step, setStep] = useState<STEPS>(STEPS.INFO);
    const [category, setCategory] = useState<string>("");
    const [imagesPreview, setImagesPreview] = useState<string[]>([]);
    const [images, setImages] = useState<string[]>([]);
    const router = useRouter();

    const form = useForm<Product>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
            images: [],
            price: "",
            discountPrice: "",
            stock: "",
            quantity: "",
            category: "",
        },
    });

    // handle category
    const handleCategory = (item: string) => {
        setCategory(item);
        setCustomValue("category", item);
    };

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

    const removeImage = (index: number): void => {
        // Filter out the image at the specified index
        setImagesPreview((prev) => prev.filter((_, i) => i !== index));
        setImages((prev) => prev.filter((_, i) => i !== index));
    };

    // form submit function
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.

        if (step !== STEPS.IMAGE) {
            return onNext();
        }
        console.log(values);
        router.push("/admin/dashboard");
    }

    // next , prev button
    const onBack = () => {
        setStep((value) => value - 1);
    };

    const onNext = () => {
        setStep((value) => value + 1);
    };

    // action label
    const actionLabel = useMemo(() => {
        if (step === STEPS.IMAGE) {
            return "Create";
        }

        return "Next";
    }, [step]);

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.INFO) {
            return undefined;
        }

        return "Back";
    }, [step]);

    // form custome fields
    const setCustomValue = (id: any, value: any) => {
        form.setValue(id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true,
        });
    };

    // default form
    let formContent = (
        <>
            {/* product name  */}
            <CustomeInput
                name="name"
                label="Product Name"
                required
                placeholder="Enter product name"
                control={form.control}
            />

            {/* product description  */}
            <CustomeInput
                name="description"
                label="Product Description"
                required
                placeholder="Type your product description"
                control={form.control}
                varient={VARIENT.TEXTAREA}
            />

            {/* product price & quantity  */}
            <div className="flex flex-row gap-3 w-full">
                <CustomeInput
                    name="price"
                    label="Product Price"
                    required
                    placeholder="Enter product price"
                    type="number"
                    control={form.control}
                />

                <CustomeInput
                    name="quantity"
                    label="Product Quantity"
                    required
                    placeholder="Enter product quantity"
                    control={form.control}
                />
            </div>

            <CustomeInput
                name="category"
                label="Choose a Category"
                required
                placeholder="Enter product quantity"
                control={form.control}
                varient={VARIENT.CHILDREN}
            >
                <div className="w-full h-full flex flex-row flex-wrap justify-around gap-5 overflow-x-hidden overflow-y-scroll">
                    {categories.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => handleCategory(item.name)}
                            className="flex justify-center flex-col items-center gap-2"
                        >
                            <div className="p-3 rounded-full border border-neutral-400 h-[65px] w-[65px] relative cursor-pointer">
                                <Image
                                    src={item.image}
                                    width={40}
                                    height={40}
                                    objectFit="cover"
                                    className="object-cover "
                                    alt={item.name || "Category"}
                                />
                                {category === item.name && (
                                    <div className="h-[65px] w-[65px] bg-neutral-200 absolute rounded-full top-0 left-0 opacity-85 flex justify-center items-center">
                                        <IoCheckmarkDoneOutline
                                            size={40}
                                            color="green"
                                        />
                                    </div>
                                )}
                            </div>
                            <p className="text-base text-neutral-200 font-semibold">
                                {item.name}
                            </p>
                        </div>
                    ))}
                </div>
            </CustomeInput>
        </>
    );

    // when step is image then show this form
    if (step === STEPS.IMAGE) {
        formContent = (
            <>
                <CustomeInput
                    name="discountPrice"
                    label="Discount Price"
                    placeholder="Enter discount price"
                    control={form.control}
                    type="number"
                />

                <CustomeInput
                    name="stock"
                    label="Stock"
                    placeholder="Enter product stock"
                    control={form.control}
                    type="number"
                />

                <h3 className="text-neutral-200 my-5">Choose Images</h3>

                <ImageUpload uploadAvatar={uploadAvatar} />
                <div className="flex flex-row flex-wrap justify-start gap-3 my-3">
                    {imagesPreview &&
                        imagesPreview.map((image, i) => {
                            return (
                                <div
                                    key={i}
                                    className="w-20 h-20 relative cursor-pointer group transition-all"
                                >
                                    <Image
                                        src={image}
                                        width={80}
                                        height={80}
                                        objectFit="cover"
                                        className="w-full h-full rounded-md object-cover shadow-md"
                                        alt="Product Image"
                                    />
                                    <div className="h-[20px] w-[20px] bg-neutral-200 absolute rounded-full -top-1 -right-1 opacity-85 justify-center items-center hidden group-hover:flex">
                                        <IoCloseOutline
                                            onClick={() => removeImage(i)}
                                            size={20}
                                            color="red"
                                        />
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </>
        );
    }

    return (
        <div className="p-5 flex flex-col justify-between h-screen relative">
            <div className="h-screen overflow-x-scroll pb-16 px-1 hide-scroll-bar">
                <PageHeader title="Create a New Product" subTitle="" />

                <Form {...form}>
                    <div className="space-y-6 w-full mt-8 ">{formContent}</div>
                </Form>
            </div>

            <div className="flex flex-row gap-3 mt-3 absolute bottom-4 left-4 right-4">
                {secondaryActionLabel && (
                    <Button
                        onClick={step === STEPS.INFO ? undefined : onBack}
                        className="w-full h-10 bg-neutral-300 hover:bg-neutral-400 text-neutral-900"
                    >
                        {secondaryActionLabel}
                    </Button>
                )}
                {actionLabel && (
                    <Button
                        onClick={form.handleSubmit(onSubmit)}
                        className="w-full h-10"
                    >
                        {actionLabel}
                    </Button>
                )}
            </div>
        </div>
    );
};

export default AddProduct;
