import { apiFetch } from "../api/apiClient";

/**
 * S'inscrire à un événement
 */
export const registerToEvent = async (eventId: number): Promise<void> => {
  return apiFetch(`/api/events/${eventId}/register`, {
    method: "POST"
  });
};

/**
 * Récupérer mes inscriptions
 */
export const getMyRegistrations = async () => {
  return apiFetch(`/api/me/registrations`);
};

/**
 * Se désinscrire
 */
export const deleteRegistration = async (registrationId: number): Promise<void> => {
  return apiFetch(`/api/registrations/${registrationId}`, {
    method: "DELETE"
  });
};