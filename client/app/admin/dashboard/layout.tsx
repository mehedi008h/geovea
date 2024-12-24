import AdminSidebar from "@/components/admin/AdminSidebar";
import React from "react";

const AdminLayout = () => {
    return (
        <div className="w-full h-full bg-neutral-800 text-neutral-200 flex flex-row">
            {/* sidebar  */}
            <aside className="">
                <AdminSidebar />
            </aside>

            <main>
                {/* content  */}
                <div className="p-8">
                    <h1>Admin Dashboard</h1>
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
