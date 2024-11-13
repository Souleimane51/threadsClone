"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { MongoClient } from "mongodb";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export async function newThreads(formData) {
    const session = await getServerSession(authOptions);

    if (!session.user) {
        throw new Error("Veuillez vous conntecter");
    }

    if (!formData.get("content") || formData.get("content").length < 1) {
        throw new Error("Veuillez bien remplire tout les champs");
    }

    // Connect to cluster
    const client = await MongoClient.connect(process.env.MONGODB_CLIENT);

    // Connect to db
    const db = client.db(process.env.MONGODB_DATABASE);

    // Connect to collection
    // prettier-ignore
    try {

        await db.collection("threads").insertOne({
            content: formData.get("content"),
            username: session.user.username,
            picture: session.user.profilePicture,
            creation: new Date()
        })
    } catch (e) {
        await client.close();
        throw new Error(e);
    }
    await client.close();
    revalidatePath("/", "/[username]");
}
