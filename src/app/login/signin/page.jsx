"use client";

import Button from "@/components/Button/Button";
import { emailChecker } from "@/utils/emailChecker";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";

export default function signin() {
    const router = useRouter();

    async function signInUser(formData) {
        const email = formData.get("email");
        const password = formData.get("password");

        if (!email || !password) {
            return toast.error("Veuillez bien remplire tout les champs");
        }

        if (!emailChecker(email)) {
            return toast.error("Veuillez entrer une addresse email valide");
        }

        try {
            // SignIn is a built in next auth methond that allow the user to sign in according to the provider wanted
            // for exemple here we use the provider "credentials" which is setted in the route file.
            // For this provider we need an email and a password so we give them and set redirect to false as we do it ourselves
            const response = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (response.error) {
                return toast.error(response.error);
            }
        } catch (e) {
            return toast.error(e.message);
        }

        toast.success("Vous avez bien était authentifié");
        router.replace("/");
    }

    return (
        <div className="w-[440px] mx-auto flex flex-col gap-2">
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
                <h1 className="title">Connectez-vous</h1>
            </div>
            <form className="flex flex-col" action={signInUser}>
                <input
                    type="email"
                    className="input"
                    placeholder="Email Adress"
                    name="email"
                    required
                />
                <input
                    type="password"
                    className="input mb-6"
                    placeholder="Password"
                    name="password"
                    required
                />
                <Button formButton>Se connecter</Button>
            </form>
            <div>
                <div className="flex justify-center items-center gap-3 mb-3">
                    <span className="h-[2px] w-[30%] bg-threads-grey-light rounded-full"></span>
                    <span className="text-threads-grey-light mb-1">ou</span>
                    <span className="h-[2px] w-[30%] bg-threads-grey-light rounded-full"></span>
                </div>
                <Link href={"/login/signup"}>
                    <Button>Créer un compte</Button>
                </Link>
            </div>
        </div>
    );
}
