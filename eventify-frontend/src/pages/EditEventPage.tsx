import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { updateEvent } from "../services/eventService";

export default function EditEventPage() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [eventDate, setEventDate] = useState("");

    useEffect(() => {

        fetch(`http://localhost:8080/api/events/${id}`)
            .then(res => res.json())
            .then(data => {

                setTitle(data.title);
                setDescription(data.description);
                setEventDate(data.eventDate.slice(0,16));

            });

    }, [id]);

    async function handleSubmit(e: React.SyntheticEvent) {

        e.preventDefault();

        await updateEvent(id, {
            title,
            description,
            eventDate
        });

        navigate("/admin");

    }

    return (

        <div className="max-w-xl mx-auto">

            <h1 className="text-3xl font-bold mb-6">
                Modifier un événement
            </h1>

            <form
                onSubmit={handleSubmit}
                className="bg-white shadow rounded-xl p-6 flex flex-col gap-4"
            >

                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border p-2 rounded"
                />

                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="border p-2 rounded"
                />

                <input
                    type="datetime-local"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="border p-2 rounded"
                />

                <button className="bg-indigo-600 text-white p-2 rounded">
                    Sauvegarder
                </button>

            </form>

        </div>

    );
}