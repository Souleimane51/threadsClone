import bcrypt from "bcrypt";
import { MongoClient } from "mongodb";
import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";

// Handle the connection
export const authOptions = {
    // Where we put all the connection options
    providers: [
        // Credentials is a built-in connection option of nextAuth which needs an email and a password to login the user but there a more like login with google, facebook, gitHub and more
        Credentials({
            // We have to name it to be able to call this provider when the user clicks on the login button
            name: "credentials",

            // To set some settings for the form that will be used in the login page (not needed)
            credentials: {},

            // This is where we will check the information sent by the user and create the jwt which will be the user's informations,
            // "credentials" is the data sent by the user thhrough the fields (the fields data)
            // If at the end we return a user object then it is all good the jwt is created however if we return null the there will be an error.
            async authorize(credentials) {
                // We extract the email and password from the credentials
                const { email, password } = credentials;

                // Then we make sure everything is all good like right email address, wright pasword
                try {
                    const client = await MongoClient.connect(
                        process.env.MONGODB_CLIENT
                    );
                    const db = client.db(process.env.MONGODB_DATABASE);
                    let user = await db
                        .collection("users")
                        .find({ email })
                        .limit(1)
                        .toArray();

                    if (user.length === 0) {
                        await client.close();
                        throw new Error("Cet utilisateur n'exicte pas");
                    }

                    const isPasswordValid = await bcrypt.compare(
                        password,
                        user[0].password
                    );

                    if (!isPasswordValid) {
                        client.close();
                        throw new Error("Mot de passe incorrect");
                    }

                    // Then we create the user object that will be retured in the jwt
                    user = user.map((user) => ({
                        _id: user._id.toString(),
                        name: user.name,
                        username: user.username,
                        email: user.email,
                        profilePicture: user.profilePicture,
                    }))[0];

                    await client.close();

                    // And we return the user object
                    return user;
                } catch (e) {
                    throw new Error(e.message);
                }
            },
        }),
    ],

    // In session we will put the way we want the user to be authenticated, jwt = Json Web Token, this will allowing us to create a json token that will be stored as a cookie
    session: {
        strategy: "jwt",
    },

    // A random secret key that will be used to encrypte the JWT, if we set it as env variable and call it NEXTAUTH_SECRET, we don't need to call it in the handler as nextAuth will find it automatically
    secret: process.env.NEXTAUTH_SECRET,

    // Specify the function of specifique pages to be able to call them through nextAuth and redirect automatically if needed, for ex, we are saying that the path "/login/signin" is equal to the signin page can put more pages see doc
    pages: {
        signIn: "/login/signin",
    },
    callbacks: {
        async jwt({ token, user }) {
            user && (token.user = user);
            return token;
        },
        async session({ session, token }) {
            const { email } = token.user;

            const client = await MongoClient.connect(
                process.env.MONGODB_CLIENT
            );
            const db = client.db(process.env.MONGODB_DATABASE);
            let userFromDB = await db
                .collection("users")
                .find({ email })
                .limit(1)
                .toArray();

            if (!userFromDB) {
                throw new Error("User not found in the database.");
            }

            userFromDB = userFromDB.map((user) => ({
                _id: user._id.toString(),
                name: user.name,
                username: user.username,
                email: user.email,
                profilePicture: user.profilePicture,
            }))[0];

            await client.close();

            return {
                ...session,
                user: {
                    ...userFromDB,
                },
            };
        },
    },
};

const handler = NextAuth(authOptions);

// As we are in a route file it has to be exported as a fetch methode so we export it as GET and POST to receive and send data.
export { handler as GET, handler as POST };
