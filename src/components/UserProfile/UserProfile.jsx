"use client";

import Post from "@/components/Post/Post";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { toast } from "react-toastify";
import Button from "../Button/Button";

export default function UserProfile({ data }) {
    const [user, setUser] = useState([]);
    const [posts, setPosts] = useState([]);
    const [profilePicture, setProfilePicture] = useState("");
    const [bio, setBio] = useState("");
    const [url, setUrl] = useState("");
    const [openModal, setOpenModal] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const { data: session } = useSession();

    console.log(session);

    useEffect(() => {
        if (data.user) {
            setUser(data?.user);
            setPosts(data?.posts);
        } else {
            router.push("/");
            toast.error("Cet utilisateur n'exicte pas");
        }
    }, []);

    useEffect(() => {
        if (openModal) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [openModal]);

    const editProfile = () => {
        setProfilePicture(user.profilePicture);
        setBio(user.bio);
        setUrl(user.url);
        setOpenModal(true);
    };

    const handleUserEdition = async () => {
        if (isLoading) return;
        setIsLoading(true);

        const response = await fetch("/api/editprofile", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-cache",
            body: JSON.stringify({
                username: user.username,
                profilePicture,
                bio,
                url,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            setIsLoading(false);
            toast.error("Une erreur est survenue, veuiller reesayyer");
            return;
        }

        const newUser = {
            ...user,
            profilePicture: profilePicture,
            bio: bio,
            url: url,
        };

        setUser(newUser);
        setOpenModal(false);
        setIsLoading(false);
        toast.success("Profile mis a jour avec succés");
    };

    return (
        <>
            {openModal &&
                createPortal(
                    <div
                        className="modale-background"
                        onClick={(e) => {
                            e.target === e.currentTarget && setOpenModal(false);
                        }}
                    >
                        <div className="modale-user-foreground">
                            <div className="flex gap-3">
                                <div className="flex-1">
                                    <label className="label" htmlFor="picture">
                                        Prile Picture
                                    </label>
                                    <input
                                        type="url"
                                        name="picture"
                                        id="picture"
                                        className="input"
                                        placeholder="https://www.profilepicture.com"
                                        value={profilePicture}
                                        onChange={(e) =>
                                            setProfilePicture(e.target.value)
                                        }
                                    />
                                </div>
                                <div>
                                    <Image
                                        src={user.profilePicture}
                                        alt="User profile picture"
                                        width={100}
                                        height={100}
                                        className="rounded-full object-cover aspect-square"
                                        unoptimized
                                    />
                                </div>
                            </div>

                            <div className="mt-5">
                                <label className="label" htmlFor="bio">
                                    Bio
                                </label>
                                <textarea
                                    name="bio"
                                    id="bio"
                                    className="input"
                                    placeholder="Bio"
                                    value={bio}
                                    onChange={(e) => setBio(e.target.value)}
                                ></textarea>
                            </div>
                            <div className="mt-5">
                                <label className="label" htmlFor="url">
                                    Site web
                                </label>
                                <input
                                    type="url"
                                    name="url"
                                    id="url"
                                    className="input"
                                    placeholder="https://wwww.fred.com"
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                />
                            </div>
                            <div className="flex justify-end mt-5">
                                <div>
                                    <Button
                                        handleButtonClick={handleUserEdition}
                                        disabled={isLoading}
                                    >
                                        Update
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>,
                    document.body
                )}
            <div className="text-whitelg:w-[60%] max-w-[1000px] mx-auto mt-24 text-white">
                <div className="flex justify-between">
                    <div className="md:w-[70%] flex flex-col gap-4">
                        <h1 className="text-3xl font-semibold">{user?.name}</h1>
                        <p className="text-sm text-threads-grey-light font-medium">
                            @{user?.username}
                        </p>
                        <p className="whitespace-break-spaces">{user?.bio}</p>
                        {user?.url && (
                            <div className="text-blue-400 hover:text-blue-500 duration-150 inline-block">
                                <a href={"/"}>{user.url}</a>
                            </div>
                        )}
                    </div>
                    <div>
                        <Image
                            src={user.profilePicture}
                            alt="User's porfile piture"
                            width={100}
                            height={100}
                            className="rounded-full object-cover mt-2 aspect-square"
                            unoptimized
                        />
                    </div>
                </div>
                {session?.user?.username === user?.username && (
                    <div className="user-button" onClick={() => editProfile()}>
                        Modifier votre profile
                    </div>
                )}
                <div className="flex mt-10">
                    <div className="grow border-b border-white py-4 px-4 text-center hover:bg-threads-grey-dark duration-150 cursor-pointer">
                        Threads
                    </div>
                    <div className="grow border-b border-threads-grey-light text-threads-grey-light py-4 px-4 text-center hover:bg-threads-grey-dark hover:border-white hover:text-white duration-150 cursor-pointer">
                        Responses
                    </div>
                    <div className="grow border-b border-threads-grey-light text-threads-grey-light py-4 px-4 text-center hover:bg-threads-grey-dark hover:border-white hover:text-white duration-150 cursor-pointer">
                        Reposts
                    </div>
                </div>
                <div>
                    {posts.map((post) => (
                        <div key={post._id}>
                            <Post post={post} />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
