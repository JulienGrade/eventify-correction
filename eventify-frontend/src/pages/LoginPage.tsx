import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { loginRequest } from "../services/authService";

export default function LoginPage() {

    const { login } = useAuth();
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {

        e.preventDefault();

        try {

            const token = await loginRequest(username, password);

            login(token);

            navigate("/");

        } catch (error) {

            console.error(error);
            setError("Identifiants incorrects");

        }

    }

    return (

        <div className="max-w-md mx-auto mt-16">

            <h1 className="text-3xl font-bold mb-6 text-center">
                Connexion
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
                    Se connecter
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