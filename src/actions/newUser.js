"use server";

import { emailChecker } from "@/utils/emailChecker";
import { MongoClient } from "mongodb";
import bcrypt from "bcrypt";

export async function newUser(name, username, email, password) {
    if (!name || !username || !email || !password) {
        throw new Error("Veuillez bien remplire tout les champs");
    }

    if (!emailChecker(email)) {
        throw new Error("Veuillez entrer une addresse email valide");
    }

    // Connect to cluster
    const client = await MongoClient.connect(process.env.MONGODB_CLIENT);

    // Connect to db
    const db = client.db(process.env.MONGODB_DATABASE);

    // Connect to collection
    // prettier-ignore

    try {
        let user = await db.collection("users").find({email}).limit(1).toArray();
        
        if (user.length < 0) {
            client.close();
            throw new Error("Cette email adresse est deja utilisée")
        }

        user = await db.collection("users").find({username}).limit(1).toArray();
        
        if (user.length < 0) {
            client.close();
            throw new Error("Ce pseudo est deja utilisé")
        }

        const encryptedPassword = await bcrypt.hash(password, 10);

        await db.collection("users").insertOne({
            name,
            username,
            email,
            password: encryptedPassword,
            profilePicture: "/picture.png",
            bio: "-",
            url: "",
            creation: new Date()
        })
    } catch (e) {
        client.close();
        throw new Error(e);
    }
    await client.close();
}
