"use client";
import AddDeliveryPartner from "@/components/admin/delivery-partner/AddDeliveryPartner";
import DeliveryPartner from "@/components/admin/delivery-partner/DeliveryPartner";
import PageHeader from "@/components/admin/PageHeader";
import Modal from "@/components/common/Model";
import React, { useState } from "react";

const DeliveryPartnerPage = () => {
    const [open, setOpen] = useState<boolean>(false);
    return (
        <main>
            {/* header  */}
            <PageHeader
                title="Delivery Partner"
                subTitle="Manage your all Delivery Partner"
                btnText="Add Delivery Partner"
                onClick={() => setOpen(true)}
            />

            {/* delivery partner table  */}
            <DeliveryPartner />
            <Modal
                open={open}
                setOpen={setOpen}
                className="h-screen w-[30%] bg-neutral-800"
            >
                <AddDeliveryPartner />
            </Modal>
        </main>
    );
};

export default DeliveryPartnerPage;
