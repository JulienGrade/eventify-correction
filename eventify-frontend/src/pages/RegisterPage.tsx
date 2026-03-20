import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerRequest } from "../services/authService";

export default function RegisterPage() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    async function handleSubmit(e: React.FormEvent) {

        e.preventDefault();

        try {

            await registerRequest(username, password);

            navigate("/login");

        } catch (e) {
            setError("Erreur lors de l'inscription");
        }
    }

    return (

        <div className="max-w-md mx-auto mt-16">

            <h1 className="text-3xl font-bold mb-6 text-center">
                Inscription
            </h1>

            <form
                onSubmit={handleSubmit}
                className="bg-white shadow rounded-xl p-6 flex flex-col gap-4"
            >

                <input
                    type="text"
                    placeholder="Nom d'utilisateur"
                    className="border border-slate-300 rounded p-2"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Mot de passe"
                    className="border border-slate-300 rounded p-2"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button className="bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700">
                    S'inscrire
                </button>

                {error && (
                    <p className="text-red-500 text-sm">
                        {error}
                    </p>
                )}

            </form>

        </div>

    );
}