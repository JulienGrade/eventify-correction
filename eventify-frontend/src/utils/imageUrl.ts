const API_BASE_URL = "http://localhost:8080";

export function getImageUrl(imagePath?: string): string {

    if (!imagePath) {
        return "/no-image.svg";
    }

    return `${API_BASE_URL}/uploads/${imagePath}`;
}