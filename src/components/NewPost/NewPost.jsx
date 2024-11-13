"use client";

import { newThreads } from "@/actions/newThreads";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";
import Button from "../Button/Button";

export default function NewPost({ closeModal = () => {} }) {
    const [textarea, setTextarea] = useState("");

    const { data: session } = useSession();

    const formSubmited = async (formData) => {
        try {
            newThreads(formData);
            setTextarea("");
        } catch (e) {
            toast.error(e);
        }
        closeModal();
        toast.success("Threads plublié avec succes!");
    };

    return (
        <form className="flex flex-col gap-6" action={formSubmited}>
            <div className="flex gap-4 items-center">
                <Image
                    src={session?.user.profilePicture}
                    width={70}
                    height={70}
                    className="rounded-full object-cover aspect-square"
                    alt="Profile picture"
                    unoptimized
                />
                <textarea
                    className="input !mt-0"
                    placeholder="Commencer un threads..."
                    value={textarea}
                    onChange={(e) => setTextarea(e.target.value)}
                    name="content"
                ></textarea>
            </div>
            <div className="w-fit self-end">
                <Button formButton disabled={textarea.length < 1}>
                    Poster
                </Button>
            </div>
        </form>
    );
}
