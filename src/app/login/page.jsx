import AuthMethod from "@/components/AuthMethod/AuthMethod";

export default function Login() {
    return (
        <div>
            <h1 className="title">Comment souhaitez-vous utiliser Threads?</h1>
            <div className="mt-6 w-[500px] mx-auto flex flex-col gap-4">
                <AuthMethod
                    path={"/login/signup"}
                    title={"S'inscrire ou se connecter avec une addresse email"}
                    content={
                        "Connectez vous ou créer un profil Threads avec une addresse email. Cela vous permettra de publier du contenu et d'interagir sur Threads"
                    }
                />
                <AuthMethod
                    path={"/login/pass"}
                    title={"Utiliser sans profil"}
                    content={
                        "Vous pouvez naviger dans Threads sans profil, mais vous ne pourrez pas interagir avec du contenu ni en publier"
                    }
                />
            </div>
        </div>
    );
}
