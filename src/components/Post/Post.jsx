"use client";

import { deletePost } from "@/actions/deletePost";
import "moment/locale/fr";
import moment from "moment/moment";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Post({ post }) {
    const [optionsOpen, setOptionsOpen] = useState(false);
    const { data: session } = useSession();

    const handlePostDeletion = async () => {
        if (!confirm("Are you sure?")) return;
        try {
            await deletePost(post._id);
        } catch (e) {
            console.log(e.message);
        }
    };
    return (
        <div className="flex gap-6 md:px-[5vh] px-0 py-8 lg:w-[100%] max-w-[1000px] mx-auto items-start border-b border-threads-grey-dark rounded-md hover:bg-threads-grey-dark duration-150">
            <Image
                src={post.picture}
                alt="Profile Picture"
                className="rounded-full object-cover aspect-square"
                width={40}
                height={40}
            />
            <div className="w-full">
                <div className="w-full flex justify-between items-center mb-3">
                    <Link href={`/@${post.username}`}>
                        <p className="font-semibold">{post.username}</p>
                    </Link>
                    <div className="flex items-cneter gap-1 text-sm text-threads-grey-light relative">
                        <p>
                            {moment
                                .utc(post.creation, "YYYY MM DD HH:mm:ss")
                                .fromNow()}
                        </p>
                        {session?.user?.email && (
                            <div>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="1em"
                                    height="1em"
                                    viewBox="0 0 256 256"
                                    className="cursor-pointer"
                                    onClick={() =>
                                        setOptionsOpen((prev) => !prev)
                                    }
                                >
                                    <path
                                        fill="currentColor"
                                        d="M144 128a16 16 0 1 1-16-16a16 16 0 0 1 16 16m-84-16a16 16 0 1 0 16 16a16 16 0 0 0-16-16m136 0a16 16 0 1 0 16 16a16 16 0 0 0-16-16"
                                    ></path>
                                </svg>
                            </div>
                        )}
                        {optionsOpen && session?.user && (
                            <div className="options">
                                {session?.user &&
                                session.user.username != post.username ? (
                                    <div className="option">Signaler</div>
                                ) : (
                                    <>
                                        <div className="option">Modifier</div>
                                        <div
                                            className="option"
                                            onClick={handlePostDeletion}
                                        >
                                            Suprimer
                                        </div>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>
                <p className="whitespace-pre-line">{post.content}</p>
            </div>
        </div>
    );
}
