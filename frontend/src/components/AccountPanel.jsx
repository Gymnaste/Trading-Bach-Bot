/**
 * AccountPanel.jsx — Panneau de gestion du compte et du profil IA.
 * Permet de retirer des fonds, remettre le compte à zéro et configurer le profil de risque.
 */
import { useState } from 'react'
import { portfolioAPI, chatAPI } from '../services/apiService'

const RISK_PROFILES = [
    { id: 'conservative', label: 'Conservateur', color: 'text-sky-400', bg: 'bg-sky-500/10 border-sky-500/30', desc: 'SL: -3%, TP: +6% — Protège le capital' },
    { id: 'moderate', label: 'Modéré', color: 'text-yellow-400', bg: 'bg-yellow-500/10 border-yellow-500/30', desc: 'SL: -5%, TP: +10% — Équilibre risque/rendement' },
    { id: 'aggressive', label: 'Agressif', color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/30', desc: 'SL: -8%, TP: +20% — Maximise les gains potentiels' },
]

export default function AccountPanel({ onClose, onRefresh }) {
    const [withdrawAmount, setWithdrawAmount] = useState('')
    const [depositAmount, setDepositAmount] = useState('')
    const [selectedProfile, setSelectedProfile] = useState('moderate')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState(null)

    const showMessage = (msg, isError = false) => {
        setMessage({ text: msg, error: isError })
        setTimeout(() => setMessage(null), 4000)
    }

    const handleWithdraw = async () => {
        const amount = parseFloat(withdrawAmount)
        if (!amount || amount <= 0) return showMessage('Montant invalide', true)
        setLoading(true)
        try {
            const res = await portfolioAPI.withdraw(amount)
            if (res.data.success) {
                showMessage(`✅ Retrait de $${amount.toFixed(2)} effectué. Nouveau solde: $${res.data.new_balance.toFixed(2)}`)
                setWithdrawAmount('')
                onRefresh && onRefresh()
            } else {
                showMessage(res.data.error, true)
            }
        } catch (e) {
            showMessage(e.response?.data?.detail || 'Erreur réseau', true)
        }
        setLoading(false)
    }

    const handleDeposit = async () => {
        const amount = parseFloat(depositAmount)
        if (!amount || amount <= 0) return showMessage('Montant invalide', true)
        setLoading(true)
        try {
            const res = await portfolioAPI.deposit(amount)
            if (res.data.success) {
                showMessage(`✅ Dépôt de $${amount.toFixed(2)} effectué. Nouveau solde: $${res.data.new_balance.toFixed(2)}`)
                setDepositAmount('')
                onRefresh && onRefresh()
            } else {
                showMessage(res.data.error, true)
            }
        } catch (e) {
            showMessage(e.response?.data?.detail || 'Erreur réseau', true)
        }
        setLoading(false)
    }

    const handleSetProfile = async () => {
        setLoading(true)
        try {
            const res = await chatAPI.send(`Passe mon profil de risque en mode ${selectedProfile}`)
            showMessage(`✅ Profil de risque mis à jour: ${selectedProfile}`)
            onRefresh && onRefresh()
        } catch (e) {
            showMessage('Erreur lors du changement de profil', true)
        }
        setLoading(false)
    }

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[200] p-4">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-gray-800">
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                        <span>⚙️</span> Gestion du Compte
                    </h2>
                    <button onClick={onClose} className="w-9 h-9 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center text-gray-400 hover:text-white">✕</button>
                </div>

                <div className="p-6 space-y-6">
                    {/* Message de feedback */}
                    {message && (
                        <div className={`rounded-lg p-3 text-sm border ${message.error ? 'bg-red-500/10 border-red-500/30 text-red-400' : 'bg-green-500/10 border-green-500/30 text-green-400'}`}>
                            {message.text}
                        </div>
                    )}

                    {/* Profil de Risque IA */}
                    <div>
                        <h3 className="text-[10px] text-gray-500 uppercase tracking-wider font-bold mb-3">🤖 Profil de Risque IA</h3>
                        <div className="grid grid-cols-3 gap-2 mb-3">
                            {RISK_PROFILES.map(p => (
                                <button
                                    key={p.id}
                                    onClick={() => setSelectedProfile(p.id)}
                                    className={`p-3 rounded-xl border text-left transition-all ${selectedProfile === p.id ? p.bg : 'bg-gray-800/30 border-gray-700 hover:border-gray-500'}`}
                                >
                                    <p className={`text-xs font-bold ${selectedProfile === p.id ? p.color : 'text-gray-300'}`}>{p.label}</p>
                                    <p className="text-[9px] text-gray-500 mt-1 leading-tight">{p.desc}</p>
                                </button>
                            ))}
                        </div>
                        <button onClick={handleSetProfile} disabled={loading} className="w-full py-2 bg-sky-500/20 border border-sky-500/30 text-sky-400 text-sm font-medium rounded-lg hover:bg-sky-500/30 transition-colors disabled:opacity-50">
                            Appliquer le profil
                        </button>
                    </div>

                    <div className="border-t border-gray-800" />

                    {/* Retrait de Fonds */}
                    <div>
                        <h3 className="text-[10px] text-gray-500 uppercase tracking-wider font-bold mb-3">💵 Retrait de Fonds</h3>
                        <div className="flex gap-3">
                            <input
                                type="number"
                                min="0"
                                step="0.01"
                                value={withdrawAmount}
                                onChange={e => setWithdrawAmount(e.target.value)}
                                placeholder="Montant en $"
                                className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:ring-1 focus:ring-sky-500 focus:outline-none"
                            />
                            <button onClick={handleWithdraw} disabled={loading || !withdrawAmount} className="px-4 py-2 bg-sky-500 hover:bg-sky-400 text-black font-bold rounded-lg text-sm transition-colors disabled:opacity-50">
                                Retirer
                            </button>
                        </div>
                    </div>

                    <div className="border-t border-gray-800" />

                    {/* Dépôt de Fonds */}
                    <div>
                        <h3 className="text-[10px] text-green-400 uppercase tracking-wider font-bold mb-3">💵 Déposer des Fonds</h3>
                        <p className="text-xs text-gray-500 mb-3">Ajoute de l'argent au solde liquide sans toucher aux positions en cours.</p>
                        <div className="flex gap-3">
                            <input
                                type="number"
                                min="0"
                                step="0.01"
                                value={depositAmount}
                                onChange={e => setDepositAmount(e.target.value)}
                                placeholder="Montant à déposer ($)"
                                className="flex-1 bg-gray-800 border border-green-500/30 rounded-lg px-3 py-2 text-white text-sm focus:ring-1 focus:ring-green-500 focus:outline-none"
                            />
                            <button onClick={handleDeposit} disabled={loading || !depositAmount} className="px-4 py-2 bg-green-500 hover:bg-green-400 text-black font-bold rounded-lg text-sm transition-colors disabled:opacity-50">
                                Déposer
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
