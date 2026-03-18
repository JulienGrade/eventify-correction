import { apiFetch } from "../api/apiClient";
import type { Event } from "../types/Event";
import type { CreateEventPayload } from "../types/CreateEventPayload";

export async function getEvents(): Promise<Event[]> {
    return apiFetch("/api/events");
}

export async function createEvent(event: CreateEventPayload): Promise<Event> {

    return apiFetch("/api/events", {
        method: "POST",
        body: JSON.stringify(event)
    });

}

export async function uploadEventImage(
    eventId: number,
    file: File
): Promise<string> {

    const formData = new FormData();
    formData.append("file", file);

    return apiFetch(`/api/events/${eventId}/image`, {
        method: "POST",
        body: formData
    });

}

export async function deleteEvent(id: number): Promise<void> {

    await apiFetch(`/api/events/${id}`, {
        method: "DELETE"
    });

}

export async function updateEvent(
    id: number,
    data: CreateEventPayload
): Promise<Event> {

    return apiFetch(`/api/events/${id}`, {
        method: "PUT",
        body: JSON.stringify(data)
    });

}