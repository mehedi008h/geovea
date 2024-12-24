import React from "react";
import PageHeader from "@/components/admin/PageHeader";
import Products from "@/components/admin/product/Products";

const ProductPage = () => {
    return (
        <div>
            {/* header  */}
            <PageHeader
                title="Products"
                subTitle="Manage your all product"
                btnText="Add Product"
            />

            {/* product table  */}
            <Products />
        </div>
    );
};

export default ProductPage;
