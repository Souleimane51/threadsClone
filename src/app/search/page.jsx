import ConnectedLayout from "@/components/ConnectedLayout/ConnectedLayout";

export default function Search() {
    return (
        <ConnectedLayout>
            <div className="md:w-[60%] mx-auto mt-24">
                <form>
                    <input
                        type="search"
                        placeholder="Recherche"
                        className="input"
                    />
                </form>
                <p className="text-threads-grey-light text-center mt-24">
                    Recherechez des profils a decouvrir
                </p>
            </div>
        </ConnectedLayout>
    );
}
