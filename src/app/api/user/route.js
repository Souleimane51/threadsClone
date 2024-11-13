import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(rep) {
    try {
        const data = await rep.json();
        let { username } = data;
        username = username.slice(3);

        const client = await MongoClient.connect(process.env.MONGODB_CLIENT);
        const db = client.db(process.env.MONGODB_DATABASE);

        let user = await db
            .collection("users")
            .find({ username })
            .limit(1)
            .toArray();

        if (user.length === 0) {
            await client.close();
            throw new Error(
                "Cette utilisateur n'existe pas ou son compte a été supprimé"
            );
        }

        user = user.map((user) => ({
            ...user,
            _id: user._id.toString(),
        }))[0];

        let posts = await db
            .collection("threads")
            .find({ username })
            .sort({ creation: -1 })
            .toArray();

        posts = posts.map((post) => ({
            ...post,
            _id: post._id.toString(),
        }));

        await client.close();
        return NextResponse.json({ user, posts }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
