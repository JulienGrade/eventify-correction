import { useEffect, useState } from "react";
import { getMyRegistrations, deleteRegistration } from "../services/registrationService";
import { getEvents } from "../services/eventService";
import EventCard from "../components/EventCard";

type Event = {
    id: number;
    title: string;
    description: string;
    eventDate: string;
    imagePath?: string;
    participantCount?: number;
    maxParticipants?: number;
};

export default function MyRegistrationsPage() {

    const [registrations, setRegistrations] = useState<any[]>([]);
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchData = async () => {

            try {

                const regs = await getMyRegistrations();
                const evts = await getEvents();

                setRegistrations(regs);
                setEvents(evts);

            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }

        };

        fetchData();

    }, []);

    const getEvent = (eventId: number) => {
        return events.find(e => e.id === eventId);
    };

    const handleDelete = async (registrationId: number) => {

        try {

            await deleteRegistration(registrationId);

            setRegistrations(prev =>
                prev.filter(r => r.id !== registrationId)
            );

        } catch (e) {
            console.error(e);
        }

    };

    if (loading) {
        return <p className="p-6">Chargement...</p>;
    }

    const registeredIds = registrations.map(r => r.eventId);

    return (

        <div className="max-w-7xl mx-auto">

            <h1 className="text-3xl font-bold mb-8">
                Mes inscriptions
            </h1>

            <div className="grid md:grid-cols-3 gap-6">

                {registrations.map(reg => {

                    const event = getEvent(reg.eventId);

                    if (!event) return null;

                    return (
                        <div key={reg.id} className="relative">

                            <EventCard
                                event={event}
                                isRegistered={true}
                            />

                            {/* bouton désinscription */}
                            <button
                                onClick={() => handleDelete(reg.id)}
                                className="
                                    absolute top-2 right-2
                                    bg-red-500 text-white
                                    text-lg px-3 py-1 rounded
                                    hover:bg-red-600
                                "
                            >
                                Se désinscrire
                            </button>

                        </div>
                    );

                })}

            </div>

        </div>

    );

}