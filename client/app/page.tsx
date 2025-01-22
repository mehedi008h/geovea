"use client";
import ClientOnly from "@/components/common/ClientOnly";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

const Home = () => {
    const router = useRouter();
    return (
        <ClientOnly>
            <div className="w-screen h-screen flex flex-col justify-center items-center bg-neutral-800">
                <h1 className="text-8xl font-semibold text-neutral-100">
                    Welcome, to GEOVEA
                </h1>
                <Button
                    onClick={() => router.push("/admin")}
                    className="mt-8 rounded-full"
                    size="lg"
                    title="Hello"
                >
                    {"Let's"} Explore
                </Button>
            </div>
        </ClientOnly>
    );
};

export default Home;
