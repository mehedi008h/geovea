"use client";

import React, { useMemo, useState } from "react";
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

    // handle images
    const handleImages = (item: string) => {
        setImages((prev) => [...prev, item]);
        setCustomValue("images", [...images, item]);
    };

    // remove image
    const removeImage = (index: number): void => {
        setImages((prev) => prev.filter((_, i) => i !== index));
        setCustomValue("images", [...images.filter((_, i) => i !== index)]);
    };

    // form submit function
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.

        if (step !== STEPS.IMAGE) {
            return onNext();
        }
        console.log("Data: ", values);
        // router.push("/admin/dashboard");
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

                <div className="flex flex-row flex-wrap justify-start gap-3 my-3">
                    {images &&
                        images.map((image, i) => {
                            return (
                                <div
                                    key={i}
                                    className="w-[200px] h-[200px] border border-dashed border-neutral-600 rounded-md relative cursor-pointer group transition-all"
                                >
                                    <Image
                                        src={image}
                                        width={100}
                                        height={100}
                                        className="w-[200px] h-[200px] rounded-md object-contain"
                                        alt="Product Image"
                                    />
                                    <div
                                        onClick={() => removeImage(i)}
                                        className="h-[20px] w-[20px] bg-neutral-200 absolute rounded-full -top-1 -right-1 opacity-85 justify-center items-center hidden group-hover:flex"
                                    >
                                        <IoCloseOutline size={20} color="red" />
                                    </div>
                                </div>
                            );
                        })}
                    <ImageUpload
                        setCustomValue={setCustomValue}
                        setData={handleImages}
                        className="w-[200px] h-[200px] rounded-md"
                    />
                </div>
            </>
        );
    }

    return (
        <div className="p-5 flex flex-col justify-between h-screen relative">
            <div className="h-screen overflow-x-scroll pb-16 px-1 hide-scroll-bar">
                <PageHeader
                    title="Create a New Product"
                    subTitle="Please fill up required information"
                />

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
