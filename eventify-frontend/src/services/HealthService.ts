import { apiFetch } from "../api/apiClient";

export async function checkApiHealth() {
    return apiFetch("/api/health");
}