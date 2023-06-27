"use client";

import { decrement, increment } from "@/store/features/counter.slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks.redux";

export default function HomePage() {
    const count = useAppSelector((state) => state.counter.counter);
    const dispatch = useAppDispatch();

    const incrementHandle = () => {
        dispatch(increment());
    };

    const decrementHandle = () => {
        dispatch(decrement());
    };
    return (
        <>
            <h1>Total: {count}</h1>

            <button onClick={incrementHandle}>Increment</button>
            <br />
            <button onClick={decrementHandle}>Decrement</button>
        </>
    );
}
