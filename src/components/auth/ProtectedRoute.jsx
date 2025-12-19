// src/components/auth/ProtectedRoute.jsx
import { useAuth } from "@/store/auth";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
    const { user, ready } = useAuth();
    if (!ready) return null; // ممكن تعرض سبيـنر
    if (!user) return <Navigate to="/login" replace />;
    return children;
}
