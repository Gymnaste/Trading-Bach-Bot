import { Link } from 'react-router-dom'

export default function LandingHeader() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-[hsl(216,71%,8%)]/80 backdrop-blur-xl">
            <div className="container mx-auto max-w-6xl px-6 flex h-16 items-center justify-between">
                <div className="flex items-center gap-2">
                    <img src="/logo-axiom.png" alt="Axiom Logo" className="h-12 w-auto object-contain" />
                </div>
                <div className="flex items-center gap-3">
                    <Link
                        to="/login"
                        className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/5"
                    >
                        Se connecter
                    </Link>
                    <Link
                        to="/register"
                        className="px-4 py-2 text-sm font-semibold bg-[hsl(187,100%,50%)] text-[hsl(216,71%,8%)] rounded-lg animate-pulse-glow hover:brightness-110 transition-all"
                    >
                        S'inscrire
                    </Link>
                </div>
            </div>
        </header>
    )
}
