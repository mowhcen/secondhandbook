import { ReactNode } from "react";
import { Navbar, Footer } from "./components";

export function AppLayout({ children }: { children: ReactNode }) {
    return (
        <div className="app">
            <Navbar />
            {children}
            <Footer />
        </div>
    );
}
