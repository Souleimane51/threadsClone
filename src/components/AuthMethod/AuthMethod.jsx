import Link from "next/link";

export default function AuthMethod({ path, title, content }) {
    return (
        <Link href={path}>
            <div className="border rounded-3xl border-threads-gray-light p-5 bg-threads-gray hover:bg-gray-900 duration-150">
                <h2 className="text-bold text-white">{title}</h2>
                <div className="text-threads-grey-light mt-4">{content}</div>
            </div>
        </Link>
    );
}
