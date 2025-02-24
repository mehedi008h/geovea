import React from "react";
import { Button } from "../ui/button";

interface Props {
    title: string;
    subTitle?: string;
    onClick?: () => void;
    btnText?: string;
}

const PageHeader = ({ title, subTitle, onClick, btnText }: Props) => {
    return (
        <div className="flex flex-row justify-between items-center">
            <div>
                <h2 className="text-2xl font-semibold text-neutral-200">
                    {title}
                </h2>
                {subTitle && (
                    <h3 className="text-base font-medium text-neutral-500">
                        {subTitle}
                    </h3>
                )}
            </div>

            {btnText && (
                <Button onClick={onClick} className="rounded-full">
                    {btnText}
                </Button>
            )}
        </div>
    );
};

export default PageHeader;
