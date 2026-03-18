const API_BASE_URL = "http://localhost:8080";

export async function apiFetch<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {

    const token = localStorage.getItem("token");

    const headers: Record<string, string> = {
        ...(options.headers as Record<string, string> || {})
    };

    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    // si body est FormData on supprime content-type
    if (options.body instanceof FormData) {
        delete headers["Content-Type"];
    } else {
        headers["Content-Type"] = "application/json";
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers
    });

    if (!response.ok) {

        if (response.status === 401) {
            throw new Error("Authentification requise");
        }

        if (response.status === 403) {
            throw new Error("Accès interdit");
        }

        if (response.status === 404) {
            throw new Error(`Endpoint ${endpoint} non implémenté`);
        }

        throw new Error(`Erreur serveur ${response.status}`);
    }

    const contentType = response.headers.get("content-type");

    if (contentType?.includes("application/json")) {
        return response.json();
    }

    return await response.text() as T;
}