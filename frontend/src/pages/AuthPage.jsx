/**
 * AuthPage.jsx — Page de Connexion & Inscription.
 * Design premium cohérent avec le dashboard de trading.
 */
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function AuthPage({ defaultTab = 'login' }) {
    const [tab, setTab] = useState(defaultTab)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [info, setInfo] = useState(null)

    const { signIn, signUp } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)
        setInfo(null)
        setLoading(true)

        try {
            if (tab === 'login') {
                const { error } = await signIn(email, password)
                if (error) {
                    setError(error.message)
                } else {
                    navigate('/dashboard')
                }
            } else {
                if (password.length < 6) {
                    setError('Le mot de passe doit contenir au moins 6 caractères.')
                    setLoading(false)
                    return
                }
                const { error } = await signUp(email, password, username)
                if (error) {
                    setError(error.message)
                } else {
                    setInfo('Compte créé ! Vérifiez votre email pour confirmer l\'inscription.')
                }
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
            {/* Fond animé */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-radial from-sky-900/20 to-transparent rounded-full blur-3xl" />
                <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-radial from-blue-900/20 to-transparent rounded-full blur-3xl" />
            </div>

            <div className="w-full max-w-md relative">
                {/* Logo & Titre */}
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                        <img src="/logo-axiom.png" alt="Axiom Logo" className="h-16 w-auto object-contain drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]" />
                    </div>
                    <p className="text-gray-500 text-sm mt-1">Plateforme de trading algorithmique IA</p>
                </div>

                {/* Card */}
                <div className="bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl overflow-hidden">
                    {/* Onglets */}
                    <div className="flex border-b border-gray-800">
                        <button
                            onClick={() => { setTab('login'); setError(null); setInfo(null) }}
                            className={`flex-1 py-4 text-sm font-semibold transition-colors ${tab === 'login' ? 'text-sky-400 border-b-2 border-sky-500 bg-sky-500/5' : 'text-gray-500 hover:text-gray-300'}`}
                        >
                            Connexion
                        </button>
                        <button
                            onClick={() => { setTab('signup'); setError(null); setInfo(null) }}
                            className={`flex-1 py-4 text-sm font-semibold transition-colors ${tab === 'signup' ? 'text-sky-400 border-b-2 border-sky-500 bg-sky-500/5' : 'text-gray-500 hover:text-gray-300'}`}
                        >
                            Créer un compte
                        </button>
                    </div>

                    {/* Formulaire */}
                    <form onSubmit={handleSubmit} className="p-8 space-y-5">
                        {tab === 'signup' && (
                            <div>
                                <label className="text-[10px] text-gray-500 uppercase tracking-wider block mb-1.5">Nom d'utilisateur</label>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={e => setUsername(e.target.value)}
                                    placeholder="TradingPro"
                                    className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white text-sm focus:ring-2 focus:ring-sky-500 focus:border-transparent focus:outline-none transition-all placeholder-gray-600"
                                />
                            </div>
                        )}

                        <div>
                            <label className="text-[10px] text-gray-500 uppercase tracking-wider block mb-1.5">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                                placeholder="vous@exemple.com"
                                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white text-sm focus:ring-2 focus:ring-sky-500 focus:border-transparent focus:outline-none transition-all placeholder-gray-600"
                            />
                        </div>

                        <div>
                            <label className="text-[10px] text-gray-500 uppercase tracking-wider block mb-1.5">Mot de passe</label>
                            <input
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                                placeholder="••••••••"
                                minLength={6}
                                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white text-sm focus:ring-2 focus:ring-sky-500 focus:border-transparent focus:outline-none transition-all placeholder-gray-600"
                            />
                        </div>

                        {/* Messages */}
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl p-3 text-sm flex items-start gap-2">
                                <span className="mt-0.5">⚠️</span>
                                <span>{error}</span>
                            </div>
                        )}
                        {info && (
                            <div className="bg-green-500/10 border border-green-500/30 text-green-400 rounded-xl p-3 text-sm flex items-start gap-2">
                                <span className="mt-0.5">✅</span>
                                <span>{info}</span>
                            </div>
                        )}

                        {/* Bouton Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3.5 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-sky-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
                        >
                            {loading ? (
                                <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Chargement...</>
                            ) : tab === 'login' ? (
                                <><span>🔐</span> Se connecter</>
                            ) : (
                                <><span>🚀</span> Créer mon compte</>
                            )}
                        </button>

                        {tab === 'login' && (
                            <p className="text-center text-xs text-gray-600">
                                Pas encore de compte ?{' '}
                                <Link to="/register" className="text-sky-400 hover:text-sky-300">
                                    Inscrivez-vous
                                </Link>
                            </p>
                        )}
                        {tab === 'signup' && (
                            <p className="text-center text-xs text-gray-600">
                                Déjà un compte ?{' '}
                                <Link to="/login" className="text-sky-400 hover:text-sky-300">
                                    Se connecter
                                </Link>
                            </p>
                        )}
                    </form>
                </div>

                <p className="text-center text-xs text-gray-700 mt-6">
                    Sécurisé par Supabase Auth • Données chiffrées
                </p>
            </div>
        </div>
    )
}
