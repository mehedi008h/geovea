import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar from "@/components/admin/AdminSidebar";
import React from "react";

const AdminLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
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
                <main className="p-5">
                    {/* your page content */}
                    {children}
                </main>
            </section>
        </div>
    );
};

export default AdminLayout;
