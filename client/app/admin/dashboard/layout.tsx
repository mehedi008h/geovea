import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar from "@/components/admin/AdminSidebar";
import React from "react";

const AdminLayout = () => {
    return (
        <div className="w-full h-full bg-neutral-800 text-neutral-200 flex flex-row">
            {/* sidebar  */}
            <aside className="">
                <AdminSidebar />
            </aside>

            <section className="w-full">
                {/* header  */}
                <AdminHeader />
                {/* content  */}
                <main className="p-2">
                    {/* your page content */}
                    <h1>Admin Dashboard</h1>
                    <p>Welcome to the admin dashboard</p>
                </main>
            </section>
        </div>
    );
};

export default AdminLayout;
