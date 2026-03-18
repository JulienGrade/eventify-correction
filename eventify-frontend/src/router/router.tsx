import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layout/MainLayout";

import HomePage from "../pages/HomePage";
import HealthPage from "../pages/HealthPage";
import EventsPage from "../pages/EventsPage";
import LoginPage from "../pages/LoginPage";
import AdminPage from "../pages/AdminPage";
import CreateEventPage from "../pages/CreateEventPage";
import UploadImagePage from "../pages/UploadImagePage";
import EventDetailPage from "../pages/EventDetailPage";
import EditEventPage from "../pages/EditEventPage";

import ProtectedRoute from "../components/ProtectedRoute";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [

            { index: true, element: <HomePage /> },

            { path: "health", element: <HealthPage /> },

            { path: "events", element: <EventsPage /> },

            { path: "events/:id", element: <EventDetailPage /> },

            { path: "login", element: <LoginPage /> },

            {
                path: "admin",
                element: (
                    <ProtectedRoute role="ROLE_ADMIN">
                        <AdminPage />
                    </ProtectedRoute>
                )
            },

            {
                path: "admin/events/new",
                element: (
                    <ProtectedRoute role="ROLE_ADMIN">
                        <CreateEventPage />
                    </ProtectedRoute>
                )
            },

            {
                path: "admin/events/:id/edit",
                element: (
                    <ProtectedRoute role="ROLE_ADMIN">
                        <EditEventPage />
                    </ProtectedRoute>
                )
            },

            {
                path: "admin/events/:id/image",
                element: (
                    <ProtectedRoute role="ROLE_ADMIN">
                        <UploadImagePage />
                    </ProtectedRoute>
                )
            }

        ]
    }
]);