import apiClient from "../api/apiClient";
import { Registration } from "../types/Registration";

/**
 * S'inscrire à un événement
 */
export const registerToEvent = async (eventId: number): Promise<void> => {
  try {
    await apiClient.post(`/events/${eventId}/register`);
  } catch (error: any) {
    handleApiError(error);
  }
};

/**
 * Récupérer mes inscriptions
 */
export const getMyRegistrations = async (): Promise<Registration[]> => {
  try {
    const response = await apiClient.get("/me/registrations");
    return response.data;
  } catch (error: any) {
    handleApiError(error);
    return [];
  }
};

/**
 * Se désinscrire
 */
export const deleteRegistration = async (registrationId: number): Promise<void> => {
  try {
    await apiClient.delete(`/registrations/${registrationId}`);
  } catch (error: any) {
    handleApiError(error);
  }
};

/**
 * Gestion centralisée des erreurs API
 */
const handleApiError = (error: any) => {
  if (error.response?.status === 404) {
    throw new Error(
      "Cette fonctionnalité nécessite l'endpoint backend correspondant qui n'est pas encore implémenté."
    );
  }

  const message = error.response?.data?.message;

  if (message) {
    throw new Error(message);
  }

  if (error.message === "Network Error") {
    throw new Error("Erreur réseau. Vérifiez votre connexion.");
  }

  throw new Error("Une erreur inattendue est survenue.");
};