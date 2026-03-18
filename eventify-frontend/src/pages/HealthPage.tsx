import { useEffect, useState } from "react";
import { checkApiHealth } from "../services/HealthService";

export default function HealthPage() {

    const [status, setStatus] = useState("Chargement...");
    const [error, setError] = useState("");

    useEffect(() => {

        checkApiHealth()
            .then(() => {
                setStatus("API opérationnelle");
            })
            .catch((err) => {
                setStatus("API indisponible");
                setError(err.message);
                console.log(err)
            });

    }, []);

    return (

        <div className="min-h-screen flex items-center justify-center">

            <div className="bg-white p-10 rounded-xl shadow-xl w-[500px]">

                <h1 className="text-3xl font-bold mb-6 text-center">
                    Eventify Frontend
                </h1>

                <p className="text-center text-lg mb-6">
                    Test connexion API
                </p>

                <div className="text-center">

                    <p className="text-xl font-semibold">
                        {status}
                    </p>

                    {error && (
                        <p className="text-red-400 mt-4 text-sm">
                            {error}
                        </p>
                    )}

                </div>

            </div>

        </div>

    );

}