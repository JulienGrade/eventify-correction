import { useEffect, useState } from "react";
import { getEvents, deleteEvent } from "../services/eventService";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

type Event = {
    id: number
    title: string
    eventDate: string
}

export default function AdminPage() {

    const [events, setEvents] = useState<Event[]>([]);
    const navigate = useNavigate();

    useEffect(() => {

        getEvents().then(setEvents).catch(console.error);

    }, []);

    async function handleDelete(id: number) {

        const confirmed = window.confirm("Supprimer cet événement ?");

        if (!confirmed) return;

        await deleteEvent(id);

        const data = await getEvents();
        setEvents(data);

    }

    return (

        <div className="max-w-6xl mx-auto">

            <div className="flex justify-between items-center mb-6">

                <h1 className="text-3xl font-bold">
                    Administration
                </h1>

                <Button onClick={() => navigate("/admin/events/new")}>
                    Créer un événement
                </Button>

            </div>

            <table className="w-full bg-white shadow rounded-xl overflow-hidden">

                <thead className="bg-slate-100">

                <tr>

                    <th className="p-4 text-left">Titre</th>
                    <th className="p-4 text-left">Date</th>
                    <th className="p-4 text-left">Actions</th>

                </tr>

                </thead>

                <tbody>

                {events.map(event => (

                    <tr key={event.id} className="border-t">

                        <td className="p-4">{event.title}</td>

                        <td className="p-4">
                            {new Date(event.eventDate).toLocaleDateString("fr-FR")}
                        </td>

                        <td className="p-4 flex gap-2">

                            <button
                                onClick={() => navigate(`/admin/events/${event.id}/edit`)}
                                className="bg-slate-200 px-3 py-1 rounded hover:bg-slate-300"
                            >
                                Modifier
                            </button>

                            <button
                                onClick={() => handleDelete(event.id)}
                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                            >
                                Supprimer
                            </button>

                        </td>

                    </tr>

                ))}

                </tbody>

            </table>

        </div>

    );

}