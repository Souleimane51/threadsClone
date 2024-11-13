import ConnectedLayout from "@/components/ConnectedLayout/ConnectedLayout";
import NewPost from "@/components/NewPost/NewPost";
import Post from "@/components/Post/Post";
import { MongoClient } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Index() {
    const session = await getServerSession(authOptions);

    console.log("SEESION ==>", session);

    let posts, client;
    try {
        client = await MongoClient.connect(process.env.MONGODB_CLIENT);
        const db = client.db(process.env.MONGODB_DATABASE);

        posts = await db
            .collection("threads")
            .find({})
            .sort({ creation: -1 })
            .toArray();

        posts = posts.map((post) => ({
            ...post,
            _id: post._id.toString(),
        }));

        client.close();
    } catch (e) {
        client.close();
        console.log(e.message);
    }
    return (
        <ConnectedLayout>
            <div className="text-white mt-14 ">
                {session?.user && (
                    <div className="border-b border-threads-grey-dark py-4 md:px-[5vh] px-0 max-w-[1000px] mx-auto">
                        <NewPost />
                    </div>
                )}
                {posts.map((post) => (
                    <div key={post._id}>
                        <Post post={post} />
                    </div>
                ))}
            </div>
        </ConnectedLayout>
    );
}
