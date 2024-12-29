"use client";
import React, { useState } from "react";
import PageHeader from "@/components/admin/PageHeader";
import Products from "@/components/admin/product/Products";
import Modal from "@/components/common/Model";
import AddProduct from "@/components/admin/product/AddProduct";

const ProductPage = () => {
    const [open, setOpen] = useState(false);
    return (
        <div>
            {/* header  */}
            <PageHeader
                title="Products"
                subTitle="Manage your all product"
                btnText="Add Product"
                onClick={() => setOpen(true)}
            />

            {/* product table  */}
            <Products />
            <Modal
                open={open}
                setOpen={setOpen}
                className="h-screen w-[30%] bg-neutral-800"
            >
                <AddProduct />
            </Modal>
        </div>
    );
};

export default ProductPage;
