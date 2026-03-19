import { useState } from "react";
import { registerToEvent } from "../services/registrationService";

interface Props {
  event: any;
}

export default function EventCard({ event }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const isFull =
    event.maxParticipants &&
    event.participantCount >= event.maxParticipants;

  const handleRegister = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await registerToEvent(event.id);
      setSuccess("Inscription réussie !");
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-4 flex flex-col gap-3">
      <h2 className="text-lg font-semibold">{event.title}</h2>

      <p className="text-sm text-gray-600">{event.description}</p>

      <p className="text-sm">
        Participants : {event.participantCount ?? 0} /{" "}
        {event.maxParticipants ?? "∞"}
      </p>

      <button
        onClick={handleRegister}
        disabled={loading || isFull}
        className={`py-2 px-4 rounded-lg text-white ${
          isFull
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading
          ? "Inscription..."
          : isFull
          ? "Complet"
          : "S’inscrire"}
      </button>

      {success && <p className="text-green-600 text-sm">{success}</p>}

      {error && <p className="text-red-600 text-sm">{error}</p>}
    </div>
  );
}