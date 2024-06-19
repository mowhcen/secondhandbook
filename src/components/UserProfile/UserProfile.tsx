import { useAuth } from "#modules/context";

export function UserProfile() {
    const { user, logout } = useAuth();

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">User Profile</h2>
            {user && (
                <div>
                    <p>Welcome, {user.username}!</p>
                    <button onClick={logout} className="bg-blue-500 text-white py-2 px-4 rounded">
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
}
