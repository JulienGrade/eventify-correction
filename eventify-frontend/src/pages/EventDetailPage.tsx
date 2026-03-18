import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function EventDetailPage() {

    const { id } = useParams();

    const [event, setEvent] = useState<any>(null);

    useEffect(() => {

        fetch(`http://localhost:8080/api/events/${id}`)
            .then(res => res.json())
            .then(data => setEvent(data));

    }, [id]);

    if (!event) {
        return <p>Loading...</p>;
    }

    const imageUrl = event.imagePath
        ? `http://localhost:8080/uploads/${event.imagePath}`
        : "/no-image.svg";

    return (

        <div className="max-w-3xl mx-auto">

            <img
                src={imageUrl}
                alt={event.title}
                className="w-full h-80 object-cover rounded-xl mb-6"
            />

            <h1 className="text-3xl font-bold mb-4">
                {event.title}
            </h1>

            <p className="text-slate-700 mb-4">
                {event.description}
            </p>

            <p className="text-sm text-slate-500">
                {new Date(event.eventDate).toLocaleString()}
            </p>

        </div>

    );

}