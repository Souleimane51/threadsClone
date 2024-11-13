import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import { AuthProvider } from "./Providers";

export const metadata = {
    title: "Threads",
    description: "Partagez des Threads!",
};

export default function RootLayout({ children }) {
    return (
        <html lang="fr">
            <body>
                <AuthProvider>{children}</AuthProvider>
                <ToastContainer
                    position="top-right"
                    closeOnClick={true}
                    stacked
                    draggable={true}
                />
            </body>
        </html>
    );
}
