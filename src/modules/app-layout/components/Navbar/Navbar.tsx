export function Navbar() {
    return (
        <nav className="navbar">
            <div className="logo">BookStore</div>
            <ul className="menu">
                <li>
                    <a href="#home">Home</a>
                </li>
                <li>
                    <a href="#books">Books</a>
                </li>
                <li>
                    <a href="#contact">Contact</a>
                </li>
            </ul>
        </nav>
    );
}
