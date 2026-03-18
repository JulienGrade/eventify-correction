import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Hero() {

    const navigate = useNavigate();
    const [query, setQuery] = useState("");

    function handleSearch() {
        navigate(`/events?q=${query}`);
    }

    return (

        <section className="bg-gradient-to-r from-indigo-600 via-indigo-600 to-indigo-500 py-24 text-white">

            <div className="max-w-5xl mx-auto text-center px-6">

                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                    Découvrez des événements près de chez vous
                </h1>

                <p className="text-indigo-100 mb-10 text-xl">
                    Ateliers, conférences et rencontres professionnelles
                </p>

                <div className="flex gap-2 max-w-xl mx-auto">

                    <input
                        type="text"
                        placeholder="Rechercher un événement..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="flex-grow p-3 rounded text-white text-slate-800 focus:outline-none"
                    />

                    <button
                        onClick={handleSearch}
                        className="bg-white text-indigo-600 px-6 rounded font-semibold hover:bg-slate-100"
                    >
                        Rechercher
                    </button>

                </div>

            </div>

        </section>

    );
}