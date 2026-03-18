import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

type Props = {
    children: React.ReactNode;
    role?: string;
};

export default function ProtectedRoute({ children, role }: Props) {

    const { token, role: userRole } = useAuth();

    // pas connecté
    if (!token) {
        return <Navigate to="/login" />;
    }

    // rôle requis
    if (role && userRole !== role) {
        return <Navigate to="/" />;
    }

    return children;
}