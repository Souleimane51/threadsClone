import { MongoClient } from "mongodb";
import { NextResponse } from "next/dist/server/web/spec-extension/response";

export async function POST(req) {
    const data = await req.json();

    const username = data.username;
    const profilePicture = data.profilePicture;
    let bio = data.bio;
    const url = data.url;

    if (!bio) {
        bio = "-";
    }

    let client;
    try {
        client = await MongoClient.connect(process.env.MONGODB_CLIENT);
        const db = client.db(process.env.MONGODB_DATABASE);
        let user = await db
            .collection("users")
            .find({ username })
            .limit(1)
            .toArray();

        if (user.length === 0) {
            await client.close();
            return NextResponse.json(
                {
                    error: "User not found",
                },
                { status: 404 }
            );
        }

        await db.collection("users").updateOne(
            { username },
            {
                $set: { profilePicture, bio, url },
            }
        );
        await client.close();
        return NextResponse.json({ user }, { status: 200 });
    } catch (e) {
        await client.close();
        return NextResponse.json(
            {
                error: e.message,
            },
            { status: 500 }
        );
    }
}
