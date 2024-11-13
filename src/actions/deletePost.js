"use server";

import { MongoClient, ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";

export async function deletePost(id) {
    console.log("ID ==>", id);
    const client = await MongoClient.connect(process.env.MONGODB_CLIENT);

    try {
        const db = client.db(process.env.MONGODB_DATABASE);

        // Ensure id is converted to an ObjectId if needed
        const result = await db
            .collection("threads")
            .deleteOne({ _id: new ObjectId(id) });

        // Log the outcome to confirm success or failure
        if (result.deletedCount === 1) {
            console.log("Post deleted successfully");
        } else {
            console.log("No post found with the given ID");
        }
        revalidatePath("/", "/[username]");
    } catch (e) {
        console.error("Error deleting post:", e);
        throw new Error("Failed to delete post");
    } finally {
        await client.close();
    }
}
