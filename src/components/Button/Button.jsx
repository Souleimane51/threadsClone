"use client";
import { useFormStatus } from "react-dom";

export default function Button({
    children,
    handleButtonClick,
    formButton,
    disabled,
}) {
    const { pending } = useFormStatus();
    return (
        <button
            disabled={(formButton && pending) || disabled}
            onClick={handleButtonClick}
            className="py-4 px-6 bg-white text-black w-full rounded-3xl font-medium hover:bg-gray-300 duration-150 disabled:opacity-50 disabled:cursor-wait"
        >
            {children}
        </button>
    );
}
