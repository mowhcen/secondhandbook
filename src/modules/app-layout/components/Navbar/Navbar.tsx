import Link from "next/link";

export function Navbar() {
    return (
        <nav className="navbar">
            <div className="logo">BookStore</div>
            <ul className="menu">
                <li>
                    <Link href="/">Home</Link>
                </li>
                <li>
                    <Link href="/books">Books</Link>
                </li>
                <li>
                    <Link href="/login">Login</Link>
                </li>
            </ul>
        </nav>
    );
}
