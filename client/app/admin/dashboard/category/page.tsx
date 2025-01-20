"use client";
import AddCategory from "@/components/admin/category/AddCategory";
import Category from "@/components/admin/category/Category";
import PageHeader from "@/components/admin/PageHeader";
import Modal from "@/components/common/Model";
import React, { useState } from "react";

const CategoryPage = () => {
    const [open, setOpen] = useState<boolean>(false);
    return (
        <div>
            {/* header  */}
            <PageHeader
                title="Category"
                subTitle="Manage your all category"
                btnText="Add Category"
                onClick={() => setOpen(true)}
            />

            {/* product table  */}
            <Category />
            <Modal
                open={open}
                setOpen={setOpen}
                className="h-screen w-[30%] bg-neutral-800"
            >
                <AddCategory />
            </Modal>
        </div>
    );
};

export default CategoryPage;
