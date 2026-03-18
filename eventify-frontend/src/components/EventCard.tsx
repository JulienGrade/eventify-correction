import { Link } from "react-router-dom";
import React, { useState } from "react";
import { getImageUrl } from "../utils/imageUrl";

type Event = {
    id: number;
    title: string;
    description: string;
    eventDate: string;
    imagePath?: string;
};

export default function EventCard({ event }: Readonly<{ event: Event }>) {

    const imageUrl = getImageUrl(event.imagePath);

    const truncatedDescription =
        event.description.length > 120
            ? event.description.substring(0, 120) + "..."
            : event.description;

    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    function handleMouseMove(e: React.MouseEvent<HTMLElement>) {

        const rect = e.currentTarget.getBoundingClientRect();

        setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });

    }

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

                <div className="p-4 flex flex-col justify-between h-44">

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

                        <span className="text-indigo-600 text-sm font-medium">
                            Voir plus →
                        </span>

                    </div>

                </div>

            </div>

        </Link>
    );
}