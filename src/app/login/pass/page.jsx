"use client";

import Button from "@/components/Button/Button";
import Link from "next/link";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";

export default function Pass() {
    const router = useRouter();
    const handleButtonClick = () => {
        setCookie("guest", "true");
        router.push("/");
    };

    return (
        <div className="w-[440px] mx-auto flex flex-col gap-5">
            <div className="flex gap-2 items-center">
                <Link href={"/login"}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="2em"
                        height="2em"
                        viewBox="0 0 256 256"
                    >
                        <path
                            fill="white"
                            d="M222 128a6 6 0 0 1-6 6H54.49l61.75 61.76a6 6 0 1 1-8.48 8.48l-72-72a6 6 0 0 1 0-8.48l72-72a6 6 0 0 1 8.48 8.48L54.49 122H216a6 6 0 0 1 6 6"
                        ></path>
                    </svg>
                </Link>
                <h1 className="title">Continuez en mode invité</h1>
            </div>
            <p className="text-threads-grey-light">
                Vous pouvez naviger dans Threads sans profil, mais vous ne
                pourrez pas interagir avec du contenu ni en publier
            </p>
            <div>
                <Button handleButtonClick={handleButtonClick}>Continuer</Button>
            </div>
        </div>
    );
}
