import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMyRegistrations, registerToEvent } from "../services/registrationService";
import { getImageUrl } from "../utils/imageUrl";

export default function EventDetailPage() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [event, setEvent] = useState<any>(null);
    const [isRegistered, setIsRegistered] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {

        // fetch event
        fetch(`http://localhost:8080/api/events/${id}`)
            .then(res => res.json())
            .then(data => setEvent(data));

        // fetch registrations
        getMyRegistrations()
            .then((regs) => {
                const ids = regs.map((r: any) => r.eventId);
                setIsRegistered(ids.includes(Number(id)));
            })
            .catch(() => {
                // pas connecté = normal
            });

    }, [id]);

    const handleRegister = async () => {

        setLoading(true);
        setError(null);

        try {
            await registerToEvent(Number(id));
            setIsRegistered(true);
        } catch (e: any) {
            setError(e.message);
        } finally {
            setLoading(false);
        }

    };

    if (!event) {
        return <p className="p-6">Chargement...</p>;
    }

    const imageUrl = getImageUrl(event.imagePath);

    const isFull =
        event.maxParticipants &&
        event.participantCount >= event.maxParticipants;

    return (

        <div className="max-w-3xl mx-auto p-4">

            <button
                onClick={() => navigate("/events")}
                className="mb-6 text-sm text-indigo-600 hover:underline"
            >
                ← Retour aux événements
            </button>

            <img
                src={imageUrl}
                alt={event.title}
                className="w-full h-80 object-cover rounded-xl mb-6"
            />

            <h1 className="text-3xl font-bold mb-4">
                {event.title}
            </h1>

            {/* DESCRIPTION */}
            <p className="text-slate-700 mb-4">
                {event.description}
            </p>

            <p className="text-sm text-slate-500 mb-4">
                {new Date(event.eventDate).toLocaleString("fr-FR")}
            </p>

            <p className="text-sm mb-6">
                Participants : {event.participantCount ?? 0} /{" "}
                {event.maxParticipants ?? "∞"}
            </p>

            <button
                onClick={handleRegister}
                disabled={loading || isRegistered || isFull}
                className={`
                    px-6 py-3 rounded-lg text-white font-medium
                    ${isRegistered || isFull
                        ? "bg-slate-300 cursor-not-allowed"
                        : "bg-indigo-600 cursor-pointer hover:bg-indigo-700"}
                `}
            >
                {loading
                    ? "Inscription..."
                    : isRegistered
                    ? "Déjà inscrit"
                    : isFull
                    ? "Complet"
                    : "S’inscrire"}
            </button>

            {error && (
                <p className="text-red-500 mt-4">
                    {error}
                </p>
            )}

        </div>

    );

}