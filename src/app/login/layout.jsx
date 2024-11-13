import Image from "next/image";
import Footer from "@/components/Footer/Footer";

export default function Layout({ children }) {
    return (
        <div className="min-h-screen flex flex-col bg-threads-grey">
            <div className="absolute w-full aspect-[1785/510]">
                <Image
                    src="/welcome.webp"
                    fill
                    className="object-contain select-none"
                    alt="Top banner image"
                />
            </div>
            <section className="grow z-30 mt-[19vw]">{children}</section>
            <Footer />
        </div>
    );
}
