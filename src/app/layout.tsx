import "./globals.css";
import "../styles/scss/main.scss";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AuthProvider } from "#modules/context";
import { AppLayout } from "#modules/app-layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Second Hand Book",
    description: "A practical APP for web engineering",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <AppLayout>
                    <AuthProvider>{children}</AuthProvider>
                </AppLayout>
            </body>
        </html>
    );
}
