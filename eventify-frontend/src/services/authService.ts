import { apiFetch } from "../api/apiClient";

export async function loginRequest(
    username: string,
    password: string
): Promise<string> {

    const data = await apiFetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ username, password })
    });

    if (!data?.token) {
        throw new Error("Token manquant dans la réponse API");
    }

    return data.token;
}

export async function registerRequest(
    username: string,
    password: string
): Promise<void> {

    await apiFetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({ username, password })
    });
}