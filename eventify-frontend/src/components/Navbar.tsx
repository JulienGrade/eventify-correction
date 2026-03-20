import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {

    const { token, logout, role } = useAuth();
    const isAdmin = role === "ROLE_ADMIN";

    return (

        <nav className="bg-white border-b shadow-sm">

            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

                <Link to="/" className="text-xl font-bold text-indigo-600">
                    Eventify
                </Link>

                <div className="flex items-center gap-6 text-slate-700">

                    <Link to="/" className="hover:text-indigo-600">
                        Accueil
                    </Link>

                    <Link to="/events" className="hover:text-indigo-600">
                        Événements
                    </Link>

                    <Link to="/health" className="hover:text-indigo-600">
                        Santé API
                    </Link>

                    {/* 🔥 AJOUT ICI */}
                    {token && (
                        <Link to="/me" className="hover:text-indigo-600">
                            Mes inscriptions
                        </Link>
                    )}

                    {isAdmin && (
                        <Link to="/admin" className="hover:text-indigo-600">
                            Administration
                        </Link>
                    )}

                    {!token && (
                        <Link
                            to="/login"
                            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                        >
                            Connexion
                        </Link>
                    )}
                    {!token && (
                        <Link
                            to="/register"
                            className="text-sm hover:text-indigo-600"
                        >
                            Inscription
                        </Link>
                    )}
                    {token && (
                        <button
                            onClick={logout}
                            className="bg-slate-200 px-4 py-2 rounded hover:bg-slate-300"
                        >
                            Déconnexion
                        </button>
                    )}

                </div>

            </div>

        </nav>

    );
}