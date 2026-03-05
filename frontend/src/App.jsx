/**
 * App.jsx — Routeur principal de Trading Bach Bot.
 * Routes :
 *   /          → Landing Page (Lovable)
 *   /login     → Page de connexion
 *   /register  → Page d'inscription
 *   /dashboard → Dashboard de trading (protégée)
 */
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import LandingPage from './pages/LandingPage'
import AuthPage from './pages/AuthPage'
import Dashboard from './pages/Dashboard'

/** Redirige vers /login si l'utilisateur n'est pas connecté */
function ProtectedRoute({ children }) {
    const { user, loading } = useAuth()

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center gap-4">
                <div className="w-14 h-14 border-4 border-sky-500/30 border-t-sky-500 rounded-full animate-spin" />
                <p className="text-gray-500 text-sm">Vérification de la session...</p>
            </div>
        )
    }

    return user ? children : <Navigate to="/login" replace />
}

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Landing page publique */}
                <Route path="/" element={<LandingPage />} />

                {/* Auth */}
                <Route path="/login" element={<AuthPage defaultTab="login" />} />
                <Route path="/register" element={<AuthPage defaultTab="signup" />} />

                {/* Dashboard protégé */}
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                {/* Catch-all */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    )
}
