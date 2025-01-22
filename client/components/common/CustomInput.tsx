import React from "react";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

export enum VARIANT {
    INPUT = "input",
    SELECT = "select",
    TEXTAREA = "textarea",
    CHILDREN = "children",
}

interface Props {
    name: string;
    label: string;
    placeholder?: string;
    required?: boolean;
    type?: React.HTMLInputTypeAttribute | undefined;
    control: any;
    variant?: VARIANT;
    children?: React.ReactNode;
}

const CustomInput = ({
    name,
    label,
    placeholder,
    required,
    type,
    control,
    variant = VARIANT.INPUT,
    children,
}: Props) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className="w-full">
                    {label && (
                        <FormLabel className="text-neutral-200 flex">
                            {label}
                            {required && <p className="text-red-500 ms-1">*</p>}
                        </FormLabel>
                    )}
                    <FormControl>
                        {/* other fields  */}
                        {variant === VARIANT.CHILDREN ? (
                            children
                        ) : variant === VARIANT.TEXTAREA ? (
                            <Textarea
                                placeholder={placeholder}
                                {...field}
                                className="text-neutral-200 border focus:border-primary border-neutral-400"
                            />
                        ) : (
                            <Input
                                placeholder={placeholder}
                                {...field}
                                type={type}
                                className="text-neutral-200 border focus:border-primary focus:outline-none outline-none border-neutral-400"
                            />
                        )}
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default CustomInput;
