import React, { useState } from "react";
import { uploadEventImage } from "../services/eventService";
import { useParams, useNavigate } from "react-router-dom";

export default function UploadImagePage() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState("");

    async function handleSubmit(e: React.SyntheticEvent) {

        e.preventDefault();

        if (!file) {
            setError("Veuillez sélectionner une image");
            return;
        }

        try {

            await uploadEventImage(Number(id), file);

            navigate("/events");

        } catch (err: any) {

            setError(err.message);

        }

    }

    return (

        <div className="max-w-xl mx-auto">

            <h1 className="text-3xl font-bold mb-6">
                Uploader une image pour cet événement
            </h1>

            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-xl flex flex-col gap-4"
            >

                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                        if (e.target.files) {
                            setFile(e.target.files[0]);
                        }
                    }}
                />

                <button
                    className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded"
                >
                    Uploader une image
                </button>

            </form>

            {error && (
                <p className="text-red-400 mt-4">
                    {error}
                </p>
            )}

        </div>

    );

}