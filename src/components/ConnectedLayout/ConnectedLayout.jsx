"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Button from "../Button/Button";
import Footer from "../Footer/Footer";
import NewPost from "../NewPost/NewPost";

export default function ConnectedLayout({ children }) {
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        if (openModal) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [openModal]);

    const pathname = usePathname();

    // Contain the jwt
    const { data: session } = useSession();

    return (
        <section className="min-h-screen flex flex-col px-5">
            {openModal &&
                createPortal(
                    <div
                        className="modale-background"
                        onClick={(e) => {
                            if (e.target === e.currentTarget) {
                                setOpenModal(false);
                            }
                        }}
                    >
                        <div className="modale-foreground">
                            <NewPost closeModal={() => setOpenModal(false)} />
                        </div>
                    </div>,
                    document.body
                )}
            <header className="flex justify-between items-center py-4">
                <nav className="flex items-center justify-center gap-5 absolute pt-4 top-0 left-0 right-0">
                    <Link href={"/"}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`box-content w-10 h-10 rounded-xl p-2 hover:bg-threads-grey-dark duration-150 ${
                                pathname !== "/"
                                    ? "text-threads-grey-light"
                                    : "text-white"
                            }`}
                            viewBox="0 0 256 256"
                        >
                            <path
                                fill="currentColor"
                                d="m222.14 105.85l-80-80a20 20 0 0 0-28.28 0l-80 80A19.86 19.86 0 0 0 28 120v96a12 12 0 0 0 12 12h64a12 12 0 0 0 12-12v-52h24v52a12 12 0 0 0 12 12h64a12 12 0 0 0 12-12v-96a19.86 19.86 0 0 0-5.86-14.15M204 204h-40v-52a12 12 0 0 0-12-12h-48a12 12 0 0 0-12 12v52H52v-82.35l76-76l76 76Z"
                            ></path>
                        </svg>
                    </Link>
                    <Link href={"/search"}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`box-content w-10 h-10 rounded-xl p-2 hover:bg-threads-grey-dark duration-150 ${
                                pathname !== "/search"
                                    ? "text-threads-grey-light"
                                    : "text-white"
                            }`}
                            viewBox="0 0 256 256"
                        >
                            <path
                                fill="currentColor"
                                d="M232.49 215.51L185 168a92.12 92.12 0 1 0-17 17l47.53 47.54a12 12 0 0 0 17-17ZM44 112a68 68 0 1 1 68 68a68.07 68.07 0 0 1-68-68"
                            ></path>
                        </svg>
                    </Link>
                    {session?.user?.email && (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={
                                "box-content w-10 h-10 rounded-xl p-2 hover:bg-threads-grey-dark duration-150 text-threads-grey-light cursor-pointer"
                            }
                            viewBox="0 0 256 256"
                            onClick={() => setOpenModal(true)}
                        >
                            <path
                                fill="currentColor"
                                d="M224.11 31.92a68 68 0 0 0-96.11-.05l-70.12 69.3A19.9 19.9 0 0 0 52 115.31V187l-28.48 28.51a12 12 0 0 0 17 17L69 204h71.7a19.87 19.87 0 0 0 14.15-5.86h.05l69.21-70a68.06 68.06 0 0 0 0-96.22m-79.21 17A44 44 0 0 1 210 108h-45l27.52-27.51a12 12 0 0 0-17-17L124 115V69.54ZM76 117l24-23.72V139l-24 24Zm63 63H93l48-48h45.5Z"
                            ></path>
                        </svg>
                    )}
                    {session?.user?.email && (
                        <Link href={`@${session.user.username}`}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className={`box-content w-10 h-10 rounded-xl p-2 hover:bg-threads-grey-dark duration-150 ${
                                    pathname !== `/@${session.user.username}`
                                        ? "text-threads-grey-light"
                                        : "text-white"
                                }`}
                                viewBox="0 0 256 256"
                            >
                                <path
                                    fill="currentColor"
                                    d="M234.38 210a123.36 123.36 0 0 0-60.78-53.23a76 76 0 1 0-91.2 0A123.36 123.36 0 0 0 21.62 210a12 12 0 1 0 20.77 12c18.12-31.32 50.12-50 85.61-50s67.49 18.69 85.61 50a12 12 0 0 0 20.77-12M76 96a52 52 0 1 1 52 52a52.06 52.06 0 0 1-52-52"
                                ></path>
                            </svg>
                        </Link>
                    )}
                </nav>
                <Link href={"/"} className="z-10">
                    <Image
                        src="/logo.png"
                        alt="Logo Threads"
                        width={40}
                        height={40}
                    />
                </Link>

                <div className="z-10">
                    {/* We can make verification with session.user as this is how it is called */}
                    {session?.user ? (
                        // Sign out user (next-auth will automatically delete the jwt)
                        <Button handleButtonClick={() => signOut()}>
                            Se déconecter
                        </Button>
                    ) : (
                        <Link href={"/login"}>
                            <Button>Se connecter</Button>
                        </Link>
                    )}
                </div>
            </header>
            <div className="grow">{children}</div>
            <Footer />
        </section>
    );
}
