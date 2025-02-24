import React from "react";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";

interface Props {
    name: string;
    label: string;
    placeholder?: string;
    required?: boolean;
    control: any;
}

const CustomSelect = ({
    name,
    label,
    placeholder,
    required,
    control,
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
                    <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                    >
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder={placeholder} />
                            </SelectTrigger>
                            {/* other fields  */}
                            {/* {variant === VARIANT.CHILDREN ? (
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
                        )} */}
                        </FormControl>
                        <SelectContent>
                            <SelectItem value="m@example.com">
                                m@example.com
                            </SelectItem>
                            <SelectItem value="m@google.com">
                                m@google.com
                            </SelectItem>
                            <SelectItem value="m@support.com">
                                m@support.com
                            </SelectItem>
                        </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default CustomSelect;
