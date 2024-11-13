"use client";

import Button from "@/components/Button/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { newUser } from "../../../actions/newUser";
import { toast } from "react-toastify";
import { emailChecker } from "@/utils/emailChecker";

export default function Signup() {
    const router = useRouter();

    async function createUser(formData) {
        const name = formData.get("name");
        const username = formData.get("username");
        const email = formData.get("email");
        const password = formData.get("password");

        let regex = /^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,6}$/;
        // prettier-ignore
        if (!name || !username || !email || !password) {
            return toast.error("Veuillez bien remplire tout les champs");
        }

        if (!emailChecker(email)) {
            return toast.error("Veuillez entrer une addresse email valide");
        }

        try {
            await newUser(name, username, email, password);
        } catch (e) {
            return toast.error(e.message);
        }

        toast.success("Votre compte a bien êtait créer");
        router.push("/login/signin");
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
                <h1 className="title">Inscrivez-vous</h1>
            </div>
            <form className="flex flex-col" action={createUser}>
                <input
                    type="text"
                    className="input"
                    placeholder="Name"
                    name="name"
                    required
                />
                <input
                    type="text"
                    className="input"
                    placeholder="Username"
                    name="username"
                    required
                />
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
                <Button formButton>S'inscrire</Button>
            </form>
            <div>
                <div className="flex justify-center items-center gap-3 mb-3">
                    <span className="h-[2px] w-[30%] bg-threads-grey-light rounded-full"></span>
                    <span className="text-threads-grey-light mb-1">ou</span>
                    <span className="h-[2px] w-[30%] bg-threads-grey-light rounded-full"></span>
                </div>
                <Link href={"/login/signin"}>
                    <Button>Se connecter</Button>
                </Link>
            </div>
        </div>
    );
}
