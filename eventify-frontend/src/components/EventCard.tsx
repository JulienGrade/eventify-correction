import { Link } from "react-router-dom";
import React, { useState } from "react";
import { getImageUrl } from "../utils/imageUrl";
import { registerToEvent } from "../services/registrationService";

type Event = {
    id: number;
    title: string;
    description: string;
    eventDate: string;
    imagePath?: string;
    participantCount?: number;
    maxParticipants?: number;
};

export default function EventCard({
    event,
    isRegistered = false
}: Readonly<{ event: Event; isRegistered?: boolean }>) {

    const imageUrl = getImageUrl(event.imagePath);

    const truncatedDescription =
        event.description.length > 120
            ? event.description.substring(0, 120) + "..."
            : event.description;

    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const isFull =
        event.maxParticipants &&
        event.participantCount !== undefined &&
        event.participantCount >= event.maxParticipants;

    function handleMouseMove(e: React.MouseEvent<HTMLElement>) {

        const rect = e.currentTarget.getBoundingClientRect();

        setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });

    }

    const handleRegister = async (e: React.MouseEvent) => {
        e.preventDefault(); // 🔥 empêche le Link de naviguer
        e.stopPropagation();

        setLoading(true);
        setError(null);

        try {
            await registerToEvent(event.id);
        } catch (e: any) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    return (

        <Link
            to={`/events/${event.id}`}
            onMouseMove={handleMouseMove}
            className="block"
        >

            <div
                className="
                relative
                group
                bg-white
                rounded-xl
                shadow-md
                overflow-hidden
                transition
                duration-300
                hover:-translate-y-1
                hover:shadow-xl
                "
            >

                {/* SPOTLIGHT EFFECT */}

                <div
                    className="
                    pointer-events-none
                    absolute
                    inset-0
                    opacity-0
                    group-hover:opacity-100
                    transition-opacity
                    duration-300
                    "
                    style={{
                        background: `radial-gradient(
                            500px circle at ${mousePosition.x}px ${mousePosition.y}px,
                            rgba(99,102,241,0.18),
                            transparent 40%
                        )`
                    }}
                />

                {/* IMAGE */}

                <div className="h-48 overflow-hidden">

                    <img
                        src={imageUrl}
                        alt={event.title}
                        className="
                        w-full
                        h-full
                        object-cover
                        transition-transform
                        duration-500
                        group-hover:scale-110
                        "
                    />

                </div>

                {/* CONTENT */}

                <div className="p-4 flex flex-col justify-between h-52">

                    <div>

                        <h3 className="font-bold text-lg mb-2 text-slate-800">
                            {event.title}
                        </h3>

                        <p className="text-sm text-slate-600">
                            {truncatedDescription}
                        </p>

                    </div>

                    <div className="mt-4 flex justify-between items-center">

                        <span className="text-sm text-slate-500">
                            {new Date(event.eventDate).toLocaleDateString("fr-FR")}
                        </span>

                        {/* 🔥 BOUTON AJOUTÉ (SANS CASSER DESIGN) */}
                        <button
                            onClick={handleRegister}
                            disabled={loading || isRegistered || isFull}
                            className={`
                                text-sm font-medium px-3 py-1 rounded
                                ${isRegistered || isFull
                                    ? "bg-slate-300 text-slate-600 cursor-not-allowed"
                                    : "bg-indigo-600 text-white hover:bg-indigo-700"}
                            `}
                        >
                            {loading
                                ? "..."
                                : isRegistered
                                ? "Déjà inscrit"
                                : isFull
                                ? "Complet"
                                : "S’inscrire"}
                        </button>

                    </div>

                    {error && (
                        <p className="text-red-500 text-xs mt-2">
                            {error}
                        </p>
                    )}

                </div>

            </div>

        </Link>
    );
}