import PageHeader from "@/components/admin/PageHeader";
import React from "react";

const ProductPage = () => {
    return (
        <div>
            {/* header  */}
            <PageHeader
                title="Products"
                subTitle="Manage your all product"
                btnText="Add Product"
            />
        </div>
    );
};

export default ProductPage;
