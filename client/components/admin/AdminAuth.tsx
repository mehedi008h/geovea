"use client";

import React from "react";
import { SiFusionauth } from "react-icons/si";
import { z } from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

// form validation
const formSchema = z.object({
    email: z.string().nonempty({ message: "Email is required" }),
    password: z.string().nonempty({ message: "Password is required" }).min(6, {
        message: "Password must be at least 6 characters.",
    }),
});
const AdminAuth = () => {
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values);
        router.push("/admin/dashboard");
    }
    return (
        <div className="p-8 bg-neutral-900 rounded-md shadow xl:w-[500px] lg:w-[500px] md:w-[500px] w-full flex flex-col justify-center items-center">
            <SiFusionauth color="white" size={52} className="mb-5" />

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8 w-full"
                >
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-neutral-200">
                                    Email
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="admin@example.com"
                                        type="email"
                                        {...field}
                                        className="text-neutral-200 border focus:border-0"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-neutral-200">
                                    Password
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="example"
                                        type="password"
                                        {...field}
                                        className="text-neutral-200 border focus:border-0"
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button className="w-full h-10" type="submit">
                        Submit
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default AdminAuth;
