import ConnectedLayout from "@/components/ConnectedLayout/ConnectedLayout";
import UserProfile from "@/components/UserProfile/UserProfile";
import { notFound } from "next/navigation";

export default async function page({ params: { username } }) {
    if (!username) {
        notFound();
    }
    const response = await fetch("http://localhost:3000/api/user", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        cache: "no-cache",
        body: JSON.stringify({ username }),
    });
    const data = await response.json();

    return (
        <ConnectedLayout>
            <UserProfile data={data} />
        </ConnectedLayout>
    );
}
