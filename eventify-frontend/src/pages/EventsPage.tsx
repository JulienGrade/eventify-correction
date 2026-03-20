import { useEffect, useState } from "react"
import { getEvents } from "../services/eventService"
import EventCard from "../components/EventCard"
import { getMyRegistrations } from "../services/registrationService"

type Event = {
    id: number
    title: string
    description: string
    eventDate: string
    imagePath?: string
}

export default function EventsPage() {

    const [events, setEvents] = useState<Event[]>([])
    const [registeredEventIds, setRegisteredEventIds] = useState<number[]>([])

    useEffect(() => {

        getEvents()
            .then(setEvents)
            .catch(console.error)

        getMyRegistrations()
            .then((regs) => {
                const ids = regs.map((r: any) => r.eventId)
                setRegisteredEventIds(ids)
            })
            .catch(() => {
                // pas connecté → normal
            })

    }, [])

    return (

        <div className="max-w-7xl mx-auto">

            <h1 className="text-3xl font-bold mb-8">
                Événements
            </h1>

            <div className="grid md:grid-cols-3 gap-6">

                {events.map(event => (
                    <EventCard
                        key={event.id}
                        event={event}
                        isRegistered={registeredEventIds.includes(event.id)}
                    />
                ))}

            </div>

        </div>

    )

}