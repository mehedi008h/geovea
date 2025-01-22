"use client";
import AddBranch from "@/components/admin/branch/AddBranch";
import Branch from "@/components/admin/branch/Branch";
import PageHeader from "@/components/admin/PageHeader";
import Modal from "@/components/common/Model";
import React, { useState } from "react";

const BranchPage = () => {
    const [open, setOpen] = useState<boolean>(false);
    return (
        <main>
            {/* header  */}
            <PageHeader
                title="Branch"
                subTitle="Manage your all category"
                btnText="Add Branch"
                onClick={() => setOpen(true)}
            />

            {/* product table  */}
            <Branch />
            <Modal
                open={open}
                setOpen={setOpen}
                className="h-screen w-[30%] bg-neutral-800"
            >
                <AddBranch />
            </Modal>
        </main>
    );
};

export default BranchPage;
