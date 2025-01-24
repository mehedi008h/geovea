"use client";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
    decrement,
    increment,
    incrementByAmount,
} from "@/redux/slices/counterSlice";
import { useRouter } from "next/navigation";
import React from "react";

const Home = () => {
    const router = useRouter();
    const count = useAppSelector((state) => state.counter.value);
    const dispatch = useAppDispatch();
    return (
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

            <div>
                <h1>Counter: {count}</h1>
                <button onClick={() => dispatch(increment())}>Increment</button>
                <button onClick={() => dispatch(decrement())}>Decrement</button>
                <button onClick={() => dispatch(incrementByAmount(5))}>
                    Increment by 5
                </button>
            </div>
        </div>
    );
};

export default Home;
