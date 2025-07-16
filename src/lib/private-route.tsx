import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/auth"
import type { ReactNode } from "react";

export default function PrivateRoute({ children }: { children: ReactNode }) {
    const { token,user } = useAuth();
    if (!token|| user?.role !== "USER") return <Navigate to="/login" replace />;
    return <>{children}</>;
}