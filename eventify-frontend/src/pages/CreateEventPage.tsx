import React, { useState } from "react";
import { createEvent } from "../services/eventService";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

export default function CreateEventPage() {

    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [eventDate, setEventDate] = useState("");
    const [error, setError] = useState("");

    async function handleSubmit(e: React.SyntheticEvent) {

        e.preventDefault();

        try {

            const event = await createEvent({
                title,
                description,
                eventDate
            });

            navigate(`/admin/events/${event.id}/image`);

        } catch (err: any) {

            setError(err.message);

        }

    }

    return (

        <div className="max-w-xl mx-auto">

            <h1 className="text-3xl font-bold mb-6">
                Création d'événement
            </h1>

            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 bg-white p-6 rounded-xl shadow"
            >

                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-slate-600">
                        Titre
                    </label>

                    <input
                        type="text"
                        placeholder="Event title"
                        className="border border-slate-200 rounded p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-slate-600">
                        Description
                    </label>

                    <textarea
                        placeholder="Event description"
                        className="border border-slate-200 rounded p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        rows={4}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-slate-600">
                        Date de l'événement
                    </label>

                    <input
                        type="datetime-local"
                        className="border border-slate-200 rounded p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                    />
                </div>

                <div className="pt-2">
                    <Button>
                        Créer un événement
                    </Button>
                </div>

            </form>

            {error && (
                <p className="text-red-500 mt-4">
                    {error}
                </p>
            )}

        </div>

    );

}