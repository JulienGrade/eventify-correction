import { useEffect, useState } from "react"
import { getEvents } from "../services/eventService"
import EventCard from "../components/EventCard"

type Event = {
    id: number
    title: string
    description: string
    eventDate: string
    imagePath?: string
}

export default function EventsPage() {

    const [events, setEvents] = useState<Event[]>([])

    useEffect(() => {

        getEvents()
            .then(setEvents)
            .catch(console.error)

    }, [])

    return (

        <div className="max-w-7xl mx-auto">

            <h1 className="text-3xl font-bold mb-8">
                Événements
            </h1>

            <div className="grid md:grid-cols-3 gap-6">

                {events.map(event => (
                    <EventCard key={event.id} event={event} />
                ))}

            </div>

        </div>

    )

}